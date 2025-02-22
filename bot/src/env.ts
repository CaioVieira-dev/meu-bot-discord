import { z } from "zod";
import dotenv from "dotenv";

// Carrega as variáveis de ambiente
dotenv.config();

// Define o esquema de validação
const envSchema = z.object({
  BOT_TOKEN: z
    .string({
      required_error: "BOT_TOKEN é obrigatório",
      invalid_type_error: "BOT_TOKEN deve ser uma string",
    })
    .min(1, "BOT_TOKEN não pode ser vazio"),
});

export function loadEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );
      console.error("Erro na configuração do ambiente:");
      errors.forEach((err) => console.error(`- ${err}`));
      process.exit(1);
    }
    throw error;
  }
}
export const env = loadEnv();
