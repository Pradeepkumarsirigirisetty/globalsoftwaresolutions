export interface Course {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  duration: string;
  level: string;
  imageUrl?: string;
  syllabus: string[];
  careerPaths: string[];
  eligibility?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Admission {
  id: number;
  fullName: string;
  mobile: string;
  email?: string;
  dob: string;
  qualification: string;
  address: string;
  courseId: number;
  course?: { name: string };
  preferredBatch: string;
  photoUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
  createdAt: string;
}

export interface Gallery {
  id: number;
  title?: string;
  imageUrl: string;
  category: string;
  createdAt: string;
}

export interface Testimonial {
  id: number;
  name: string;
  course: string;
  message: string;
  rating: number;
  photoUrl?: string;
  isActive: boolean;
  createdAt: string;
}

export interface SiteSettings {
  id: number;
  instituteName: string;
  tagline: string;
  address: string;
  phone1: string;
  phone2: string;
  email?: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  logoUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
}
