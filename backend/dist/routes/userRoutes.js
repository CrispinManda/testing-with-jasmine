"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersControllers_1 = require("../controllers/usersControllers");
const verifyToken_1 = require("../middlewares/verifyToken");
const user_router = (0, express_1.Router)();
user_router.post('/register', usersControllers_1.registerUser);
user_router.post('/login', usersControllers_1.loginUser);
//user_router.post("/forgot", forgotPassword);
//user_router.post("/reset", resetPassword);
user_router.get('/check_user_details', verifyToken_1.verifyToken, usersControllers_1.checkUserDetails);
user_router.get("/allUsers", verifyToken_1.verifyToken, usersControllers_1.getAllUsers);
user_router.get('/:id', verifyToken_1.verifyToken, usersControllers_1.getOneUser);
user_router.delete('/:user_id', verifyToken_1.verifyToken, usersControllers_1.deleteUser);
user_router.put('/update/:user_id', verifyToken_1.verifyToken, usersControllers_1.updateUserDetails);
user_router.put('/:user_id', verifyToken_1.verifyToken, usersControllers_1.updateUserActiveStatus);
exports.default = user_router;
