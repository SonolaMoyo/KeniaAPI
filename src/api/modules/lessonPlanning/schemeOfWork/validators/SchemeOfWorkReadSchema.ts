import { z } from "zod";
import { SchemeStatus } from "@prisma/client";

export const schemeOfWorkReadSchema = z.object({
  id: z.number().optional(),
  subjectId: z.number().optional(),
  staffId: z.number().optional(),
  classId: z.number().optional(),
  termId: z.number().optional(),
  calendarId: z.string().optional(),
  status: z.nativeEnum(SchemeStatus).optional(),
  tenantId: z.number({ required_error: "Tenant ID is required" }),
  userId: z.number({ required_error: "Auth User ID is required" }),
});
