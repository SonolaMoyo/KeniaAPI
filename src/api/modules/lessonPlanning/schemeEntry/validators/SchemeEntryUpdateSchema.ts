import { z } from "zod";

export const schemeEntryUpdateSchema = z.object({
  week: z.number().optional(),
  theme: z.string().optional(),
  topics: z.any().optional(),
  objectives: z.any().optional(),
  resources: z.any().optional(),
  schemeOfWorkId: z.number().optional(),
  tenantId: z.number({ required_error: "Tenant ID is required" }),
  userId: z.number({ required_error: "Auth User ID is required" }),
});
