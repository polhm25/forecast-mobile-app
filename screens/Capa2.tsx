import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

type Capa2Props = {
  estadoCarga: string;
}

export default function Capa2({ estadoCarga }: Capa2Props) {
  return (
    <View style={styles.contenedor}>
      <ActivityIndicator size={48} color="blue" />
      <Text>{estadoCarga}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
