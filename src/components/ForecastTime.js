import { Image, StyleSheet, Text, View } from "react-native";
import { formatTime } from "../Helper";

export default function ForecastTime({item}) {
    return (
        <View  style={styles.forecastItem}>
            <Text style={styles.text}>{formatTime(item.dt_txt)}</Text>
            <Text style={styles.text}>Température: {item.main.temp}°C</Text>
            <Text style={styles.text}>Description: {item.weather[0].description}</Text>
            <Image
                source={{ uri: `https://openweathermap.org/img/w/${item.weather[0].icon}.png` }}
                style={styles.icon}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    forecastItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    },
    text: {
    fontSize: 16,
    marginBottom: 5,
    },
    icon: {
    width: 50,
    height: 50,
    },
});
