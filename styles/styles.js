import * as React from 'react';
import { Button, View, Text, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'linen',
        alignItems: 'center',
        color:'red',
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
        color:'#525252',
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
        color:'#525252',
        alignItems: 'center',
    },
    inputFieldStyle: {
        margin: 5,
        padding: 5,
        width: '70%',
        color:'#525252',
        borderBottomColor: '#999',
        borderBottomWidth: 2,
    },
    inputItems: {
        flexDirection:"row",
        color:'#525252',
        margin: 20,
    },
    textStyle: {
        fontWeight: 'bold',
        color:'#525252',
        fontSize: 18,
    },
    doneText: {
        borderBottomColor: '#999',
        color:'#525252',
        borderBottomWidth: 1,
        fontSize: 15,
    },
    flist: {
        flex: 0,
        color:'red',
    },
    flist2: {
        marginTop: 5,
        flex: 0,
        color:'red',
    },
    bottomButtons: {
        flexDirection: 'row',
        overflow: 'hidden',
        color:'#525252',
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
    },
    frontFont: {
        fontFamily: 'sans-serif-thin',
        color:'#525252',
        fontSize: 35,
    },
    aboutHeader: {
        fontFamily: 'sans-serif-thin',
        color:'#525252',
        fontSize: 40,
    },
    aboutText: {
        margin: 30,
        color:'#525252',
        fontSize: 14.5,
    },
    aboutText2: {
        margin: 30,
        color:'#525252',
        fontSize: 14.5,
    },
    fontColorButtons: {
        color:'#525252',
        fontSize: 14.5,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10,
    }
    
});

export default styles;