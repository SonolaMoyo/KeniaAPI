import { z } from "zod";

export const schemeEntryContentDeleteSchema = z.object({
  id: z.number({
    required_error: "Scheme Entry Content ID is required",
    invalid_type_error: "Scheme Entry Content ID must be a number",
  }),
  tenantId: z.number({
    required_error: "Tenant ID is required",
    invalid_type_error: "Tenant ID must be a number",
  }),
});

export type SchemeEntryContentDeleteSchemaType = z.infer<typeof schemeEntryContentDeleteSchema>;
