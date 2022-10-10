import * as React from 'react';
import { Button, View, Text, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D4F5FF',
        alignItems: 'center',
        flex: 1,
    },
    button: {
        alignItems: 'center',
        margin: 20,
        backgroundColor: 'coral',
        padding: 20,
        height: 60,
        width: 350,
        borderRadius:10,
    },
    massButton: {
        margin: 20,
        backgroundColor: 'coral',
        height: 40,
        width: '40%',
        borderRadius: 8,
        alignItems: 'center',
        paddingTop: 10,
    },
    inputStyle: {
        paddingTop: 10,
        paddingLeft: 20,
        fontSize: 20,
        width: 350,
        height: 50,
        backgroundColor: '#CACFD2',
        marginVertical: 2,
    },
    inputFieldStyle: {
        backgroundColor: '#999',
        margin: 5,
        padding: 5,
        width: '70%',
    },
    inputItems: {
        flexDirection:"row",
        margin: 20,
    },
    textStyle: {
        fontWeight: 'bold',
    },
    flist: {
        backgroundColor: 'yellow',
        flex: 0,
    },
    flist2: {
        backgroundColor: 'green',
        flex: 0,
    },
    bottomButtons: {
        flexDirection: 'row',
        overflow: 'hidden',
    },
    deleteButtonText: {
        backgroundColor: 'red',
        color: 'white',
    },
});

export default styles;