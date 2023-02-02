import React from 'react'
import { View, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles/Dashboard-styles';


function ActivityModal(props) {
    return (
        <View>
            <Modal visible={props.loading}>
                <View style={styles.activityIndicatorStyle}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </Modal>
        </View>

    )
}

export default ActivityModal