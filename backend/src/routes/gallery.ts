import { Router } from 'express';
import { getGallery, addGalleryImage, deleteGalleryImage } from '../controllers/galleryController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', getGallery);
router.post('/', authenticateToken, addGalleryImage);
router.delete('/:id', authenticateToken, deleteGalleryImage);

export default router;
