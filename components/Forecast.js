import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import Weatherr from './Weather'

export default function Forecast({ data }) {
    const [forecast, setForecast] = useState([])

    useEffect(() => {
        const forecastData = data.list.map(f => {
            const dt = new Date(f.dt * 1000)
            return ({
                date: dt,
                hour: dt.getHours(),
                temp: Math.round(f.main.temp),
                icon: f.weather[0].icon,
                name: format(dt, "EEEE", { locale: fr })
            })
        })


        let newForecastData = forecastData.map(forecast => {
            return forecast.name
        }).filter((day, index, self) => {
            return self.indexOf(day) === index
        }).map((day) => {
            return{
                day,
                data: forecastData.filter((forecast) => forecast.name === day)
            }
        })

        setForecast(newForecastData)
    }, [data])

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scroll}
        >

            {forecast.map((f,id) => (
                <View key={id}>
                    <Text style={styles.day}>{f.day.toUpperCase()}</Text>
                    <View key={id} style={styles.container}>
                    {f.data.map(w => <Weatherr forecast={w} />)}
                    </View>
                </View>

            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scroll:{
        width:"100%",
        height:150,
        position:"absolute",
        bottom:10,
    },
    container:{
        flexDirection:"row",
        marginLeft:5,
        marginRight:5,
    },
    day:{
        color:"white",
        fontSize:16,
        fontWeight:"bold",
        marginBottom:10,
        marginTop:10,
        marginLeft:5,
    },
})
