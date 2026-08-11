import express from "express"
import { addAnswer, addQuestion, addReplyToReview, addReview, deleteCourse, editCourse, getAllCourses, getAllCoursesAdmin, getCourseByUser, getSingleCourse, uploadCourse } from "../controllers/course.controller";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
const courseRouter = express.Router();

courseRouter.post("/create-course",isAuthenticated,authorizeRole("admin"),uploadCourse);
courseRouter.put("/edit-course/:id",isAuthenticated,authorizeRole("admin"),editCourse);
courseRouter.get("/get-course/:id",getSingleCourse);
courseRouter.get("/get-courses",getAllCourses);
courseRouter.get("/get-course-content/:id",isAuthenticated,getCourseByUser);
courseRouter.put("/add-question",isAuthenticated,addQuestion);
courseRouter.put("/add-answer",isAuthenticated,addAnswer);
courseRouter.put("/add-review/:id",isAuthenticated,addReview);
courseRouter.put("/add-reply/:id",isAuthenticated,authorizeRole("admin"),addReplyToReview);
courseRouter.get("/get-all-courses",isAuthenticated,authorizeRole("admin"),getAllCoursesAdmin);
courseRouter.delete("/delete-courses/:id",isAuthenticated,authorizeRole("admin"),deleteCourse);


export default courseRouter;