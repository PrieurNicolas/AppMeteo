import React, { useEffect, useState } from 'react'
import { View,  Alert, ActivityIndicator, StyleSheet } from 'react-native';
import * as Location from "expo-location"
import Constants from 'expo-constants'
import axios from 'axios';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';

const APIKey = '';
const API_URL = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&lang=fr&units=metric`

export default function Result() {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)

    useEffect(() => {
        const getCoordinates = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== "granted") {
                return Alert.alert("Localisation", "La localisation est nécessaire au bon fonctionnement de l'application")
            }

            const userLocation = await Location.getCurrentPositionAsync()
            getWeather(userLocation)
        }

        getCoordinates()
    }, [])

    const getWeather = async (location) => {
        try {
            const response = await axios.get(API_URL(location.coords.latitude, location.coords.longitude))
            setData(response.data)
            setLoading(false)
        } catch (e) {
            console.log("Erreur dans le getWeather")
        }

    }

    if (loading) {
        return(
        <View style={styles.container}><ActivityIndicator IsRunning="true" style={styles.load} /></View>
        )
    }

    return (
        <View style={styles.meteo}>
            <CurrentWeather data={data}/>
            <Forecast data={data}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        justifyContent:'center',
        alignItems:'center',
        paddingTop: Constants.statusBarHeight,
        padding: 8,
        backgroundColor: '#E2E6E1'
    },
    meteo: {
        flex : 1,
        padding: 4,
    },
    load:{
        width:200,
        height:200,
        color:""
    }
})