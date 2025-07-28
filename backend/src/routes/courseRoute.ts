import express from 'express';
import { isAdmin } from '../middleware/adminMiddleware';
import { protect } from '../middleware/auth';
import { createCourse, deleteCourseById, getAllCourses, getCourseById, updateCourseById } from '../controllers/courseController';
import { upload } from '../middleware/multerConfig';

const router = express.Router();

//admin routes for course management
// Create a new course
router.post('/create',upload.single('thumbnail'),protect,isAdmin,createCourse );
// Update course by ID
router.put('/updateCourse/:id', protect, isAdmin, updateCourseById);
//delete course by ID
router.delete('/deleteCourse/:id', protect, isAdmin,deleteCourseById)


//user routes for course viewing
// Get all courses
router.get('/allCourses',getAllCourses);
//get course by id
router.get('/getCourse/:id', getCourseById);


export default router;  