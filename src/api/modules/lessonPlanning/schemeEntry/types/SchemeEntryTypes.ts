export type SchemeEntryCreateRequestType = {
  week: number;
  theme: string;
  topics: any;
  objectives: any;
  resources: any;
  schemeOfWorkId: number;
  tenantId: number;
};

export type SchemeEntryReadRequestType = {
  ids?: number[];
  week?: number;
  theme?: string;
  schemeOfWorkId?: number;
  tenantId: number;
};

export type SchemeEntryReadOneRequestType = {
  id?: number;
  week?: number;
  theme?: string;
  schemeOfWorkId?: number;
  tenantId?: number;
};

export type SchemeEntryUpdateRequestType = {
  id: number;
  week?: number;
  theme?: string;
  topics?: any;
  objectives?: any;
  resources?: any;
  schemeOfWorkId?: number;
  tenantId?: number;
};

export type SchemeEntryCriteriaType = {
  id?: number;
  ids?: number[];
  week?: number;
  theme?: string;
  schemeOfWorkId?: number;
  tenantId?: number;
};

export type SchemeEntryResponseType = {
  id: number;
  week: number;
  theme: string;
  topics: any;
  objectives: any;
  resources: any;
  schemeOfWorkId: number;
  tenantId: number;
};

export type SchemeEntryDeleteRequestType = {
  id: number;
  tenantId: number;
};
