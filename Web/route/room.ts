import { Router, Request, Response } from 'express'
import { v4 } from 'uuid'
export const roomRoute = Router()
roomRoute.get('/', (req: Request, res: Response) => {
  res.redirect(`/${v4()}`)
})

roomRoute.get('/:room', (req: Request, res: Response) => {
  res.render('room', { roomId: req.params.room })
})
