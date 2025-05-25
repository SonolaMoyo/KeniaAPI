import { z } from "zod";
import { ContentType } from "@prisma/client";

export const schemeEntryContentCreateSchema = z.object({
  schemeEntryId: z.number({ required_error: "Scheme Entry ID is required" }),
  title: z.string({ required_error: "Title is required" }),
  contentType: z.nativeEnum(ContentType, { required_error: "Content Type is required" }),
  fileUrl: z.string().optional(),
  description: z.string().optional(),
  order: z.number().optional(),
  tenantId: z.number({ required_error: "Tenant ID is required" }),
  userId: z.number({ required_error: "Auth User ID is required" }),
});
