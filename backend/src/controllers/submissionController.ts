import { Request, Response } from 'express';
import prisma from '../services/db.js';

export const createSubmission = async (req: Request, res: Response) => {
  try {
    const { title, authorName, authorEmail, categoryId, description, projectUrl } = req.body;

    if (!title || !authorName || !categoryId || !description) {
      res.status(400).json({ success: false, message: 'Todos los campos obligatorios deben completarse' });
      return;
    }

    const submission = await prisma.submission.create({
      data: {
        title,
        authorName,
        authorEmail: authorEmail || 'anomino@comunidad.unam.mx',
        categoryId,
        description,
        projectUrl: projectUrl || '',
        status: 'pendiente'
      }
    });

    res.status(201).json({
      success: true,
      message: '¡Propuesta enviada con éxito! Será revisada por el equipo de moderación antes de publicarse.',
      data: submission
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSubmissions = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const where: any = {};
    if (status && status !== 'todos') {
      where.status = String(status);
    }

    const submissions = await prisma.submission.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, data: submissions });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSubmissionStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, reviewNotes } = req.body;

    const updated = await prisma.submission.update({
      where: { id },
      data: { status, reviewNotes }
    });

    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
