
export type Language = 'en' | 'vi';

export interface NavItem {
  label: string;
  href: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Payments' | 'Web3';
  icon?: string;
  customSvg?: string;
}

export interface Project {
  title: string;
  description: { en: string; vi: string };
  tags: string[];
  image: string;
  link?: string;
  year?: string;
  role: { en: string; vi: string };
  subtitle: { en: string; vi: string };
  color?: string;
  images?: string[];
  features?: { en: string[]; vi: string[] };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
