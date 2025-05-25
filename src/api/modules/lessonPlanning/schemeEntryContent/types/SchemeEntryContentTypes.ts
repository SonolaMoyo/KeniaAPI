import { ContentType, SchemeEntry } from "@prisma/client";

export type SchemeEntryContentCreateRequestType = {
  schemeEntryId: number;
  title: string;
  contentType: ContentType;
  fileUrl?: string;
  description?: string;
  order?: number;
  tenantId: number;
};

export type SchemeEntryContentReadRequestType = {
  ids?: number[];
  schemeEntryId?: number;
  title?: string;
  tenantId: number;
};

export type SchemeEntryContentReadOneRequestType = {
  id?: number;
  schemeEntryId?: number;
  title?: string;
  tenantId?: number;
};

export type SchemeEntryContentUpdateRequestType = {
  id: number;
  schemeEntryId?: number;
  title?: string;
  contentType?: string;
  fileUrl?: string;
  description?: string;
  order?: number;
  tenantId?: number;
};

export type SchemeEntryContentCriteriaType = {
  id?: number;
  ids?: number[];
  schemeEntryId?: number;
  title?: string;
  contentType?: ContentType;
  tenantId?: number;
};

export type SchemeEntryContentResponseType = {
  id: number;
  schemeEntryId: number;
  title: string;
  contentType: string;
  fileUrl?: string;
  description?: string;
  order?: number;
  tenantId: number;
  schemeEntry: SchemeEntry;
};

export type SchemeEntryContentDeleteRequestType = {
  id: number;
  tenantId: number;
};
