import type { Request, Response } from 'express'

export interface IStorage {
  get(key: string, res: Response): Promise<void>
  set(key: string, req: Request, res: Response): Promise<void>
  init(): Promise<void>
}
