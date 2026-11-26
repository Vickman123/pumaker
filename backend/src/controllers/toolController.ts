import { Request, Response } from 'express';
import prisma from '../services/db.js';

export const getTools = async (req: Request, res: Response) => {
  try {
    const { category, isFree, isOpenSource } = req.query;
    const where: any = {};

    if (category && category !== 'todos') {
      where.category = { slug: String(category) };
    }

    if (isFree === 'true') {
      where.isFree = true;
    }

    if (isOpenSource === 'true') {
      where.isOpenSource = true;
    }

    const tools = await prisma.tool.findMany({
      where,
      include: {
        category: {
          select: { id: true, name: true, slug: true, color: true }
        }
      },
      orderBy: { name: 'asc' }
    });

    res.json({ success: true, data: tools });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
