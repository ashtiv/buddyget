import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
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
    budgetView: {
        padding: 10,
        marginBottom: 10,
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
export default styles;