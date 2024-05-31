import { Router } from "express";
import * as controllers from "../controllers/products.controllers.js";

const router = Router();

router.get('/', controllers.getAllCtr);

router.get('/:pid', controllers.getByIdCtr);

router.post('/', controllers.createCtr);

router.put('/:pid', controllers.updateCtr);

router.delete('/:pid', controllers.removeCtrl);

export default router;