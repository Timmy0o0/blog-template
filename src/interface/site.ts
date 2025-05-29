export interface SiteConfig {
  theme: {
    light: string;
    dark: string;
    code: string;
  };
}

export interface Config {
  site: SiteConfig;
}
