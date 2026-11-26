import { Request, Response } from 'express';
import prisma from '../services/db.js';

export const getLearningPaths = async (_req: Request, res: Response) => {
  try {
    const paths = await prisma.learningPath.findMany({
      include: {
        category: true,
        steps: {
          orderBy: { stepOrder: 'asc' }
        }
      }
    });
    res.json({ success: true, data: paths });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLearningPathBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const path = await prisma.learningPath.findUnique({
      where: { slug },
      include: {
        category: true,
        steps: {
          orderBy: { stepOrder: 'asc' }
        }
      }
    });

    if (!path) {
      res.status(404).json({ success: false, message: 'Ruta no encontrada' });
      return;
    }

    res.json({ success: true, data: path });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
