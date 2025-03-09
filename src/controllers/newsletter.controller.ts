import { HttpException } from "@/exceptions/httpException";
import { NewsletterService } from "@/services/newsletter.service";
import { Response, Request, NextFunction } from 'express'

export class NewsletterController {
    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid newsletter ID");

            // pasar a entero
            const newsletter = await NewsletterService.getById(id)
            res.status(200).json(newsletter)
        } catch (error) {
            next(error)
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            //localhost:3000/newsletter?title=XXXXXX
            const { title } = req.query;
            const newsletters = await NewsletterService.getAll(title as string)
            res.status(200).json(newsletters)
        } catch (error) {
            next(error)
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const newsletterData = req.body
            const userId = req.user?.id
            if (!userId) throw new HttpException(400, "User creator ID is required");

            const newNewsletter = await NewsletterService.create(userId, newsletterData)
            res.status(200).json(newNewsletter)
        } catch (error) {
            next(error)
        }
    }
    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const newsletterData = req.body
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid newsletter ID");

            const updatedNewsletter = await NewsletterService.update(id, newsletterData)
            res.status(200).json(updatedNewsletter)
        } catch (error) {
            next(error)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid newsletter ID");

            const deletedNewsletter = await NewsletterService.delete(id)
            res.status(200).json(deletedNewsletter)
        } catch (error) {
            next(error)
        }
    }
    static async rate(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number.parseInt(req.params.id)
            console.log('id!!!', id)
            if (isNaN(id)) throw new HttpException(400, "Invalid newsletter ID");

            const { value } = req.body
            const userId = req.user?.id
            if (!userId) throw new HttpException(400, "User creator ID is required");
            console.log('value!!!', value)
            console.log('userId!!!', userId)
            await NewsletterService.rate(userId, id, value)
            res.status(200).json({ message: 'Newsletter rate successfully' })
        } catch (error) {
            next(error)
        }
    }

    static async getRate(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid newsletter ID");

            const rate = await NewsletterService.getRate(id)
            console.log(rate)
            res.status(200).json(rate)
        } catch (error) {
            next(error)
        }
    }
    static async getMyRate(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid newsletter ID");

            const userId = req.user?.id
            if (!userId) throw new HttpException(400, "User creator ID is required");

            const rate = await NewsletterService.getMyRate(userId, id)
            res.status(200).json(rate)
        } catch (error) {
            next(error)
        }
    }
}
