import { Router } from 'express';
import {
  getAdmissions, getAdmission, createAdmission, updateAdmissionStatus, deleteAdmission
} from '../controllers/admissionController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, getAdmissions);
router.get('/:id', authenticateToken, getAdmission);
router.post('/', createAdmission);
router.put('/:id/status', authenticateToken, updateAdmissionStatus);
router.delete('/:id', authenticateToken, deleteAdmission);

export default router;
