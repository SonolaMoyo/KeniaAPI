import { z } from "zod";

export const schemeEntryDeleteSchema = z.object({
  id: z.number({
    required_error: "Scheme entry ID is required",
    invalid_type_error: "Scheme entry ID must be a number",
  }),
  tenantId: z.number({
    required_error: "Tenant ID is required",
    invalid_type_error: "Tenant ID must be a number",
  }),
});

export type SchemeEntryDeleteSchemaType = z.infer<typeof schemeEntryDeleteSchema>;
