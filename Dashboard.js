import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles/Dashboard-styles'
import { db } from './firebase';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { budgetColor, makeaverageDaily } from "./functions"
import DashboardHeader from './DashboardHeader';

const Dashboard = () => {
    const [budget, setBudget] = useState(3000);
    const [averageDaily, setAverageDaily] = useState(100);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currMonth, setCurrMonth] = useState(0);
    const [currYear, setCurrYear] = useState(0);
    const loginUser = useSelector(state => state.loginUser);
    const [budgetData, setBudgetData] = useState({});
    const [selectedBudget, setSelectedBudget] = useState(0);
    const [formVisible, setFormVisible] = useState(false);
    async function setNumbers(budd, curm, cury) {
        let dateArr = Object.keys(budd);
        let monthArr = dateArr.filter(date => {
            let currDate = new Date(date);
            return (currDate.getMonth() + 1 == curm) && (currDate.getFullYear() == cury);
        });
        let budgetSum = 0;
        for (let i in monthArr) {
            budgetSum += parseFloat(budd[monthArr[i]].budget);
        }
        setBudget({ budget: budgetSum, avg: makeaverageDaily(budgetSum, curm, cury) });
    }
    useEffect(() => {
        getData();
        let today = new Date()
        setCurrYear(today.getFullYear())
        setCurrMonth(today.getMonth() + 1)
    }, []);
    useEffect(() => {
        setNumbers(budgetData, currMonth, currYear)
    }, [currMonth, currYear, budgetData])

    function handleMonthChange(day) {
        setCurrYear(day.year)
        setCurrMonth(day.month);
    }
    async function setColors(budd) {
        let budgetData2 = {}
        for (let key in budd) {
            budgetData2[key] = {
                budget: budd[key].budget,
                customStyles: {
                    container: {
                        backgroundColor: 'white'
                    }
                }
            }
            budgetData2[key].customStyles.container.backgroundColor = budgetColor(budd[key].budget);
        }
        setBudgetData(budgetData2);
    }

    function handleDatePress(day) {
        const selectedDate = day.dateString;
        const today = new Date();
        const todayString = today.toISOString().substring(0, 10)
        if (todayString < selectedDate) {
            alert('This date yet to come')
        }
        else {
            setSelectedDate(selectedDate);
            const selectedBudgetValue = budgetData[selectedDate]?.budget || 0;
            setSelectedBudget(selectedBudgetValue);
            setFormVisible(true);
        }
    }

    function handleBudgetChange(newBudget) {
        setSelectedBudget(newBudget);
    }

    async function getData() {
        const userId = loginUser.uid;
        const docRef = doc(db, "budgets", userId);
        getDoc(docRef).then(async docSnap => {
            if (docSnap.exists()) {
                await setColors(docSnap.data());
                await setNumbers(docSnap.data(), currMonth, currYear);
                setFormVisible(false);
            } else {
            }
        })
    }
    async function handleFormSubmit() {
        const userId = loginUser.uid;
        const parentRef = doc(db, "budgets", userId);
        await setDoc(parentRef, {
            [selectedDate]: { budget: selectedBudget }
        }, { merge: true });
        await getData();
    }
    return (
        <View >
            <DashboardHeader budget={budget} />
            <Calendar
                style={styles.Calendar}
                markingType={'custom'}
                markedDates={budgetData}
                onDayPress={(day) => handleDatePress(day)}
                onMonthChange={(month) => { handleMonthChange(month) }}
                renderArrow={(direction) => {
                    if (direction == 'left') {
                        return (<Text style={styles.arrows}>{'<'}</Text>)
                    } else {
                        return (<Text style={styles.arrows}>{'>'}</Text>)
                    }
                }}
            />
            <Modal isVisible={formVisible} style={styles.modal}>
                <View style={styles.formContainer}>
                    <Text style={styles.formHeader}>Enter budget for {selectedDate}</Text>
                    <TextInput
                        style={styles.formInput}
                        value={selectedBudget}
                        onChangeText={handleBudgetChange}
                    />
                    <Button title="Submit" onPress={handleFormSubmit} />
                </View>
            </Modal>
        </View>
    );
};

export default Dashboard;    
