import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { formatDescription, formatTime } from "../Helper";
import ForecastTime from "./ForecastTime";

export default function ForecastDayList({forecasts,day,index,selectedDayIndex}) {
    return (
        <View  style={[styles.column, { display: index === selectedDayIndex ? 'flex' : 'none' }]}>
            <Text style={styles.day}>{formatDescription(day)}</Text>
            <ScrollView>
                {forecasts.map((item, index) => (
                    <ForecastTime item={item} key={index}/>
                ))}
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    column: {
        marginBottom: 40,
    },
    day: {
        textAlign:'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    
});


