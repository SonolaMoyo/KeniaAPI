import { z } from "zod";
import { SchemeStatus } from "@prisma/client";

export const schemeOfWorkCreateSchema = z.object({
  subjectId: z.number({ required_error: "Subject ID is required" }),
  staffId: z.number({ required_error: "Staff ID is required" }),
  classId: z.number({ required_error: "Class ID is required" }),
  termId: z.number({ required_error: "Term ID is required" }),
  calendarId: z.string({ required_error: "Calendar ID is required" }),
  status: z.nativeEnum(SchemeStatus).optional(),
  approvedBy: z.number().optional(),
  approvedAt: z.date().optional(),
  notes: z.string().optional(),
  tenantId: z.number({ required_error: "Tenant ID is required" }),
  userId: z.number({ required_error: "Auth User ID is required" }),
});
