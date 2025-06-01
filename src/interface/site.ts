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
}

export interface Config {
  site: SiteConfig;
  user: UserConfig;
}
