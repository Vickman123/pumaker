import { Request, Response } from 'express';
import prisma from '../services/db.js';

export const getVideos = async (req: Request, res: Response) => {
  try {
    const { q, category, featured, page = '1', limit = '18' } = req.query;
    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 18;
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};

    if (q) {
      const search = String(q).toLowerCase();
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { channelTitle: { contains: search } }
      ];
    }

    if (category && category !== 'todos') {
      where.category = { slug: String(category) };
    }

    if (featured === 'true') {
      where.featured = true;
    }

    const [total, videos] = await Promise.all([
      prisma.video.count({ where }),
      prisma.video.findMany({
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
      data: videos,
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
