import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getGallery = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const where: any = {};
    if (category && category !== 'all') where.category = category;
    const images = await prisma.gallery.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addGalleryImage = async (req: Request, res: Response) => {
  try {
    const { title, imageUrl, category } = req.body;
    if (!imageUrl) return res.status(400).json({ error: 'Image URL required' });
    const image = await prisma.gallery.create({
      data: { title, imageUrl, category: category || 'general' }
    });
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteGalleryImage = async (req: Request, res: Response) => {
  try {
    await prisma.gallery.delete({ where: { id: parseInt(req.params.id as string) } });
    res.json({ message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
