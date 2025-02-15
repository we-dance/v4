import { z } from "zod";

/*eslint sort-keys: "error"*/
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
});

const envValidator = envSchema.safeParse(process.env);

if (!envValidator.success) {
  throw new Error(
    "❌ Invalid environment variables: " +
      JSON.stringify(envValidator.error.format(), null, 4)
  );
}

export const env = envValidator.data;
