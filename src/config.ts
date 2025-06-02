import type { Config } from "@interface/site";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";

const configPath = path.resolve("config.yaml");
const config = yaml.load(fs.readFileSync(configPath, "utf8")) as Config;

export const SITE_TAB = config.site.tab;
export const SITE_HERO_TITLE = config.site.heroTitle;
export const SITE_HERO_DESCRIPTION = config.site.heroDescription;
export const SITE_THEME = config.site.theme;
export const CODE_THEME = config.site.theme.code;

export const USER_SITE = config.user.site;
export const USER_EMAIL = config.user.email;
export const USER_TWITTER = config.user.twitter;
export const USER_SOCIAL = config.user.social;
