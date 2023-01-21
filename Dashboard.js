import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles/Dashboard-styles'
import { db } from './firebase';
import { doc, setDoc, getDoc } from "firebase/firestore";

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
    const setNumbers = (budd, curm, cury) => {
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
    useEffect(async () => {
        getData();
        let today = new Date()
        setCurrYear(today.getFullYear())
        setCurrMonth(today.getMonth() + 1)
    }, []);
    useEffect(() => {
        setNumbers(budgetData, currMonth, currYear)
    }, [currMonth, currYear, budgetData])

    function budgetColor(money) {
        if (money <= 0) {
            return 'white';
        }
        if (money > 0 && money < 50) {
            return 'green';
        }
        if (money >= 50 && money < 100) {
            return 'orange';
        }
        return 'red';
    }
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
    function makeaverageDaily(total, month, year) {
        const today = new Date();
        if (month == today.getMonth() + 1 && year == today.getFullYear()) {
            return total / today.getDate();
        } else {
            return total / new Date(year, month, 0).getDate();
        }
    }
    async function getData() {
        const userId = loginUser.uid;
        const docRef = doc(db, "budgets", userId);
        getDoc(docRef).then(async docSnap => {
            if (docSnap.exists()) {
                await setColors(docSnap.data());
                setNumbers(docSnap.data(), currMonth, currYear);
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
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Monthly Budget</Text>
                <Text style={styles.budget}>{parseFloat(budget.budget).toFixed(2)}</Text>

            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Average Daily Spend</Text>
                <Text style={styles.average}>{parseFloat(budget.avg).toFixed(2)}</Text>
            </View>

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
