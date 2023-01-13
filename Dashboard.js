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

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Monthly Budget</Text>
                <Image
                    // source={require('path/to/budget-icon.png')}
                    style={styles.icon}
                />
            </View>
            <Text style={styles.budget}>{budget}</Text>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Average Daily Spend</Text>
                <Image
                    // source={require('path/to/money-icon.png')}
                    style={styles.icon}
                />
            </View>
            <Text style={styles.average}>{averageDaily}</Text>
            <Calendar
                style={styles.calendar}
                selectedDate={selectedDate}
                onConfirm={date => setSelectedDate(date)}
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
        marginBottom: 10,
    },
    header: {
        fontSize: 20,
        marginRight: 10,
        color: '#333'
    },
    icon: {
        width: 25,
        height: 25,
    },
    budget: {
        fontSize: 18,
        color: 'green',
        marginBottom: 10,
    },
    average: {
        fontSize: 18,
        color: 'red',
        marginBottom: 10,
    },
    calendar: {
        flex: 1,
        width: '100%',
        marginTop: 10,
    }
});

export default Dashboard;
