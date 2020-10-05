// React, React Native
import { StyleSheet } from 'react-native';

const loginStyles = StyleSheet.create({
    form: {
        paddingTop: 30,
        paddingHorizontal: 24
    },
    title: {
        width: '100%',
        textAlign: 'center',
        fontSize: 32,
        paddingVertical: 24
    },
    input: {
        fontSize: 20,
        marginBottom: 24,
        paddingVertical: 24,
        paddingHorizontal: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#c0c0c0'
    },
    logInButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 60,
        borderRadius: 10,
        backgroundColor: '#5b96f7',
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 60,
        // backgroundColor: '#22c736',
        marginTop: 24
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20
    }
});

export default loginStyles;
