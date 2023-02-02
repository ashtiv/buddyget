import React from 'react'
import { View, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';


function ActivityModal() {
    return (
        <Modal visible={true}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        </Modal>
    )
}

export default ActivityModal