import { z } from "zod";

export const schemeEntryReadSchema = z.object({
  id: z.number().optional(),
  ids: z.array(z.number()).optional(),
  week: z.number().optional(),
  theme: z.string().optional(),
  schemeOfWorkId: z.number().optional(),
  tenantId: z.number({ required_error: "Tenant ID is required" }),
  userId: z.number({ required_error: "Auth User ID is required" }),
});
