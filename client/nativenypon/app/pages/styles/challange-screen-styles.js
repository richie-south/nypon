import React from 'react'
import {StyleSheet, Dimensions} from 'react-native'
const rWindow = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    },

    loading: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },


    // position of opponent cards
    opponentCards: {
        position: 'absolute',
        top: 20,
        left: (rWindow.width/2)-120,
        /*flex: 1,
        maxHeight: 114,*/
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        /*marginTop: 20,*/
    },

    // position of avtive cards
    activeCards: {
        flex: 1,

        width: 242,
        alignItems:'center',
        justifyContent:'center'

    },

    // position of opponent placed cards
    opponentPlaceCards: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    // position
    challangerPlaceCards: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    // position
    challangerCards: {
        position: 'absolute',
        bottom: 20,
        left: (rWindow.width/2)-120,
        /*flex: 1,
        maxHeight: 104,*/
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        /*marginBottom: 10,*/
    },



    // done button
    doneButton: {
        position: 'absolute',
        left: 8,
        top: 24,

        /*elevation: 2,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',*/

        height: 50,
        width: 70,
    },

     sendRoundButton: {
        /*position: 'absolute',
        left: 8,
        bottom: 24,*/

        position: 'absolute',
        bottom: 20,
        left: 8,

        elevation: 2,/*
        borderRadius: 8,
        backgroundColor: '#FFFFFF',*/
        height: 80,
        width: 70,
    },

    doneButtonText: {
        height: 50,

        textAlign: 'center',
        textAlignVertical: 'center',

    },


    // life meter

    lifePosOpponent: {
        position: 'absolute',
        right: 16,
        top: 22
    },

    lifePosChallanger: {
        position: 'absolute',
        right: 16,
        bottom: 22
    },
})