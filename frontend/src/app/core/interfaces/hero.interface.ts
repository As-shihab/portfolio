export interface HeroSection {
  id: number;
  greeting: string;
  name: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface CreateHeroSection {
  greeting: string;
  name: string;
  title: string;
  description: string;
  image?: File;
}

export interface UpdateHeroSection {
  greeting: string;
  name: string;
  title: string;
  description: string;
  image?: File;
}
