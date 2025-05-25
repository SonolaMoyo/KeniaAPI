import { z } from "zod";
import { ContentType } from "@prisma/client";

export const schemeEntryContentUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  contentType: z.nativeEnum(ContentType).optional(),
  fileUrl: z.string().optional(),
  description: z.string().optional(),
  order: z.number().optional(),
  tenantId: z.number({ required_error: "Tenant ID is required" }),
  userId: z.number({ required_error: "Auth User ID is required" }),
});
