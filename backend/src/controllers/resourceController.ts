import { Request, Response } from 'express';
import prisma from '../services/db.js';

export const getResources = async (req: Request, res: Response) => {
  try {
    const {
      q,
      category,
      type,
      level,
      costType,
      language,
      featured,
      page = '1',
      limit = '20',
      sort = 'newest'
    } = req.query;

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};

    if (q) {
      const search = String(q).toLowerCase();
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { technology: { contains: search } },
        { author: { contains: search } },
        { softwareNeeded: { contains: search } }
      ];
    }

    if (category && category !== 'todos') {
      where.category = { slug: String(category) };
    }

    if (type && type !== 'todos') {
      where.type = String(type);
    }

    if (level && level !== 'todos') {
      where.level = String(level);
    }

    if (costType && costType !== 'todos') {
      where.costType = String(costType);
    }

    if (language && language !== 'todos') {
      where.language = String(language);
    }

    if (featured === 'true') {
      where.featured = true;
    }

    let orderBy: any = { addedAt: 'desc' };
    if (sort === 'popular') {
      orderBy = { clickCount: 'desc' };
    } else if (sort === 'title') {
      orderBy = { title: 'asc' };
    } else if (sort === 'reviewed') {
      orderBy = { lastReviewed: 'desc' };
    }

    const [total, resources] = await Promise.all([
      prisma.resource.count({ where }),
      prisma.resource.findMany({
        where,
        skip,
        take: limitNum,
        orderBy,
        include: {
          category: {
            select: { id: true, name: true, slug: true, color: true, icon: true }
          },
          subcategory: true,
          tags: {
            include: { tag: true }
          }
        }
      })
    ]);

    res.json({
      success: true,
      data: resources,
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

export const getResourceBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const resource = await prisma.resource.findUnique({
      where: { slug },
      include: {
        category: true,
        subcategory: true,
        tags: { include: { tag: true } }
      }
    });

    if (!resource) {
      res.status(404).json({ success: false, message: 'Recurso no encontrado' });
      return;
    }

    // Incrementar contador de clics
    await prisma.resource.update({
      where: { id: resource.id },
      data: { clickCount: { increment: 1 } }
    });

    // Obtener recursos relacionados en la misma categoría
    const related = await prisma.resource.findMany({
      where: {
        categoryId: resource.categoryId,
        id: { not: resource.id }
      },
      take: 4,
      orderBy: { clickCount: 'desc' }
    });

    res.json({
      success: true,
      data: resource,
      related
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createResource = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const resource = await prisma.resource.create({
      data: {
        slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        url: data.url,
        videoUrl: data.videoUrl,
        categoryId: data.categoryId,
        subcategoryId: data.subcategoryId || null,
        type: data.type || 'guia',
        technology: data.technology || 'General Maker',
        level: data.level || 'principiante',
        language: data.language || 'es',
        duration: data.duration,
        costType: data.costType || 'gratuito',
        requiresRegistration: data.requiresRegistration ?? false,
        modality: data.modality || 'online',
        os: data.os || 'todos',
        softwareNeeded: data.softwareNeeded,
        materialsNeeded: data.materialsNeeded,
        license: data.license || 'Open Source / Creative Commons',
        author: data.author,
        institution: data.institution || 'Comunidad Maker',
        featured: data.featured ?? false,
        validationStatus: data.validationStatus || 'verificado'
      }
    });

    res.status(201).json({ success: true, data: resource });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateResource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const resource = await prisma.resource.update({
      where: { id },
      data: {
        ...data,
        lastReviewed: new Date()
      }
    });
    res.json({ success: true, data: resource });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteResource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.resource.delete({ where: { id } });
    res.json({ success: true, message: 'Recurso eliminado correctamente' });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const reportBrokenLink = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    const resource = await prisma.resource.findUnique({ where: { id } });
    if (!resource) {
      res.status(404).json({ success: false, message: 'Recurso no encontrado' });
      return;
    }

    await prisma.linkCheck.create({
      data: {
        resourceId: id,
        url: resource.url,
        status: 'advertencia',
        errorMessage: notes || 'Reportado por un usuario de la comunidad'
      }
    });

    res.json({ success: true, message: 'Gracias por reportar. Nuestro equipo revisará el enlace.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
