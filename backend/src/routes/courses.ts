import { Router } from 'express';
import {
  getCourses, getCourse, createCourse, updateCourse, deleteCourse
} from '../controllers/courseController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', getCourses);
router.get('/:slug', getCourse);
router.post('/', authenticateToken, createCourse);
router.put('/:id', authenticateToken, updateCourse);
router.delete('/:id', authenticateToken, deleteCourse);

export default router;
