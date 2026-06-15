import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getTestimonials = async (req: Request, res: Response) => {
  try {
    const { all } = req.query;
    const where = all === 'true' ? {} : { isActive: true };
    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createTestimonial = async (req: Request, res: Response) => {
  try {
    const { name, course, message, rating, photoUrl } = req.body;
    const testimonial = await prisma.testimonial.create({
      data: { name, course, message, rating: rating || 5, photoUrl }
    });
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateTestimonial = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: req.body
    });
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    await prisma.testimonial.delete({ where: { id } });
    res.json({ message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
