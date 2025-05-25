import { z } from "zod";

export const schemeEntryAssignmentReadSchema = z.object({
  id: z.number().optional(),
  schemaEntryId: z.number().optional(),
  title: z.string().optional(),
  tenantId: z.number({ required_error: "Tenant ID is required" }),
  userId: z.number({ required_error: "Auth User ID is required" }),
});
