/*
 * Very simple local filesystem storage layer, following similar structure as excalidraw-store
 *
 * Suitable for basic use, but will hit various filesystem limits under heavier use, e.g. you might want to use
 * subfolders based on the first few letters of the `key` instead of just directly storing them in one folder.
 */

import type { IStorage } from './interface'
import type { Request, Response } from 'express'
import {
  FILE_SIZE_LIMIT,
  FILESYSTEM_ROOT,
  LOCAL_STORAGE_PATH,
  OVERRIDE_PROTOCOL,
} from '../settings'
import * as fs from 'fs'
import path from 'path'

export class LocalFileStorage implements IStorage {
  async init(): Promise<void> {
    console.log(`Setting up local storage in ${LOCAL_STORAGE_PATH}`)
    if (!fs.existsSync(LOCAL_STORAGE_PATH)) {
      fs.mkdirSync(LOCAL_STORAGE_PATH, {
        recursive: true,
        mode: '0o750',
      })
    }
  }

  getFilePath(key: string): string {
    return path.join(LOCAL_STORAGE_PATH, key)
  }

  async get(key: string, res: Response): Promise<void> {
    res.sendFile(this.getFilePath(key), { root: FILESYSTEM_ROOT })
  }

  async set(key: string, req: Request, res: Response): Promise<void> {
    let fileSize = 0
    let fileStream = fs.createWriteStream(this.getFilePath(key))
    let err = false

    // Report errors
    fileStream.on('error', (error) => {
      err = true
      console.error(error)
      res.status(500).json({ message: error.message })
    })

    // Send response when the upload finishes
    fileStream.on('close', async () => {
      if (err) {
        return
      }

      const proto = OVERRIDE_PROTOCOL ? OVERRIDE_PROTOCOL : req.protocol

      res.status(200).json({
        key,
        data: `${proto}://${req.get('host')}/api/v2/${key}`,
      })
    })

    // Start pumping chunks from input to filesystem
    req.on('data', (chunk) => {
      fileStream.write(chunk)
      fileSize += chunk.length
      if (fileSize > FILE_SIZE_LIMIT) {
        err = true
        const error = {
          message: 'Data is too large.',
          max_limit: FILE_SIZE_LIMIT,
        }
        fileStream.destroy()
        console.error(error)
        return res.status(413).json(error)
      }
    })

    // End the file stream once upload of data completes
    req.on('end', () => {
      fileStream.end()
    })
  }
}
