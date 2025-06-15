export interface SiteConfig {
  tab: string;
  heroTitle: string;
  heroDescription: string;
  aboutme: string;
  theme: {
    light: string;
    dark: string;
    code: string;
  };
}

export interface UserConfig {
  site: string;
  email: string;
  twitter: string;
  social: SocialConfig[];
}

export interface Config {
  site: SiteConfig;
  user: UserConfig;
}

export interface SocialConfig {
  name: string;
  href: string;
  icon: string;
}
