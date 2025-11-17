import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type IconoType = 'place' | 'gps-fixed';

interface BotonProps {
  texto: string;
  icono: IconoType;
  onPress: () => void;
}

export default function Boton({ texto, icono, onPress }: BotonProps) {
  return (
    <TouchableOpacity style={styles.contenedor} onPress={onPress}>
      <MaterialIcons name={icono} size={24} color="#fff" />
      <Text style={styles.texto}>{texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007aff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  texto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
