import { Router } from 'express';
import { getContent, updateContent } from '../controllers/contentController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', getContent);
router.put('/', authenticateToken, updateContent);

export default router;
