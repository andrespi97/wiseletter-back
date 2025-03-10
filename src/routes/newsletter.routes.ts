import { Router } from "express";
import { loginValidation, offerValidation, rateValidation, registerValidation } from "../middlewares/validators.middleware";
import { ValidationMiddleware } from "../middlewares/validation.middleware";
import { NewsletterController } from "../controllers/newsletter.controller";
import { isAuthenticate } from "@/middlewares/auth.middleware";
import { isAdmin } from "@/middlewares/isAdmin.middleware";
const router = Router()

//API REST FULL


//GET Listar todas las ofertas localhost:3000/api/offers/?title=react&category=dam
router.get('/', isAuthenticate, NewsletterController.getAll)
//localhost:3000/api/offers/xxxx
router.get('/:id', isAuthenticate, NewsletterController.getById)
//POST añadir una oferta nueva localhost:3000/api/offers/  {body}
router.post('/', isAuthenticate, isAdmin, ValidationMiddleware, NewsletterController.create)
//DELETE Borrar una oferta localhost:3000/api/offers/XXXX  
router.delete('/:id', isAuthenticate, isAdmin, NewsletterController.delete)
//PUT modificar una oferta localhost:3000/api/offers/XXXX  {body}
router.put('/:id', isAuthenticate, isAdmin, ValidationMiddleware, NewsletterController.update)

// Calificamos una oferta x   {body}
router.post('/:id/rate/', isAuthenticate, rateValidation, NewsletterController.rate)
// Vemos que calificación (total) se le ha data a una oferta X
router.get('/:id/rate/', isAuthenticate, NewsletterController.getRate)
router.get('/:id/myRate/', isAuthenticate, NewsletterController.getMyRate)



export default router