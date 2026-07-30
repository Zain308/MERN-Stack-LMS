import express from 'express';
import { registerationUser } from '../controllers/user.controller';
const router = express.Router();

router.post('/registration',registerationUser);

export default router;