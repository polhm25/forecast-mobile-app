import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Localidad } from '../model/Tipos';

interface VisorLocalidadProps {
  localidad: Localidad;
}

export default function VisorLocalidad({ localidad }: VisorLocalidadProps) {
  const urlBandera = `https://flagsapi.com/${localidad.codigoPais}/flat/64.png`;

  return (
    <View style={styles.contenedor}>
      <Image source={{ uri: urlBandera }} style={styles.icono} />
      <Text style={styles.titulo}>{localidad.nombre}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    textTransform: 'capitalize',
    // Aquí se añadirán los estilos del estilo global "titulo"
  },
  icono: {
    // Aquí se añadirán los estilos del estilo global "icono"
    width: 64,
    height: 64,
    resizeMode: 'contain',
  },
});
