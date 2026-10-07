export type TemplateId = 'tech-minimal' | 'creative-visual' | 'modern-gradient';

export interface Profile {
  id: string;
  user_id?: string;
  slug: string;
  full_name: string;
  headline: string;
  bio: string;
  avatar_url?: string;
  hero_badge?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  whatsapp_message?: string;
  linkedin_url?: string;
  github_url?: string;
  behance_url?: string;
  instagram_url?: string;
  location?: string;
  resume_url?: string;
  theme_accent?: string;
  theme_mode?: 'dark' | 'light' | string;
  template_id?: TemplateId | string;
  twitter_url?: string;
  website_url?: string;
  skills_data?: SkillCategory[];
  created_at?: string;
  updated_at?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Experience {
  id: string;
  profile_id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  order_index?: number;
}

export interface Project {
  id: string;
  profile_id: string;
  title: string;
  description: string;
  category?: string;
  tags?: string[];
  image_url?: string;
  gallery_images?: string[];
  live_url?: string;
  repo_url?: string;
  featured?: boolean;
  order_index?: number;
}

export interface Service {
  id: string;
  profile_id: string;
  title: string;
  description: string;
  icon?: string;
  order_index?: number;
}

export interface FullPortfolio {
  profile: Profile;
  experiences: Experience[];
  projects: Project[];
  services: Service[];
  skillCategories?: SkillCategory[];
}
