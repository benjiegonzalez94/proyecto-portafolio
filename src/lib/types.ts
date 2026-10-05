export interface Profile {
  id: string;
  slug: string;
  full_name: string;
  headline: string;
  bio: string;
  avatar_url?: string;
  hero_badge?: string;
  email?: string;
  phone?: string;
  location?: string;
  resume_url?: string;
  theme_accent?: string;
  created_at?: string;
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
}
