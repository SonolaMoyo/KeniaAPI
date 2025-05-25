import { z } from "zod";
import { ContentType } from "@prisma/client";

export const schemeEntryContentReadSchema = z.object({
  id: z.number().optional(),
  ids: z.array(z.number()).optional(),
  schemeEntryId: z.number().optional(),
  title: z.string().optional(),
  contentType: z.nativeEnum(ContentType).optional(),
  tenantId: z.number({ required_error: "Tenant ID is required" }),
  userId: z.number({ required_error: "Auth User ID is required" }),
});

export type SchemeEntryContentReadSchemaType = z.infer<typeof schemeEntryContentReadSchema>;
