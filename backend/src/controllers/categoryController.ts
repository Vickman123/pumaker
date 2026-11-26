import { Request, Response } from 'express';
import prisma from '../services/db.js';

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { displayOrder: 'asc' },
      include: {
        _count: {
          select: {
            resources: true,
            projects: true,
            videos: true,
            courses: true
          }
        }
      }
    });
    res.json({ success: true, data: categories });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCategoryBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        subcategories: true,
        learningPaths: {
          include: { steps: { orderBy: { stepOrder: 'asc' } } }
        },
        _count: {
          select: {
            resources: true,
            projects: true,
            videos: true,
            courses: true
          }
        }
      }
    });

    if (!category) {
      res.status(404).json({ success: false, message: 'Categoría no encontrada' });
      return;
    }

    // Obtener destacados de la categoría
    const [resources, projects, videos, tools] = await Promise.all([
      prisma.resource.findMany({
        where: { categoryId: category.id },
        take: 8,
        orderBy: { clickCount: 'desc' }
      }),
      prisma.project.findMany({
        where: { categoryId: category.id },
        take: 6,
        orderBy: { addedAt: 'desc' }
      }),
      prisma.video.findMany({
        where: { categoryId: category.id },
        take: 6,
        orderBy: { featured: 'desc' }
      }),
      prisma.tool.findMany({
        where: { categoryId: category.id },
        take: 8
      })
    ]);

    res.json({
      success: true,
      data: {
        ...category,
        featuredResources: resources,
        featuredProjects: projects,
        featuredVideos: videos,
        featuredTools: tools
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
