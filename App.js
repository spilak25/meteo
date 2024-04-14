import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Image, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import { formatTime, groupForecastByDay } from './src/Helper';
import ForecastTime from './src/components/ForecastTime';
import ForecastDayList from './src/components/ForecastDayList';
import Weather from './src/components/Weather';

const API_KEY = 'd578a19d5f16f44b2703487e89f00e44';

export default function App() {
  const [location, setLocation] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}&lang=fr&units=metric`)
        .then(response => {
          setForecastData(response.data);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données:', error);
        });
    }
  }, [location]);
  useEffect(() => {
    if(forecastData) setIsLoading(false)
  },[forecastData])

  

  const handleNextDay = () => {
    if (selectedDayIndex < groupForecastByDay(forecastData).length - 1) {
      setSelectedDayIndex(selectedDayIndex + 1);
    }
  };

  const handlePreviousDay = () => {
    if (selectedDayIndex > 0) {
      setSelectedDayIndex(selectedDayIndex - 1);
    }
  };


  if (isLoading){
    return (
      <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
        <Text style={{fontSize:46, textAlign:'center'}}>Chargement...</Text>
      </View>

    )
  }
  return (
    <View style={styles.container}>
      
      <Weather weather={forecastData.list[0]} city={forecastData.city}/>
      <View style={styles.buttonContainer}>
        <Button title="Jour précédent" onPress={handlePreviousDay} disabled={selectedDayIndex === 0} />
        <Button title="Jour suivant" onPress={handleNextDay} disabled={selectedDayIndex === groupForecastByDay().length - 1} />
      </View>
      {groupForecastByDay(forecastData).map(([day, forecasts], index) => (
        <ForecastDayList key={index} forecasts={forecasts} day={day} index={index} 
        selectedDayIndex={selectedDayIndex}/>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  column: {
    marginBottom: 40,
  },
  day: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
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
