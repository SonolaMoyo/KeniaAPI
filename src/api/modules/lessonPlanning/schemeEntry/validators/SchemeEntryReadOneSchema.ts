import { z } from "zod";

export const schemeEntryReadOneSchema = z.object({
  id: z.number({ required_error: "Scheme entry ID is required" }),
  tenantId: z.number({ required_error: "Tenant ID is required" }),
  userId: z.number({ required_error: "Auth User ID is required" }),
});
