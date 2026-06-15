import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getAdmissions = async (req: Request, res: Response) => {
  try {
    const { courseId, status, from, to, page = '1', limit = '20' } = req.query;
    const where: any = {};
    if (courseId) where.courseId = parseInt(courseId as string);
    if (status) where.status = status;
    if (from || to) {
      where.createdAt = {};
      if (from) where.createdAt.gte = new Date(from as string);
      if (to) where.createdAt.lte = new Date(to as string);
    }
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const [admissions, total] = await Promise.all([
      prisma.admission.findMany({
        where,
        include: { course: { select: { name: true } } },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit as string)
      }),
      prisma.admission.count({ where })
    ]);
    res.json({ admissions, total, page: parseInt(page as string), totalPages: Math.ceil(total / parseInt(limit as string)) });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAdmission = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const admission = await prisma.admission.findUnique({
      where: { id },
      include: { course: true }
    });
    if (!admission) return res.status(404).json({ error: 'Admission not found' });
    res.json(admission);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createAdmission = async (req: Request, res: Response) => {
  try {
    const { fullName, mobile, email, dob, qualification, address, courseId, preferredBatch, photoUrl } = req.body;
    if (!fullName || !mobile || !dob || !qualification || !address || !courseId || !preferredBatch) {
      return res.status(400).json({ error: 'Required fields missing' });
    }
    const admission = await prisma.admission.create({
      data: { fullName, mobile, email, dob, qualification, address, courseId: parseInt(courseId), preferredBatch, photoUrl },
      include: { course: { select: { name: true } } }
    });
    res.status(201).json({ message: 'Application submitted successfully!', admission });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateAdmissionStatus = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const { status, notes } = req.body;
    const admission = await prisma.admission.update({
      where: { id },
      data: { status, notes }
    });
    res.json(admission);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteAdmission = async (req: Request, res: Response) => {
  try {
    await prisma.admission.delete({ where: { id: parseInt(req.params.id as string) } });
    res.json({ message: 'Admission deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
