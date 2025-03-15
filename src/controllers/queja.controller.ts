import { HttpException } from "@/exceptions/httpException";
import { QuejaService } from "@/services/queja.service";
import { Response, Request, NextFunction } from 'express'

export class QuejaController {
    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid queja ID");

            // pasar a entero
            const queja = await QuejaService.getById(id)
            res.status(200).json(queja)
        } catch (error) {
            next(error)
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            //solo admin mira todo
            if (req.user?.role === 'admin') {
                const { title } = req.query;
                const quejas = await QuejaService.getAll(title as string)
                res.status(200).json(quejas)
            }
            else {
                const { title } = req.query;
                const userId = req.user?.id
                if (!userId) throw new HttpException(400, "Invalid user ID");
                const quejas = await QuejaService.getFromUser(userId, title as string)
                res.status(200).json(quejas)
            }
        } catch (error) {
            next(error)
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const quejaData = req.body
            const userId = req.user?.id
            if (!userId) throw new HttpException(400, "User creator ID is required");

            const newQueja = await QuejaService.create(userId, quejaData)
            res.status(200).json(newQueja)
        } catch (error) {
            next(error)
        }
    }
    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const quejaData = req.body
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid queja ID");

            const updatedQueja = await QuejaService.update(id, quejaData)
            res.status(200).json(updatedQueja)
        } catch (error) {
            next(error)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid queja ID");

            const deletedQueja = await QuejaService.delete(id)
            res.status(200).json(deletedQueja)
        } catch (error) {
            next(error)
        }
    }

}
