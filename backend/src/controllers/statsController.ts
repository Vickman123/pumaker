import { Request, Response } from 'express';
import prisma from '../services/db.js';

export const getPlatformStats = async (_req: Request, res: Response) => {
  try {
    const [
      totalResources,
      totalProjects,
      totalVideos,
      totalCourses,
      totalTools,
      totalSimulators,
      categoriesCount,
      openSourceCount,
      freeCount
    ] = await Promise.all([
      prisma.resource.count(),
      prisma.project.count(),
      prisma.video.count(),
      prisma.course.count(),
      prisma.tool.count(),
      prisma.simulator.count(),
      prisma.category.count(),
      prisma.resource.count({ where: { license: { contains: 'Open' } } }),
      prisma.resource.count({ where: { costType: 'gratuito' } })
    ]);

    res.json({
      success: true,
      data: {
        totalResources,
        totalProjects,
        totalVideos,
        totalCourses,
        totalTools,
        totalSimulators,
        categoriesCount,
        openSourceCount,
        freeCount
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
