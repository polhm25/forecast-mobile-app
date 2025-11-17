import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Boton from '../components/Boton';

interface Capa1Props {
  nombre: string;
  setNombre: (nombre: string) => void;
  permisoUbicacion: boolean;
  buscarPorNombre: () => void;
  buscarPorUbicacion: () => void;
}

export default function Capa1({
  nombre,
  setNombre,
  permisoUbicacion,
  buscarPorNombre,
  buscarPorUbicacion,
}: Capa1Props) {
  return (
    <View style={styles.contenedor}>
      <TextInput
        style={styles.cuadroTexto}
        placeholder="Escribe el nombre de una localidad"
        value={nombre}
        onChangeText={setNombre}
      />
      <Boton texto="Buscar por nombre de localidad" icono="place" onPress={buscarPorNombre} />
      <Boton texto="Usar la ubicación actual" icono="gps-fixed" onPress={buscarPorUbicacion} />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'column',
    gap: 20,
  },
  cuadroTexto: {
    backgroundColor: '#F7F9FC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D0D7E2',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#222',
  },
});
