import { Router } from "express";
import { loginValidation, offerValidation, rateValidation, registerValidation } from "../middlewares/validators.middleware";
import { ValidationMiddleware } from "../middlewares/validation.middleware";
import { QuejaController } from "../controllers/queja.controller";
import { isAuthenticate } from "@/middlewares/auth.middleware";
import { isAdmin } from "@/middlewares/isAdmin.middleware";
const router = Router()

//API REST FULL


//GET Listar todas las ofertas localhost:3000/api/offers/?title=react&category=dam
router.get('/', isAuthenticate, QuejaController.getAll)
//POST añadir una oferta nueva localhost:3000/api/offers/  {body}
router.post('/', isAuthenticate, ValidationMiddleware, QuejaController.create)



//localhost:3000/api/offers/xxxx
router.get('/:id', isAuthenticate, QuejaController.getById)
//DELETE Borrar una oferta localhost:3000/api/offers/XXXX  
router.delete('/:id', isAuthenticate, isAdmin, QuejaController.delete)
//PUT modificar una oferta localhost:3000/api/offers/XXXX  {body}
router.put('/:id', isAuthenticate, isAdmin, ValidationMiddleware, QuejaController.update)





export default router