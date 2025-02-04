import { z } from "zod";

import { createStudentSchema } from "../validators/StudentCreateSchema";

export type CreateStudentData = z.infer<typeof createStudentSchema>;

export interface StudentCriteria {
  id?: number;
  dob?: string;
  address?: string;
  enrollmentDate?: string;
  classId?: number;
  tenantId?: number;
}

export interface UpdateStudentData {
  dob?: string;
  address?: string;
  enrollmentDate?: string;
  classId?: number;
  tenantId?: number;
}

export interface GetAndUpdateStaff {
  criteria: StudentCriteria;
  data: UpdateStudentData;
  updateStatus?: boolean;
}
