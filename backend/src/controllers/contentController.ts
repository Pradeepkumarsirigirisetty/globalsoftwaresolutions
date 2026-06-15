import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getContent = async (req: Request, res: Response) => {
  try {
    const { key } = req.query;
    if (key) {
      const content = await prisma.siteContent.findUnique({ where: { key: key as string } });
      return res.json(content);
    }
    const contents = await prisma.siteContent.findMany();
    const result: Record<string, string> = {};
    contents.forEach(c => { result[c.key] = c.value; });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateContent = async (req: Request, res: Response) => {
  try {
    const updates = req.body as Record<string, string>;
    const promises = Object.entries(updates).map(([key, value]) =>
      prisma.siteContent.upsert({
        where: { key },
        create: { key, value },
        update: { value }
      })
    );
    await Promise.all(promises);
    res.json({ message: 'Content updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
