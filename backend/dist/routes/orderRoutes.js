"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../middlewares/verifyToken");
const ordersController_1 = require("../controllers/ordersController");
const order_router = (0, express_1.Router)();
order_router.route('/').post(ordersController_1.addOrderItems).get(verifyToken_1.verifyToken, ordersController_1.getOrders);
order_router.route('/myorders').get(verifyToken_1.verifyToken, ordersController_1.getMyOrders);
order_router.route('/:id').get(verifyToken_1.verifyToken, ordersController_1.getOrderById);
order_router.route('/:id/pay').put(verifyToken_1.verifyToken, ordersController_1.updateOrderToPaid);
order_router.route('/:id/deliver').put(verifyToken_1.verifyToken, ordersController_1.updateOrderToDelivered);
exports.default = order_router;
