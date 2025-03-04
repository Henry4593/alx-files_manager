import { existsSync, readFileSync } from "fs";

/**
 * Load environment variables from a file based on the event context.
 */
const envLoader = () => {
  const env = process.env.npm_lifecycle_event || "dev";
  const path =
    env.includes("test") || env.includes("cover") ? ".env.test" : ".env";

  if (existsSync(path)) {
    const data = readFileSync(path, "utf-8").trim().split("\n");

    for (const line of data) {
      const delimPosition = line.indexOf("=");
      const variable = line.substring(0, delimPosition);
      const value = line.substring(delimPosition + 1);
      process.env[variable] = value;
    }
  }
};

export default envLoader;
