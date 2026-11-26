import { Request, Response } from 'express';
import prisma from '../services/db.js';

export const getCourses = async (req: Request, res: Response) => {
  try {
    const { q, category, level, featured, page = '1', limit = '12' } = req.query;
    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 12;
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};

    if (q) {
      const search = String(q).toLowerCase();
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { platform: { contains: search } },
        { instructor: { contains: search } }
      ];
    }

    if (category && category !== 'todos') {
      where.category = { slug: String(category) };
    }

    if (level && level !== 'todos') {
      where.level = String(level);
    }

    if (featured === 'true') {
      where.featured = true;
    }

    const [total, courses] = await Promise.all([
      prisma.course.count({ where }),
      prisma.course.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { featured: 'desc' },
        include: {
          category: {
            select: { id: true, name: true, slug: true, color: true }
          }
        }
      })
    ]);

    res.json({
      success: true,
      data: courses,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
