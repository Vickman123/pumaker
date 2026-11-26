export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  displayOrder: number;
  _count?: {
    resources: number;
    projects: number;
    videos: number;
    courses: number;
  };
}

export interface Resource {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl?: string;
  url: string;
  videoUrl?: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
    color: string;
    icon: string;
  };
  type: string;
  technology: string;
  level: string;
  language: string;
  duration?: string;
  costType: string;
  requiresRegistration: boolean;
  modality: string;
  os?: string;
  softwareNeeded?: string;
  materialsNeeded?: string;
  license: string;
  author: string;
  institution?: string;
  featured: boolean;
  validationStatus: string;
  clickCount: number;
  addedAt: string;
  lastReviewed: string;
}

export interface ProjectStep {
  step: number;
  title: string;
  detail: string;
}

export interface ProjectFile {
  name: string;
  url: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
    color: string;
    icon: string;
  };
  level: string;
  estimatedTime: string;
  materials: string;
  tools: string;
  software: string;
  stepsJson: string;
  filesJson?: string;
  videoUrl?: string;
  imageUrl: string;
  expectedResult: string;
  license: string;
  tips?: string;
  featured: boolean;
  addedAt: string;
}

export interface Video {
  id: string;
  slug: string;
  title: string;
  description: string;
  youtubeId: string;
  youtubeUrl: string;
  channelTitle: string;
  channelUrl: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
    color: string;
  };
  level: string;
  duration?: string;
  isPlaylist: boolean;
  featured: boolean;
  addedAt: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  url: string;
  platform: string;
  instructor?: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
    color: string;
  };
  level: string;
  language: string;
  costType: string;
  duration?: string;
  certificateOffered: boolean;
  featured: boolean;
}

export interface LearningPathStep {
  id: string;
  stepOrder: number;
  title: string;
  description: string;
  concepts: string;
  practice: string;
  resourcesJson?: string;
  finalProject?: string;
}

export interface LearningPath {
  id: string;
  slug: string;
  title: string;
  description: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
    color: string;
  };
  level: string;
  estimatedHours: number;
  icon: string;
  featured: boolean;
  steps: LearningPathStep[];
}

export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  url: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
    color: string;
  };
  licenseType: string;
  isFree: boolean;
  isOpenSource: boolean;
  platform: string;
}

export interface Simulator {
  id: string;
  slug: string;
  name: string;
  description: string;
  url: string;
  isInternal: boolean;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
    color: string;
  };
  provider: string;
}

export interface PlatformStats {
  totalResources: number;
  totalProjects: number;
  totalVideos: number;
  totalCourses: number;
  totalTools: number;
  totalSimulators: number;
  categoriesCount: number;
  openSourceCount: number;
  freeCount: number;
}
