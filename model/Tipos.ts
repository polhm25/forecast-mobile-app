export type Coordenadas = {
    latitud: number;
    longitud: number;
};

export type Localidad = {
    nombre: string;
    pais: string;
    codigoPais: string;
    region: string;
    comarca: string;
    coordenadas: Coordenadas;
};

export type EnumIcono =
    | "cloud"
    | "humidity"
    | "location"
    | "rain"
    | "snowflake"
    | "storm"
    | "sunny"
    | "sunrise"
    | "sunset"
    | "temperature"
    | "wind";

export type Tiempo = {
    pronostico: string;
    descripcion: string;
    icono: EnumIcono;
    temperatura: string;
    temperaturaMinima: string;
    temperaturaMaxima: string;
    humedad: number;
    velocidadViento: number;
    salidaSol: string;
    zonaHorariaSalidaSol: string;
    puestaSol: string;
    zonaHorariaPuestaSol: string;
};

export type Hora = {
    hora:string;
    zonaHoraria:string;
};
