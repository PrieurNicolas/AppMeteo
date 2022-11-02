import { View, Text, StyleSheet, Image } from 'react-native'

const getIcon = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`

export default function Weather({ forecast }) {
    return (
        <View style={styles.container}>
            <Text style={styles.temp}> {forecast.temp}°  </Text>
            <Image source={{ uri: getIcon(forecast?.icon) }} 
             style={styles.image}/>
            <Text style={{color:"white"}}> {forecast.hour}:00</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        color:"white",
        backgroundColor: "#000C1C",
        height:110,
        width:75,
        paddingVertical:6,
        justifyContent:"center",
        alignItems:"center",
        marginRight:10,
        borderRadius:25,
        borderColor:"#142233",
        borderWidth:1,
        top:0,
    },
    image: {
        height:50,
        width:50,
    },
    temp:{
        color:"white",
        fontSize:18,
        fontWeight:'bold',
    },
})