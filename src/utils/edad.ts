import dayjs from 'dayjs'

export const edadEnMeses = (fechaNacimiento: Date | string, fecha: Date | string = new Date()) =>
    Math.max(0, dayjs(fecha).diff(dayjs(fechaNacimiento), 'month'))

// Parámetros, sección III: menores de 24 meses -> en meses; desde 24 meses -> en años
export const formatearEdad = (meses: number) => {
    if (meses < 1) return 'Menos de 1 mes'
    if (meses < 24) return `${meses} ${meses === 1 ? 'mes' : 'meses'}`
    const anios = Math.floor(meses / 12)
    return `${anios} años`
}
