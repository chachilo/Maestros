export interface BasicInfo {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  nationality: string;
  linkedIn?: string;
  socialMedia?: string[];
  professionalSummary: string;
}

export interface WorkExperience {
  institution: string;
  position: string;
  startDate: string;
  endDate?: string;
  responsibilities: string;
  achievements?: string;
  location: string;
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  additionalCourses?: string[];
}

export interface Skill {
  name: string;
  type: 'technical' | 'soft';
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface Language {
  name: string;
  level: 'basic' | 'intermediate' | 'advanced' | 'native';
  certification?: string;
}

export interface Certification {
  name: string;
  institution: string;
  dateObtained: string;
  expirationDate?: string;
}

export interface Publication {
  title: string;
  description: string;
  link?: string;
}

export interface Reference {
  name: string;
  position: string;
  institution: string;
  email: string;
  phone: string;
  relationship: string;
}

export interface TeacherCV {
  basicInfo: BasicInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  certifications: Certification[];
  publications: Publication[];
  references: Reference[];
}