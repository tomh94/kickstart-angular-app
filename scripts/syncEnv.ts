import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import * as dotenv from "dotenv";

dotenv.config();

const environmentId = process.env.NG_APP_ENVIRONMENT_ID ?? process.env.VITE_ENVIRONMENT_ID ?? "";
const deliveryApiKey =
  process.env.NG_APP_DELIVERY_API_KEY ?? process.env.VITE_DELIVERY_API_KEY ?? "";

const content = `
export const environment = {
  ENVIRONMENT_ID:'${environmentId}',
  DELIVERY_API_KEY:'${deliveryApiKey}',
}
`;

const outputPath = resolve("src/environments/environment.ts");
writeFileSync(outputPath, content, "utf-8");
console.log(`✓ src/environments/environment.ts updated from .env`);
