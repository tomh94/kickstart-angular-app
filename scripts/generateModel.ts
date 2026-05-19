import { generateDeliveryModelsAsync, resolveCase } from "@kontent-ai/model-generator";
import dotenv from "dotenv";

dotenv.config();

const { ENVIRONMENT_ID, MANAGEMENT_API_KEY} = process.env;

if (!ENVIRONMENT_ID) {
  throw new Error("VITE_ENVIRONMENT_ID cannot be empty!");
}

if (!MANAGEMENT_API_KEY) {
  throw new Error("VITE_MAPI_API_KEY cannot be empty!");
}

await generateDeliveryModelsAsync({
  environmentId: ENVIRONMENT_ID,
  managementApiKey: MANAGEMENT_API_KEY,
  addTimestamp: false,
  createFiles: true,
  outputDir: "./src/model",
  moduleFileExtension: "none",
  fileResolvers: {
    taxonomy: (taxonomy) => resolveCase(taxonomy.codename, "camelCase"),
    contentType: (type) => resolveCase(type.codename, "camelCase"),
    snippet: (snippet) => resolveCase(snippet.codename, "camelCase"),
  },
  formatOptions: {
    formatter: {
      lineWidth: 120,
      indentWidth: 2,
      indentStyle: "space",
    },
    javascript: {
      formatter: {
        trailingCommas: "all",
      },
    },
  },
});
