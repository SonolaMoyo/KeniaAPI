import { z } from "zod";

export const schemeEntryAssignmentCreateSchema = z.object({
  schemaEntryId: z.number({ required_error: "Schema Entry ID is required" }),
  title: z.string({ required_error: "Title is required" }),
  description: z.string().optional(),
  dueDate: z.date().optional(),
  resources: z.any(),
  order: z.number().optional(),
  tenantId: z.number({ required_error: "Tenant ID is required" }),
  userId: z.number({ required_error: "Auth User ID is required" }),
});
