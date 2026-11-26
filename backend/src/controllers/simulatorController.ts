import { Request, Response } from 'express';
import prisma from '../services/db.js';

export const getSimulators = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const where: any = {};

    if (category && category !== 'todos') {
      where.category = { slug: String(category) };
    }

    const simulators = await prisma.simulator.findMany({
      where,
      include: {
        category: {
          select: { id: true, name: true, slug: true, color: true }
        }
      },
      orderBy: { isInternal: 'desc' }
    });

    res.json({ success: true, data: simulators });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
