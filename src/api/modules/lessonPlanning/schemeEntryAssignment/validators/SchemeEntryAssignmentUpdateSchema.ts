import { z } from "zod";

export const schemeEntryAssignmentUpdateSchema = z.object({
  id: z.number({ required_error: "Scheme Entry Assignment ID is required" }),
  schemaEntryId: z.number().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  dueDate: z.date().optional(),
  resources: z.any().optional(),
  order: z.number().optional(),
  tenantId: z.number({ required_error: "Tenant ID is required" }),
  userId: z.number({ required_error: "Auth User ID is required" }),
});
