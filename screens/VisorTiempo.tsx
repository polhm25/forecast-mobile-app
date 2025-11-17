import React from 'react';
import { View, StyleSheet } from 'react-native';
import VisorLocalidad from '../components/VisorLocalidad';
import Tarjeta from '../components/Tarjeta';
import { Localidad, Tiempo } from '../model/Tipos';

interface VisorTiempoProps {
  localidad: Localidad;
  tiempo: Tiempo;
}

export default function VisorTiempo({ localidad, tiempo }: VisorTiempoProps) {
  return (
    <View style={styles.contenedor}>
      <VisorLocalidad localidad={localidad} />

      <Tarjeta
        textoPrincipal={localidad.comarca}
        textoSecundario={localidad.region}
        icono="location"
      />

      <Tarjeta
        textoPrincipal={tiempo.pronostico}
        textoSecundario={tiempo.descripcion}
        icono={tiempo.icono}
      />

      <Tarjeta
        textoPrincipal={tiempo.temperatura}
        textoSecundario={`${tiempo.humedad} %`}
        icono="temperature"
      />

      <Tarjeta
        textoPrincipal={`${tiempo.temperaturaMinima} min`}
        textoSecundario={`${tiempo.temperaturaMaxima} max`}
        icono="temperature"
      />

      <Tarjeta
        textoPrincipal={`${tiempo.velocidadViento} °C`}
        textoSecundario="Millas/hora"
        icono="wind"
      />

      <Tarjeta
        textoPrincipal={tiempo.salidaSol}
        textoSecundario={tiempo.zonaHorariaSalidaSol}
        icono="sunrise"
      />

      <Tarjeta
        textoPrincipal={tiempo.puestaSol}
        textoSecundario={tiempo.zonaHorariaPuestaSol}
        icono="sunset"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});
