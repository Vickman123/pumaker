import { Request, Response } from 'express';
import prisma from '../services/db.js';

export const getProjects = async (req: Request, res: Response) => {
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
        { summary: { contains: search } },
        { materials: { contains: search } },
        { software: { contains: search } }
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

    const [total, projects] = await Promise.all([
      prisma.project.count({ where }),
      prisma.project.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { addedAt: 'desc' },
        include: {
          category: {
            select: { id: true, name: true, slug: true, color: true, icon: true }
          }
        }
      })
    ]);

    res.json({
      success: true,
      data: projects,
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

export const getProjectBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        category: true
      }
    });

    if (!project) {
      res.status(404).json({ success: false, message: 'Proyecto no encontrado' });
      return;
    }

    const related = await prisma.project.findMany({
      where: {
        categoryId: project.categoryId,
        id: { not: project.id }
      },
      take: 3
    });

    res.json({
      success: true,
      data: project,
      related
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const project = await prisma.project.create({
      data: {
        slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        title: data.title,
        summary: data.summary,
        content: data.content || data.summary,
        categoryId: data.categoryId,
        level: data.level || 'principiante',
        estimatedTime: data.estimatedTime || '2 horas',
        materials: typeof data.materials === 'string' ? data.materials : JSON.stringify(data.materials),
        tools: typeof data.tools === 'string' ? data.tools : JSON.stringify(data.tools),
        software: typeof data.software === 'string' ? data.software : JSON.stringify(data.software),
        stepsJson: typeof data.stepsJson === 'string' ? data.stepsJson : JSON.stringify(data.stepsJson || []),
        filesJson: typeof data.filesJson === 'string' ? data.filesJson : JSON.stringify(data.filesJson || []),
        videoUrl: data.videoUrl,
        imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        expectedResult: data.expectedResult || 'Prototipo funcional documentado',
        license: data.license || 'Cultura Libre / CC-BY-SA',
        tips: data.tips,
        featured: data.featured ?? false
      }
    });

    res.status(201).json({ success: true, data: project });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const project = await prisma.project.update({
      where: { id },
      data
    });
    res.json({ success: true, data: project });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({ where: { id } });
    res.json({ success: true, message: 'Proyecto eliminado con éxito' });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
