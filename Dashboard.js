import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';

const Dashboard = () => {
    const [budget, setBudget] = useState(3000);
    const [averageDaily, setAverageDaily] = useState(100);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [budgetData, setBudgetData] = useState({
        '2023-01-01': { budget: 100 },
        '2023-01-02': { budget: 80 },
        '2023-01-03': { budget: 60 },
        '2023-01-04': { budget: 40 },
        '2023-01-04': { budget: 70 },
        '2023-01-06': { budget: 0 },
        '2023-01-07': { budget: 50 },
        '2023-01-08': { budget: 60 },
        '2023-01-09': { budget: 70 },
        '2023-01-10': { budget: 80 },
        '2023-01-11': { budget: 90 },
        '2023-01-12': { budget: 100 },
        '2023-01-13': { budget: 110 },
        '2023-01-14': { budget: 120 },
    });
    const [selectedBudget, setSelectedBudget] = useState(0);
    const [formVisible, setFormVisible] = useState(false);

    useEffect(() => {
        setAverageDaily(budget / 30);
    }, [budget])

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

    useEffect(() => {
        let budgetData2 = {}
        for (let key in budgetData) {
            budgetData2[key] = {
                budget: budgetData[key].budget,
                customStyles: {
                    container: {
                        backgroundColor: 'white'
                    }
                }
            }
            budgetData2[key].customStyles.container.backgroundColor = budgetColor(budgetData[key].budget);
        }
        setBudgetData(budgetData2);
    }, []);

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
    function handleFormSubmit() {
        let budgetData2 = budgetData;
        if (budgetData2[selectedDate] == undefined) {
            let obj = {
                budget: parseFloat(selectedBudget),
                customStyles: {
                    container: {
                        backgroundColor: budgetColor(parseFloat(selectedBudget))
                    }
                }
            }
            budgetData2[selectedDate] = obj;
        }
        else {
            budgetData2[selectedDate].budget = parseFloat(selectedBudget);
            budgetData2[selectedDate].customStyles.container.backgroundColor = budgetColor(budgetData2[selectedDate].budget);
        }

        setBudgetData(budgetData2);
        setFormVisible(false);
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

                style={styles.Calendar}
                markingType={'custom'}
                markedDates={budgetData}
                onDayPress={(day) => handleDatePress(day)}
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
    formContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
        padding: 10,
    },
    Calendar: {
        backgroundColor: '#F8F8FF'
    },
    formHeader: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    formInput: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    modalStyle: {
        backgroundColor: 'white',
    },
    modal: {
        width: '80%',
        height: '50%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    arrows: {
        color: 'blue',
        fontWeight: '1000px',
        fontSize: 20
    }
});

export default Dashboard;    
