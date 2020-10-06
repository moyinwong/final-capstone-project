// React, React Native
import { StyleSheet } from 'react-native';

const stripeFormStyles = StyleSheet.create({
    wholeScreen: {
        display: "flex",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    linearGradient: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: -1
    },
    text: {
        fontSize: 20,
        color: '#828282'
    },
    input: {
        width: 300,
        fontSize: 20,
        marginTop: 8,
        color: '#5b96f7'
    },
    inputLine: {
        borderBottomColor: '#c0c0c0',
        borderBottomWidth: 2,
        marginBottom: 10,
    },
    form: {
        paddingVertical: 20,
        paddingHorizontal: 12
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
        paddingVertical: 12,
        paddingHorizontal: 60,
        borderRadius: 10,
        backgroundColor: '#5b96f7',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20
    }
});

export default stripeFormStyles;
