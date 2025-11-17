import * as Location from "expo-location";
import { Coordenadas } from "../model/Tipos";

/*
 Solicita permisos de ubicación al usuario 
 Devuelve true si el permiso fue otorgado, false en caso contrario
 */
export async function solicitarPermisoUbicacion(): Promise<boolean> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      return true;
    } else {
      console.log("Permiso de ubicación denegado");
      return false;
    }
  } catch (error) {
    console.log("Error al solicitar permiso de ubicación:", error);
    return false;
  }
}

/*
  Obtiene las coordenadas actuales del dispositivo usando GPS
  devuelve un objeto con latitud y longitud
 */
export async function obtenerCoordenadas(): Promise<Coordenadas> {
  try {
    // Primero verificar si tenemos permisos
    const { status } = await Location.getForegroundPermissionsAsync();

    if (status !== "granted") {
      // Si no tenemos permisos, solicitarlos
      const permisoOtorgado = await solicitarPermisoUbicacion();
      if (!permisoOtorgado) {
        throw new Error("No se tiene permiso para acceder a la ubicación");
      }
    }

    // Obtener la ubicación actual
    const ubicacion = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    const coordenadas: Coordenadas = {
      latitud: ubicacion.coords.latitude,
      longitud: ubicacion.coords.longitude,
    };

    return coordenadas;
  } catch (error) {
    console.log("Error al obtener coordenadas:", error);
    // Retornar coordenadas por defecto (Granada, España)
    return {
      latitud: 37.1761,
      longitud: -3.5979,
    };
  }
}
