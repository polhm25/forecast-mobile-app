import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';

// Enum para los tipos de iconos disponibles
export type EnumIcono =
  | 'cloud'
  | 'humidity'
  | 'rain'
  | 'snowflake'
  | 'storm'
  | 'sunny'
  | 'sunrise'
  | 'sunset'
  | 'temperature'
  | 'wind'
  | 'location'
  | 'nube';

// Tipo para el objeto de iconos
type IconosType = {
  cloud: ImageSourcePropType;
  humidity: ImageSourcePropType;
  rain: ImageSourcePropType;
  snowflake: ImageSourcePropType;
  storm: ImageSourcePropType;
  sunny: ImageSourcePropType;
  sunrise: ImageSourcePropType;
  sunset: ImageSourcePropType;
  temperature: ImageSourcePropType;
  wind: ImageSourcePropType;
  location: ImageSourcePropType;
  nube: ImageSourcePropType;
};

// Objeto que asocia cada icono con su imagen
const ICONOS: IconosType = {
  cloud: require('../assets/cloud.png'),
  humidity: require('../assets/humidity.png'),
  rain: require('../assets/rain.png'),
  snowflake: require('../assets/snowflake.png'),
  storm: require('../assets/storm.png'),
  sunny: require('../assets/sunny.png'),
  sunrise: require('../assets/sunrise.png'),
  sunset: require('../assets/sunset.png'),
  temperature: require('../assets/temperature.png'),
  wind: require('../assets/wind.png'),
  location: require('../assets/location.png'),
  nube: require('../assets/nube.png'),
};

type TarjetaProps = {
  textoPrincipal: string;
  textoSecundario: string;
  icono: EnumIcono;
}

export default function Tarjeta({ textoPrincipal, textoSecundario, icono }: TarjetaProps) {
  return (
    <View style={styles.contenedor}>
      <Image source={ICONOS[icono]} style={styles.icono} />
      <View>
        <Text style={styles.textoPrincipal}>{textoPrincipal}</Text>
        <Text style={styles.textoSecundario}>{textoSecundario}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    borderRadius: 15,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textoPrincipal: {
    color: '#6C56A7',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'right',
  },
  textoSecundario: {
    color: '#A4A0AD',
    fontSize: 14,
    textAlign: 'right',
  },
  icono: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});
