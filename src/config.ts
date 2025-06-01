import type { Config } from "@interface/site";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";

const configPath = path.resolve("config.yaml");
const config = yaml.load(fs.readFileSync(configPath, "utf8")) as Config;

export const SITE_TITLE = config.site.title;
export const SITE_DESCRIPTION = config.site.description;
export const SITE_THEME = config.site.theme;
export const CODE_THEME = config.site.theme.code;

export const USER_SITE = config.user.site;
