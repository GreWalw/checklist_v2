import * as React from 'react';
import { Button, View, Text, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'linen',
        alignItems: 'center',
        flex: 1,
    },
    button: {
        alignItems: 'center',
        margin: 20,
        backgroundColor: 'white',
        padding: 17,
        height: 60,
        width: 350,
        borderRadius:10,
        elevation: 2,
    },
    massButton: {
        margin: 20,
        backgroundColor: 'white',
        height: 40,
        width: '40%',
        borderRadius: 8,
        alignItems: 'center',
        paddingTop: 10,
        elevation: 1.5,
    },
    inputStyle: {
        paddingTop: 8,
        paddingLeft: 20,
        fontSize: 16,
        width: 360,
        height: 40,
        backgroundColor: 'white',
        marginVertical: 3,
        borderBottomColor: 'gray',
        elevation: 1.5,
        alignItems: 'center',
    },
    inputFieldStyle: {
        margin: 5,
        padding: 5,
        width: '70%',
        borderBottomColor: '#999',
        borderBottomWidth: 2,
    },
    inputItems: {
        flexDirection:"row",
        margin: 20,
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    doneText: {
        borderBottomColor: '#999',
        borderBottomWidth: 1,
        fontSize: 15,
    },
    flist: {
        flex: 0,
    },
    flist2: {
        marginTop: 5,
        flex: 0,
    },
    bottomButtons: {
        flexDirection: 'row',
        overflow: 'hidden',
    },
    deleteButtonText: {
        margin: 3.5,
        backgroundColor: 'red',
        color: 'white',
    },
    checkIcon: {
        color: 'green',
        right: 10,
    },
    brand: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }
});

export default styles;