import { Image, StyleSheet, Text, View } from "react-native";
import { formatDescription } from "../Helper";
export default function Weather({weather,city}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{city.name}</Text>
            <Image
                source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png ` }}
                // source={{ uri: `https://openweathermap.org/img/w/${weather.weather[0].icon}.png` }}
                style={styles.icon}
            />
            <Text style={{fontSize:30}}>{weather.main.temp} °C</Text>
            <Text>{formatDescription(weather.weather[0].description)}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        width:'100%',
        alignItems:'center',
        marginBottom:10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 0,
        textAlign: 'center',
    },
    icon: {
        width: 100,
        height: 100,
    },

});




