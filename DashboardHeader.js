import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles/Dashboard-styles'


function DashboardHeader(props) {
    return (
        <View>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Monthly Budget</Text>
                <Text style={styles.budget}>{parseFloat(props.budget.budget).toFixed(2)}</Text>

            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Average Daily Spend</Text>
                <Text style={styles.average}>{parseFloat(props.budget.avg).toFixed(2)}</Text>
            </View>
        </View>
    )
}

export default DashboardHeader
