import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import * as dotenv from "dotenv";

dotenv.config();

const environmentId = process.env.NG_APP_ENVIRONMENT_ID ?? process.env.VITE_ENVIRONMENT_ID ?? "";
const deliveryApiKey =
  process.env.NG_APP_DELIVERY_API_KEY ?? process.env.VITE_DELIVERY_API_KEY ?? "";
const managementApiKey = process.env.VITE_MANAGEMENT_API_KEY ?? "";

if (!environmentId || !deliveryApiKey) {
  throw new Error("NG_APP_ENVIRONMENT_ID and NG_APP_DELIVERY_API_KEY must be set in .env");
}

const content = `
export const environment = {
  ENVIRONMENT_ID:'${environmentId}',
  DELIVERY_API_KEY:'${deliveryApiKey}',

// (Optional) used only for model generation
  MANAGEMENT_API_KEY:'${managementApiKey}',
}
`;

const outputPath = resolve("src/environments/environment.ts");
writeFileSync(outputPath, content, "utf-8");
console.log(`✓ src/environments/environment.ts updated from .env`);
