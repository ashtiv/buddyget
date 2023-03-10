import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles/Dashboard-styles'
import { db } from './firebase';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { budgetColor, makeaverageDaily, isNumber } from "./functions"
import DashboardHeader from './DashboardHeader';
import { auth } from './firebase';
import { useNavigation } from '@react-navigation/native';
import ActivityModal from './ActivityModal';
import AsyncStorage from '@react-native-async-storage/async-storage';



const USER_KEY = 'user';
const Dashboard = () => {
    const [budget, setBudget] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());
    const loginUser = useSelector(state => state.loginUser);
    const [budgetData, setBudgetData] = useState({});
    const [selectedBudget, setSelectedBudget] = useState(0);
    const [formVisible, setFormVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    function hideLoading(time) {
        setTimeout(() => {
            setLoading(false);
        }, time);
    }

    async function setNumbers(budd, curm, cury) {
        let dateArr = Object.keys(budd);
        let monthArr = dateArr.filter(date => {
            let currDate = new Date(date);
            return (currDate.getMonth() + 1 == curm) && (currDate.getFullYear() == cury);
        });
        let budgetSum = 0;
        for (let i in monthArr) {
            let bud = parseFloat(budd[monthArr[i]].budget);
            if (!isNaN(bud)) {
                budgetSum += bud;
            }
        }
        setBudget({ budget: budgetSum, avg: makeaverageDaily(budgetSum, curm, cury), month: curm, year: cury });
    }
    useEffect(() => {
        setLoading(true);
        let today = new Date();
        getData(today.getMonth() + 1, today.getFullYear());
        hideLoading(3000);
    }, []);

    function handleMonthChange(day) {
        setNumbers(budgetData, day.month, day.year)
    }
    async function setColors(budd, currm, curry) {
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
        setNumbers(budgetData2, currm, curry)
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

    async function getData(currm, curry) {
        const userId = loginUser.id;
        const docRef = doc(db, "budgets", userId);
        getDoc(docRef).then(async docSnap => {
            if (docSnap.exists()) {
                await setColors(docSnap.data(), currm, curry);
                setFormVisible(false);
            } else {
                await setColors({}, currm, curry);
            }
        })
    }
    async function deleteData(currm, curry) {
        const userId = loginUser.id;
        const docRef = doc(db, "budgets", userId);
        getDoc(docRef).then(async docSnap => {
            if (docSnap.exists) {
                let data = docSnap.data();
                Object.keys(data).forEach(key => {
                    let date = new Date(key);
                    if (date.getMonth() + 1 == currm && date.getFullYear() == curry) {
                        delete data[key];
                    }
                });
                setDoc(docRef, data).then(() => {
                    getData(currm, curry);
                })
            }
        });
    }

    async function handleFormSubmit() {
        setFormVisible(false);
        setLoading(true);
        const dd = new Date(selectedDate);
        const currm = dd.getMonth() + 1;
        const curry = dd.getFullYear();
        const userId = loginUser.id;
        const parentRef = doc(db, "budgets", userId);
        let bud = parseFloat(selectedBudget);
        if (isNumber(selectedBudget) && (!isNaN(bud))) {
            await setDoc(parentRef, {
                [selectedDate]: { budget: bud }
            }, { merge: true });
            await getData(currm, curry);
            hideLoading(2000);
        }
        else {
            alert('Please enter a valid number');
            setFormVisible(true);
            setLoading(0);
        }
    }
    function handleDayLongPress(day) {
        setSelectedDate(day.dateString);
        const selectedBudgetValue = budgetData[day.dateString]?.budget || 0;
        setSelectedBudget(selectedBudgetValue);
        setModalVisible(true);
    }
    async function resetThisMonth() {
        setLoading(true);
        setShowModal(false)
        const curm = budget.month;
        const cury = budget.year;
        await deleteData(curm, cury);
        hideLoading(2000);
    }
    async function handleLogout() {
        try {
            await auth.signOut();
            await AsyncStorage.removeItem(USER_KEY)
                .then(() => {
                    console.log('User data removed from local storage');
                })
                .catch(error => {
                    console.error(error);
                });
            dispatch({ type: 'LOGOUT' });
            navigation.navigate('Login2');
        } catch (error) {
            console.error(error);
        }
    }
    const confirmModal = () => (
        <Modal isVisible={showModal} style={styles.modal}>
            <View style={styles.formContainer}>
                <Text style={{ marginBottom: 20 }}>Are you sure?</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginRight: 20 }}><Button title="Cancel" onPress={() => setShowModal(false)} /></View>
                    <View style={{ marginLeft: 20 }}><Button title="Confirm" onPress={resetThisMonth} /></View>
                </View>
            </View>
        </Modal>
    )
    return (
        <View >
            <ActivityModal loading={loading} />
            <View>
                {confirmModal()}
                <DashboardHeader budget={budget} />
                <Calendar
                    style={styles.Calendar}
                    markingType={'custom'}
                    markedDates={budgetData}
                    onDayPress={(day) => handleDatePress(day)}
                    onDayLongPress={day => handleDayLongPress(day)}
                    onMonthChange={(month) => { handleMonthChange(month) }}
                    renderArrow={(direction) => {
                        if (direction == 'left') {
                            return (<Text style={styles.arrows}>{'<'}</Text>)
                        } else {
                            return (<Text style={styles.arrows}>{'>'}</Text>)
                        }
                    }}
                />
                <Modal visible={modalVisible} style={styles.modal}>
                    <View>
                        <Text style={styles.budgetView}>budget for {selectedDate} : {selectedBudget}</Text>
                        <Button title="OK" onPress={() => { setModalVisible(false) }} />
                    </View>
                </Modal>
                <Modal isVisible={formVisible} style={styles.modal}>
                    <View style={styles.formContainer}>
                        <Text style={styles.formHeader}>Enter budget for {selectedDate}</Text>
                        <TextInput
                            style={styles.formInput}
                            value={selectedBudget.toString()}
                            onChangeText={handleBudgetChange}
                            inputType="textVisiblePassword"
                        />
                        <Button title="Submit" onPress={handleFormSubmit} />
                    </View>
                </Modal>

                <View style={{ marginBottom: 16 }}>
                    <Button
                        title="Reset this month"
                        onPress={() => setShowModal(true)}
                    />
                </View>
                <View style={{ marginBottom: 16 }}>
                    <Button
                        title="Logout"
                        onPress={handleLogout}
                    />
                </View>
            </View>
        </View>
    );
};

export default Dashboard;    
