import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
            <Text style={styles.header}>Monthly Budget</Text>
            <Text style={styles.text}>{budget}</Text>
            <Text style={styles.header}>Average Daily Spend</Text>
            <Text style={styles.text}>{averageDaily}</Text>
            <Calendar
                style={{ height: 300, width: 300 }}
                selectedDate={selectedDate}
                onConfirm={date => setSelectedDate(date)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        fontSize: 20,
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default Dashboard;