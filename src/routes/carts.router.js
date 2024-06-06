import { Router } from "express";
import * as controllers from "../controllers/carts.controllers.js"

const router = Router();

router.get('/', controllers.getAllCtr);

router.get('/:cid', controllers.getByIdCtr);

router.post('/', controllers.createCtr);

router.put('/:cid', controllers.updateCtr);

router.delete('/:cid', controllers.removeCtrl);

router.post('/:idCart/products/:idProd', controllers.addProductToCart);

router.delete('/:idCart/products/:idProd', controllers.removeProducFromCart);

router.put('/:idCart/products/:idProd', controllers.updateProductQuantityToCart);

router.delete('/clear/:idCart', controllers.clearCart);

export default router;