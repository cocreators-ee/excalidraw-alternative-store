import dotenv from 'dotenv'

dotenv.config()

// Configuration
export const PORT = Number(process.env.PORT || 8080)
export const FILE_SIZE_LIMIT = Number(
  process.env.FILE_SIZE_LIMIT || 2 * 1024 * 1024,
)
export const STORAGE_MODULE = process.env.STORAGE_MODULE || 'local'
export const CORS_ALLOW_ORIGINS: string = process.env.CORS_ALLOW_ORIGINS || ''
export const LOCAL_STORAGE_PATH = process.env.LOCAL_STORAGE_PATH || './storage'
export const FILESYSTEM_ROOT = process.cwd()
