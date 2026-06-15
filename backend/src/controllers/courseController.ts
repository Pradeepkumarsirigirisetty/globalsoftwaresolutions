import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getCourses = async (req: Request, res: Response) => {
  try {
    const { category, active } = req.query;
    const where: any = {};
    if (category && category !== 'All') where.category = category;
    if (active !== undefined) where.isActive = active === 'true';
    const courses = await prisma.course.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCourse = async (req: Request, res: Response) => {
  try {
    const course = await prisma.course.findUnique({
      where: { slug: req.params.slug as string }
    });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const { name, category, description, duration, level, imageUrl, syllabus, careerPaths, eligibility } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const existing = await prisma.course.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;
    const course = await prisma.course.create({
      data: { name, slug: finalSlug, category, description, duration, level: level || 'Beginner', imageUrl, syllabus: syllabus || [], careerPaths: careerPaths || [], eligibility }
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const course = await prisma.course.update({
      where: { id },
      data: req.body
    });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    
    // Check if there are any student applications linked to this course
    const admissionsCount = await prisma.admission.count({
      where: { courseId: id }
    });
    
    if (admissionsCount > 0) {
      return res.status(400).json({
        error: "Cannot delete this course because there are students enrolled in it. Please delete the student applications first."
      });
    }
    
    await prisma.course.delete({ where: { id } });
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
