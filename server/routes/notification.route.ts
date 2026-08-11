import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
import { getNotification, updateNotification } from "../controllers/notification.controller";
const notificationRouter = express.Router();

notificationRouter.get("/get-all-notifications",isAuthenticated,authorizeRole("admin"),getNotification);
notificationRouter.get("/update-notification/:id",isAuthenticated,authorizeRole("admin"),updateNotification);

export default notificationRouter;