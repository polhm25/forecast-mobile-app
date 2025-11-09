import axios from "axios";
import { Coordenadas, Localidad } from "../model/Tipos";

export async function getLocalidadPorCoordenadas(coordenadas: Coordenadas): Promise<Localidad> {
    
    const endPoint = `https://nominatim.openstreetmap.org/reverse?lat=${coordenadas.latitud}&lon=${coordenadas.longitud}&format=jsonv2&addressdetails=1&accept-language=es`;

    try {

    const respuestaServidor = await axios.get(endPoint, {
        headers: {
        "User-Agent": "El Tiempo/1.0 (tucorreo@gmail.com)"
    }
    });

    const datos = respuestaServidor.data;
    const address = datos.address;

    const nombre = address.city;
    const pais = address.country;
    const codigoPais = address.country_code.toUpperCase();
    const region = address.state;
    const comarca = address.county;

    const coordenadas: Coordenadas = {
        latitud: Number(datos.lat),
        longitud: Number(datos.lon)
    };

    return {
        nombre: nombre,
        pais: pais,
        codigoPais: codigoPais,
        region: region,
        comarca: comarca,
        coordenadas: coordenadas
    };

    } catch (error) {

    console.log("Error al consultar la API de localidad:", error);

    return {
        nombre: "Desconocido",
        pais: "Desconocido",
        codigoPais: 0,
        region: "",
        comarca: "",
        coordenadas: { latitud: 0, longitud: 0 }
    };

    }
}

export async function getLocalidadPorNombre(nombre:string):Promise<Localidad> {

    const endPoint = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(nombre)}&limit=1&format=json&addressdetails=1&accept-language=es`;

    
    try {

        const respuestaServidor = await axios.get(endPoint, {
        headers: {
            "User-Agent": "El Tiempo/1.0 (tucorreo@gmail.com)"
        }
        });

        const datos = respuestaServidor.data[0];

    const partes = datos.display_name.split(",");

    const nombreLocalidad = partes[0].trim();
    const comarca = partes[1].trim();
    const region = partes[2].trim();
    const pais = datos.address.country;
    const codigoPais = datos.address.country_code.toUpperCase();

    const coordenadas: Coordenadas = {
        latitud: Number(datos.lat),
        longitud: Number(datos.lon)
    };

    return {
        nombre: nombreLocalidad,
        pais: pais,
        codigoPais: codigoPais,
        region: region,
        comarca: comarca,
        coordenadas: coordenadas
    };
        

    } catch (error) {

        console.log("Error en getLocalidadPorNombre:", error);

        return {
        nombre: "Desconocido",
        pais: "Desconocido",
        codigoPais: 0,
        region: "",
        comarca: "",
        coordenadas: { latitud: 0, longitud: 0 }
        };
    }

}
