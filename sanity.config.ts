import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { media } from "sanity-plugin-media";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "kalampokas-fotografia",
  title: "Kalampokas Fotografia",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "o5nu4jkv",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [structureTool(), media()],
  schema: {
    types: schemaTypes,
  },
});
