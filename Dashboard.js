import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Calendar from 'react-native-calendar';

const Dashboard = () => {
    const [budget, setBudget] = useState(3000);
    const [averageDaily, setAverageDaily] = useState(100);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        setAverageDaily(budget / 30);
    }, [budget])

    const budgetData = {
        '2023-01-01': { budget: 100 },
        '2023-01-02': { budget: 80 },
        '2023-01-03': { budget: 60 },
        '2023-01-04': { budget: 40 },
        '2023-01-05': { budget: 20 },
        '2023-01-06': { budget: 0 },
        '2023-01-07': { budget: 50 },
        '2023-01-08': { budget: 60 },
        '2023-01-09': { budget: 70 },
        '2023-01-10': { budget: 80 },
        '2023-01-11': { budget: 90 },
        '2023-01-12': { budget: 100 },
        '2023-01-13': { budget: 110 },
        '2023-01-14': { budget: 120 },
    }

    return (
        <View >
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Monthly Budget</Text>
                <Text style={styles.budget}>{budget}</Text>

            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Average Daily Spend</Text>
                <Text style={styles.average}>{averageDaily}</Text>
            </View>

            <Calendar
                style={styles.calendar}
                selectedDate={selectedDate}
                onConfirm={date => setSelectedDate(date)}
                onDayPress={day => {
                    const budget = budgetData[day.dateString] && budgetData[day.dateString].budget;
                    if (budget >= 100) {
                        day.customStyles.text.color = 'red';
                    } else if (budget >= 50) {
                        day.customStyles.text.color = 'yellow';
                    } else if (budget >= 1) {
                        day.customStyles.text.color = '#006400';
                    } else {
                        day.customStyles.text.color = 'lightgreen';
                    }
                }}
                markedDates={budgetData}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 30
    },
    header: {
        fontSize: 20,
        marginRight: 10,
        color: '#333',
        alignSelf: 'center'
    },
    icon: {
        width: 25,
        height: 25,
    },
    budget: {
        fontSize: 18,
        color: 'green',
        alignSelf: 'center'
    },
    average: {
        fontSize: 18,
        color: 'red',
        alignSelf: 'center'
    },
    calendar: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // alignSelf: 'start'
    }
});

export default Dashboard;
