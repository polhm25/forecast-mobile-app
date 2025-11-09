import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { getLocalidadPorNombre } from './utils/FuncionesLocalidad'   // <-- ajusta la ruta si es distinta

export default function App() {

  useEffect(() => {
    async function probar() {
      const resultado = await getLocalidadPorNombre("Granada");   // <-- prueba con cualquier ciudad
      console.log("✅ Resultado Localidad:", resultado);
    }

    probar();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Prueba de getLocalidadPorNombre()</Text>
      <Text style={styles.text}>Mira la consola de Expo / Metro 👀</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111"
  },
  text: {
    color: "white",
    fontSize: 16,
    marginBottom: 8
  }
});
