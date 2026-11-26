import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../services/db.js';
import { config } from '../config/index.js';

export const adminLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Correo y contraseña requeridos' });
      return;
    }

    const admin = await prisma.adminUser.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase() },
          { username: email.toLowerCase() }
        ]
      }
    });

    if (!admin) {
      res.status(401).json({ success: false, message: 'Credenciales inválidas' });
      return;
    }

    const validPassword = await bcrypt.compare(password, admin.passwordHash);
    if (!validPassword) {
      res.status(401).json({ success: false, message: 'Credenciales inválidas' });
      return;
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, username: admin.username, role: admin.role },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: admin.id,
        email: admin.email,
        username: admin.username,
        role: admin.role
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminOverview = async (_req: Request, res: Response) => {
  try {
    const [
      resourcesCount,
      projectsCount,
      submissionsPending,
      linkIssues,
      recentResources,
      recentSubmissions
    ] = await Promise.all([
      prisma.resource.count(),
      prisma.project.count(),
      prisma.submission.count({ where: { status: 'pendiente' } }),
      prisma.linkCheck.count({ where: { status: 'advertencia' } }),
      prisma.resource.findMany({
        take: 5,
        orderBy: { addedAt: 'desc' },
        include: { category: true }
      }),
      prisma.submission.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { category: true }
      })
    ]);

    res.json({
      success: true,
      data: {
        resourcesCount,
        projectsCount,
        submissionsPending,
        linkIssues,
        recentResources,
        recentSubmissions
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
