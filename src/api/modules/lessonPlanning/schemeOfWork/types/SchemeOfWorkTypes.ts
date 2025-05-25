import { SchemeOfWork, SchemeEntry, SchemeEntryContent, SchemaEntryAssignment } from "@prisma/client";

export type SchemeOfWorkCreateRequestType = {
  subjectId: number;
  staffId: number;
  classId: number;
  termId: number;
  calendarId: string;
  status?: string;
  approvedBy?: number;
  approvedAt?: Date;
  notes?: string;
  tenantId: number;
};

export type SchemeOfWorkReadRequestType = {
  id?: number;
  subjectId?: number;
  staffId?: number;
  classId?: number;
  termId?: number;
  calendarId?: string;
  tenantId: number;
};

export type SchemeOfWorkUpdateRequestType = {
  id: number;
  subjectId?: number;
  staffId?: number;
  classId?: number;
  termId?: number;
  calendarId?: string;
  status?: string;
  approvedBy?: number;
  approvedAt?: Date;
  notes?: string;
  tenantId: number;
};

export type SchemeOfWorkDeleteRequestType = {
  id: number;
  tenantId: number;
};

export type SchemeOfWorkResponseType = {
  id: number;
  subjectId: number;
  staffId: number;
  classId: number;
  termId: number;
  calendarId: string;
  status: string;
  approvedBy?: number;
  approvedAt?: Date;
  notes?: string;
  entries: SchemeEntry[];
  tenantId: number;
};
