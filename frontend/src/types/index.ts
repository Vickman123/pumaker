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
  code?: string;
  codeLanguage?: string;
  testing?: string;
  diagram?: string;
  image?: string;
  tip?: string;
  // Campos pedagógicos enriquecidos
  stageObjective?: string;
  stageTime?: string;
  conceptLearned?: string;
  stageMaterials?: string;
  whyDoWeDoIt?: string;
  expectedResult?: string;
  commonErrors?: string;
  errorSolution?: string;
  professionalTip?: string;
  progressEvidence?: string;
}

export interface TroubleshootingItem {
  problem: string;
  cause: string;
  check: string;
  solution: string;
}

export interface ChallengeItem {
  level: string; // "Nivel 1 — Modifica" | "Nivel 2 — Mejora" | "Nivel 3 — Crea"
  title: string;
  description: string;
  objective: string;
  validation: string;
}

export interface RubricItem {
  criteria: string;
  initial: string;
  achieved: string;
  advanced: string;
}

export interface DidacticConcept {
  term: string;
  simpleDef: string;
  technicalDef: string;
  analogy: string;
  application: string;
}

export interface ProjectPedagogy {
  objectiveGeneral: string;
  studentProfile: string;
  learningObjectives: string[];
  steamCompetencies: string[];
  fundamentals: DidacticConcept[];
  workspaceChecklist: {
    materials: { item: string; specs: string; why: string; alternative?: string }[];
    tools: { item: string; specs: string; why: string; alternative?: string }[];
    software: { name: string; version: string; url: string; platform: string; installGuide: string }[];
  };
  didacticElements?: {
    didYouKnow?: string;
    realWorldExample?: string;
    makerTip?: string;
    safetyCaution?: string;
  };
  troubleshooting?: TroubleshootingItem[];
  challenges?: ChallengeItem[];
  rubric?: RubricItem[];
  finalReview?: {
    whatYouBuilt: string;
    howItWorks: string;
    whatYouLearned: string[];
    nextSteps: { title: string; slug: string; description: string }[];
  };
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
  pedagogy?: ProjectPedagogy;
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
