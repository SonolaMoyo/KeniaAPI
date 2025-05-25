import { z } from "zod";
import { SchemeStatus } from "@prisma/client";

export const schemeOfWorkUpdateSchema = z.object({
  id: z.number({ required_error: "Scheme of Work ID is required" }),
  subjectId: z.number().optional(),
  staffId: z.number().optional(),
  classId: z.number().optional(),
  termId: z.number().optional(),
  calendarId: z.string().optional(),
  status: z.nativeEnum(SchemeStatus).optional(),
  approvedBy: z.number().optional(),
  approvedAt: z.date().optional(),
  notes: z.string().optional(),
  tenantId: z.number({ required_error: "Tenant ID is required" }),
  userId: z.number({ required_error: "Auth User ID is required" }),
});
