import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { getHora } from "./utils/FuncionesHora"

export default function App() {

  useEffect(() => {

    const instanteActual = Math.floor(Date.now() / 1000); 
    const coords = { latitud: 37.17, longitud: -3.60 };

    getHora(instanteActual, coords)
      .then(resultado => console.log("✅ Resultado:", resultado))
      .catch(error => console.log("❌ Error:", error));

  }, []);

  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
