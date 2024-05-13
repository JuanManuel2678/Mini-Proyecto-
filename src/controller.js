// se llama controler hace referencia que controla las rutas
import { pool } from './db.js'
import path from 'node:path'
import fs from 'node:fs/promises'

export async function index (res) {
  const ruta = path.resolve('./public/index.html')
  const contenido = await fs.readFile(ruta, 'utf-8')

  res.writeHead(200, { 'Content-type': 'text/html' })
  res.end(contenido)

  res.end('')
}

export async function getUsuarios (res) {
  const resultado = await pool.query('SELECT * FROM usuarios')
  const data = resultado[0]
  const dataString = JSON.stringify(data)

  res.writeHead(200, { 'Content-type': 'application/json' })
  res.end(dataString)
}

export async function saveToFile () {}

export async function importFromFile (res) {
  const ruta = path.resolve('./usuarios.csv')
  const contenido = await fs.readFile(ruta, 'utf-8')

  const filas = contenido.split('\n')
  const filasFiltradas = filas.filter((fila) => fila !== '')
  filasFiltradas.shift()

  filasFiltradas.forEach(async (fila) => {
    const columnas = fila.split(',')
    const correo = columnas[4]

    if (correo.includes('@')) {
      console.log('no se inserto por que correo no es valido')
      return
    }
    try {
      await pool.execute('INSERT INTO usuarios(usuarios_id, Nombres, Apellidos, Direccion, Correo,DNI, Edad, Fecha_creacion, TLf ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? )', columnas)
    } catch (error) {
      console.log(' No se pudo insertar La fila ', columnas[0])
    }
  })

  res.writeHead(200, { 'Content-type': 'application/json' })
  const resString = JSON.stringify({ message: 'Filas insertadas' })
  res.end(resString)
}
