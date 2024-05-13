import http from 'node:http'
import { getUsuarios, saveToFile, index, importFromFile } from './controller.js'

const server = http.createServer(async (req, res) => {
  const url = req.url
  const method = req.method

  if (method === 'GET') {
    switch (url) {
      case '/':
        index(res)
        break

      case '/api/usuarios':
        getUsuarios(res)
        break

      case '/api/usuarios/export':
        saveToFile()
        break

      case '/api/usuarios/import':
        importFromFile(res)
        break

      default:
        Response.end('no se encontro la ruta')
        break
    }
  }
  if (method === 'POST') {
    // cod para put
  }
})

server.listen(3000, () =>
  console.log('servidor ejecutandoce en http://localhost:3000')
)
