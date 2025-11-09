import axios from "axios";
import dayjs from "dayjs";
import { Hora, Coordenadas } from "../model/Tipos";

const API_KEY_TIMEZONE = "RCSN4D1WJ1XE";

export async function getHora(
  instante: number,
  coordenadas: Coordenadas
): Promise<Hora> {
  //  construir URL

  const endPoint = `https://api.timezonedb.com/v2.1/get-time-zone?key=${API_KEY_TIMEZONE}&format=${"json"}&by=${"position"}&lat=${
    coordenadas.latitud
  }&lng=${coordenadas.longitud}&time=${instante}`;

  // hacer la petición axios
  try {

    const respuestaServidor = await axios.get(endPoint);

    //procesar la respuesta

    const datos = respuestaServidor.data;

    //extraer los datos necesarios

    const horaCruda = datos.formatted;
    const zona = datos.zoneName;

    //formatear hora con dayjs

    const horaFormateada = dayjs(horaCruda).format("HH:mm");

    //devolvemos objeto hora

    return {

        hora: horaFormateada,
        zonaHoraria : zona

    }

  } catch (error) {
    console.log("Ha ocurrido un error consultando a la APi: ", error);

    return {
    hora: "--:--",
    zonaHoraria: "ERROR"
  };
  }

}
