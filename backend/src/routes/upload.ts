import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth';
import { upload, uploadToCloudinary } from '../utils/cloudinary';

const router = Router();

router.post('/', authenticateToken, upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file provided' });
    const folder = (req.query.folder as string) || 'general';
    const url = await uploadToCloudinary(req.file.buffer, folder);
    res.json({ url });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

export default router;
