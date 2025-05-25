import { z } from "zod";

export const schemeEntryAssignmentDeleteSchema = z.object({
  id: z.number({
    required_error: "Scheme Entry Assignment ID is required",
    invalid_type_error: "Scheme Entry Assignment ID must be a number",
  }),
  tenantId: z.number({
    required_error: "Tenant ID is required",
    invalid_type_error: "Tenant ID must be a number",
  }),
  userId: z.number({ required_error: "Auth User ID is required" }),
});
