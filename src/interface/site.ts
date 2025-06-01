export interface SiteConfig {
  title: string;
  description: string;
  theme: {
    light: string;
    dark: string;
    code: string;
  };
}

export interface UserConfig {
  site: string;
  email: string;
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
