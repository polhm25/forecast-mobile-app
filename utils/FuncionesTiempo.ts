import axios from "axios";
import { Localidad, Tiempo, EnumIcono } from "../model/Tipos";
import { getGradosCentigrados } from "../model/Grados";
import { getHora } from "./FuncionesHora";

// API Key de OpenWeatherMap 
const API_KEY_WEATHER = "7724b5681906e357e5e35c89eaddf57f";

/*
  Mapea los códigos de iconos de OpenWeatherMap a los iconos disponibles en la app
  OpenWeatherMap devuelve códigos como "01d", "02d", "04d", etc.
 */
export function getImagenIcono(idIcono: string): EnumIcono {
  // Extraer el número del código (ej: "01d" -> "01")
  const codigoNumerico = idIcono.substring(0, 2);

  // Mapeo de códigos OpenWeatherMap a EnumIcono
  const mapeoIconos: { [key: string]: EnumIcono } = {
    "01": "sunny",       // cielo despejado
    "02": "cloud",       // pocas nubes
    "03": "cloud",       // nubes dispersas
    "04": "cloud",       // nubes
    "09": "rain",        // lluvia ligera
    "10": "rain",        // lluvia moderada
    "11": "storm",       // tormenta
    "13": "snowflake",   // nieve
    "50": "cloud",       // niebla
  };

  // Retornar el icono mapeado, o "sunny" por defecto
  return mapeoIconos[codigoNumerico] || "sunny";
}

/*
  Obtiene los datos del tiempo para una localidad desde OpenWeatherMap 
  devueve un objeto con toda la información del tiempo
 */
export async function getTiempo(localidad: Localidad): Promise<Tiempo> {
  try {
    // Construir la URL de la petición
    const endPoint = `http://api.openweathermap.org/data/2.5/weather?lat=${
      localidad.coordenadas.latitud
    }&lon=${localidad.coordenadas.longitud}&appid=${API_KEY_WEATHER}&lang=es`;

    // Hacer la petición
    const respuestaServidor = await axios.get(endPoint);
    const datos = respuestaServidor.data;

    // Extraer datos principales del tiempo
    const pronostico = datos.weather[0].main;
    const descripcion = datos.weather[0].description;
    const icono = getImagenIcono(datos.weather[0].icon);

    // Convertir temperaturas de Kelvin a Celsius
    const temperatura = getGradosCentigrados(datos.main.temp);
    const temperaturaMinima = getGradosCentigrados(datos.main.temp_min);
    const temperaturaMaxima = getGradosCentigrados(datos.main.temp_max);

    // Extraer humedad y velocidad del viento
    const humedad = datos.main.humidity;
    const velocidadViento = datos.wind.speed;

    // Obtener hora de salida y puesta del sol con zona horaria
    const horaSalida = await getHora(datos.sys.sunrise, localidad.coordenadas);
    const horaPuesta = await getHora(datos.sys.sunset, localidad.coordenadas);

    // Construir y devolver objeto Tiempo
    return {
      pronostico: pronostico,
      descripcion: descripcion,
      icono: icono,
      temperatura: temperatura,
      temperaturaMinima: temperaturaMinima,
      temperaturaMaxima: temperaturaMaxima,
      humedad: humedad,
      velocidadViento: velocidadViento,
      salidaSol: horaSalida.hora,
      zonaHorariaSalidaSol: horaSalida.zonaHoraria,
      puestaSol: horaPuesta.hora,
      zonaHorariaPuestaSol: horaPuesta.zonaHoraria,
    };
  } catch (error) {
    console.log("Error al obtener datos del tiempo:", error);

    // Devolver objeto Tiempo con valores por defecto en caso de error
    return {
      pronostico: "Desconocido",
      descripcion: "No se pudo obtener la información",
      icono: "sunny",
      temperatura: "--",
      temperaturaMinima: "--",
      temperaturaMaxima: "--",
      humedad: 0,
      velocidadViento: 0,
      salidaSol: "--:--",
      zonaHorariaSalidaSol: "ERROR",
      puestaSol: "--:--",
      zonaHorariaPuestaSol: "ERROR",
    };
  }
}
