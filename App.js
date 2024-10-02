import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Map from './screens/Map';
import { useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import MainAppbar from './components/MainAppbar';
import * as Location from 'expo-location'


const settings = {
  background: '#00a484'
}

const icons = {
  location_not_known: 'crosshairs',
  location_searching: 'crosshairs-question',
  location_found: 'crosshairs-gps'
}

export default function App() {
  const [icon, setIcon] = useState(icons.location_not_known)
  const [location, setLocation] = useState({
    latitude: 65.0800,
    longitude: 25.4800,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  const getUserPosition = async () => {
    setIcon(icons.location_searching)
    let { status } = await Location.requestForegroundPermissionsAsync()

    try {
      if (status !== 'granted') {
        console.log("Geolocation not granted")
        return
      }

      const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
      setLocation({...location,"latitude":position.coords.latitude,"longitude":position.coords.longitude})
      setIcon(icons.location_found)
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <PaperProvider>
      <MainAppbar
        title="map"
        backgroundColor={settings.background}
        icon={icon}
        getUserPosition={getUserPosition}
      />
      <Map location={location}/>
    </PaperProvider>
  );
}


