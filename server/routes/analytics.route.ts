import express from "express";
import { isAbsolute } from "path";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
import {  getCoursesAnalytics, getOrdersAnalytics, getUserAnalytics } from "../controllers/analytics.controller";
const analyticsRouter = express.Router();

analyticsRouter.get("/get-users-analytics",isAuthenticated,authorizeRole("admin"), getUserAnalytics);
analyticsRouter.get("/get-courses-analytics",isAuthenticated,authorizeRole("admin"), getCoursesAnalytics);
analyticsRouter.get("/get-orders-analytics",isAuthenticated,authorizeRole("admin"), getOrdersAnalytics);

export default analyticsRouter;