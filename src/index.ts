import cors from 'cors'
import express from 'express'
import type { Express, Request, Response } from 'express'
import { nanoid } from 'nanoid'
import { CORS_ALLOW_ORIGINS, PORT, STORAGE_MODULE } from './settings'
import type { IStorage } from './storage/interface'
import { LocalFileStorage } from './storage/local'

// Prepare storage
const storageModules: { [key: string]: IStorage } = {
  local: new LocalFileStorage(),
}

export const storage = storageModules[STORAGE_MODULE]
if (storage === undefined) {
  console.log(`Unknown STORAGE_MODULE ${STORAGE_MODULE}`)
  console.log(`Supported values: ${Object.keys(storageModules).join(', ')}`)
  process.exit(1)
}

console.log(`STORAGE_MODULE: ${STORAGE_MODULE}`)
storage.init().then(() => {
  console.log('Storage initialized')
})

// Prepare CORS
let allowOrigins = [
  'excalidraw.vercel.app',
  'https://excalidraw.com',
  'https://www.excalidraw.com',
  'https://math.preview.excalidraw.com',
  'http://localhost:',
]

if (CORS_ALLOW_ORIGINS) {
  allowOrigins = CORS_ALLOW_ORIGINS.split(',')
}

var corsOptions = {
  origin: allowOrigins
}

const app: Express = express()

app.use(cors(corsOptions));

app.get('/api/v2/:key', async (req: Request, res: Response) => {
  try {
    const key = <string>req.params.key
    await storage.get(key, res)
    res.status(200)
    res.setHeader('content-type', 'application/octet-stream')
  } catch (error) {
    console.error(error)
    res.status(404).json({ message: 'Could not find the file.' })
  }
})

app.post('/api/v2/post/', async (req: Request, res: Response) => {
  try {
    const key = nanoid()
    await storage.set(key, req, res)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Could not upload the data.' })
  }
})

app.post('/api/v2/post/:key', async (req: Request, res: Response) => {
  try {
    const key = <string>req.params.key
    await storage.set(key, req, res)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Could not upload the data.' })
  }
});

app.listen(PORT, () => console.log(`Listening to http://0.0.0.0:${PORT}`))
