import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native';
import { format, isSameDay } from 'date-fns';
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';

const getIcon = (icon) => `https://openweathermap.org/img/wn/${icon}@4x.png`

export default function CurrentWeather({ data }) {
    const [currentWeather, setCurrentWeather] = useState(null)

    useEffect(() => {
        const currentW = data.list.filter(forecast => {
        const today = new Date().getTime() + Math.abs(data.city.timezone * 1000)
        const forecastDate = new Date(forecast.dt * 1000)
        return isSameDay(today, forecastDate)
        })
        setCurrentWeather(currentW[0])
    }, [data])

    const frenchLocale = require('date-fns/locale/fr');
    const date = new Date()
    const dateFormatted = format(date, 'EEEE, dd MMMM',{locale:frenchLocale})


    return (
        <LinearGradient style={styles.LG}
        colors={["#15c0f6", "#149afa", "#034bbb"]}>
        <View style={styles.container}>
            <Text style={styles.city} >{data?.city?.name}</Text>

            <Image source={{ uri: getIcon(currentWeather?.weather[0].icon) }} 
             style={styles.image}/>
            <Text style={styles.temp}>{Math.round(currentWeather?.main.temp)}°</Text>
            <Text style={styles.description}>{currentWeather?.weather[0].description}</Text>
            <Text style={styles.today}>{dateFormatted}</Text>
            <View style={styles.spacer}/>
            <View style={styles.info}>
            <Text style={styles.infoWind}><MaterialCommunityIcons name="weather-windy" size={24} color="white" />{"\n"}{Math.round(currentWeather?.wind.speed *3.6)} km/h {"\n"} Vitesse du vent</Text>
            <Text style={styles.infoHumi}><Ionicons name="water-outline" size={24} color="white" />{"\n"}{currentWeather?.main.humidity}% {"\n"}Humidité</Text>            
            <Text style={styles.infoRain}><Feather name="cloud-rain" size={24} color="white" />{"\n"}{Math.round(currentWeather?.pop) * 100} {"\n"} Chance de pleuvoir</Text>
            </View>
        </View>
        </LinearGradient>
    )
}

const COLOR = "white"

const styles = StyleSheet.create({
    city: {
        fontSize: 36,
        fontWeight: "400",
        color:  COLOR,
    },
    today: {
        fontSize: 24,
        fontWeight: "300",
        color: COLOR,
    },
    image: {
        width:250,
        height:250,
        padding:0,
        margin:0,
    },
    temp: {
        textAlign:"center",
        fontSize:150,
        fontWeight:"bold",
        color: COLOR,
    },
    description: {
        fontSize:24,
        fontWeight: 'bold',
        color:COLOR,
    },
    container:{
        margin:0,
        padding:0,
        alignItems:"center",
        height:"auto",
    },
    infoWind:{
        color:"white",
        textAlign:"center",
        marginHorizontal:"10%"
    },
    infoHumi:{
        color:"white",
        textAlign:"center",
    },
    infoRain:{
        color:"white",
        textAlign:"center",
        marginHorizontal:"10%"
    },
    info:{
        flexDirection:"row",
        marginTop:5,
    },
    spacer:{
        marginVertical:5,
        backgroundColor: "#2186F5",
        height:1,
        width:'80%'
    },
    LG:{
        borderRadius:50,
    },
})
