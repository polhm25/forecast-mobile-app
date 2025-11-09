export function getGradosCentigrados(gradosKelvin:number):string{
    const formulaCentigrados = gradosKelvin - 273.15
    return formulaCentigrados.toFixed(1)
}