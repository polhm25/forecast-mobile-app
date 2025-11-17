import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Alert } from 'react-native';
import { Image } from 'expo-image';
import { Localidad, Tiempo, Coordenadas } from './model/Tipos';
import { solicitarPermisoUbicacion, obtenerCoordenadas } from './utils/FuncionesCoordenadas';
import { getLocalidadPorNombre, getLocalidadPorCoordenadas } from './utils/FuncionesLocalidad';
import { getTiempo } from './utils/FuncionesTiempo';
import Capa1 from './screens/Capa1';
import Capa2 from './screens/Capa2';
import VisorTiempo from './screens/VisorTiempo';

export default function App() {
  const [permisoUbicacion, setPermisoUbicacion] = useState<boolean>(false);
  const [nombre, setNombre] = useState<string>('');
  const [localidad, setLocalidad] = useState<Localidad | null>(null);
  const [tiempo, setTiempo] = useState<Tiempo | null>(null);
  const [capaActiva, setCapaActiva] = useState<number>(1);
  const [estadoCarga, setEstadoCarga] = useState<string>('');

  // Función para mostrar error
  const mostrarError = (mensaje: string) => {
    Alert.alert('Error', mensaje);
    setCapaActiva(1);
  };

  // Función para pedir permiso de ubicación
  const pedirPermisoUbicacion = async () => {
    const resultado = await solicitarPermisoUbicacion();
    if (resultado) {
      setPermisoUbicacion(true);
    }
  };

  // Función para buscar por nombre
  const buscarPorNombre = async () => {
    setCapaActiva(2);
    setEstadoCarga('Obteniendo datos de la localidad');

    try {
      const localidadObtenida = await getLocalidadPorNombre(nombre);
      setLocalidad(localidadObtenida);
    } catch (error) {
      mostrarError('Error al obtener la localidad');
    }
  };

  // Función para buscar por coordenadas
  const buscarPorCoordenadas = async () => {
    setCapaActiva(2);
    setEstadoCarga('Obteniendo la ubicación');

    try {
      const coordenadas = await obtenerCoordenadas();
      await obtenerLocalidad(coordenadas);
    } catch (error) {
      mostrarError('Error al obtener la ubicación');
    }
  };

  // Función para obtener localidad por coordenadas
  const obtenerLocalidad = async (coordenadas: Coordenadas) => {
    setEstadoCarga('Obteniendo datos de la localidad');

    try {
      const localidadObtenida = await getLocalidadPorCoordenadas(coordenadas);
      setLocalidad(localidadObtenida);
    } catch (error) {
      mostrarError('Error al obtener datos de la localidad');
    }
  };

  // Función para consultar el tiempo
  const consultarTiempo = async () => {
    if (localidad !== null) {
      setEstadoCarga('Consultando el tiempo');

      try {
        const tiempoObtenido = await getTiempo(localidad);
        setTiempo(tiempoObtenido);
      } catch (error) {
        mostrarError('Error al consultar el tiempo');
      }
    }
  };

  // Función para obtener la capa activa
  const getCapaActiva = (): React.ReactNode => {
    if (capaActiva === 1) {
      return (
        <Capa1
          nombre={nombre}
          setNombre={setNombre}
          permisoUbicacion={permisoUbicacion}
          buscarPorNombre={buscarPorNombre}
          buscarPorUbicacion={buscarPorCoordenadas}
        />
      );
    } else if (capaActiva === 2) {
      return <Capa2 estadoCarga={estadoCarga} />;
    }
  };

  // Función para resetear
  const reset = () => {
    setNombre('');
    setLocalidad(null);
    setCapaActiva(1);
  };

  // Efecto para pedir permiso de ubicación al iniciar
  useEffect(() => {
    pedirPermisoUbicacion();
  }, []);

  // Efecto para consultar el tiempo cuando cambia la localidad
  useEffect(() => {
    consultarTiempo();
  }, [localidad]);

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>El Tiempo</Text>
      <Image source={require('./assets/icon.png')} style={styles.logotipo} />
      <View style={styles.contenedorCapas}>{getCapaActiva()}</View>

      <Modal
        visible={localidad !== null && tiempo !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={reset}
      >
        <TouchableOpacity style={styles.modalContenedor} onPress={reset} activeOpacity={1}>
          <View style={styles.modalInferior}>
            {localidad && tiempo && <VisorTiempo localidad={localidad} tiempo={tiempo} />}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    flexDirection: 'column',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  titulo: {
    // Estilo global titulo - por definir
    fontSize: 32,
    fontWeight: 'bold',
  },
  logotipo: {
    width: 128,
    height: 128,
  },
  contenedorCapas: {
    width: '75%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContenedor: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalInferior: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#E6ECF3',
    width: '100%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
});
