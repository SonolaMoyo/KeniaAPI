export type SchemeEntryAssignmentCreateRequestType = {
  schemaEntryId: number;
  title: string;
  description?: string;
  dueDate?: Date;
  resources: any;
  order?: number;
  tenantId: number;
};

export type SchemeEntryAssignmentReadRequestType = {
  id?: number;
  schemaEntryId?: number;
  title?: string;
  tenantId: number;
};

export type SchemeEntryAssignmentUpdateRequestType = {
  id: number;
  schemaEntryId?: number;
  title?: string;
  description?: string;
  dueDate?: Date;
  resources?: any;
  order?: number;
  tenantId?: number;
};

export type SchemeEntryAssignmentDeleteRequestType = {
  id: number;
  tenantId: number;
};

export type SchemeEntryAssignmentResponseType = {
  id: number;
  schemaEntryId: number;
  title: string;
  description?: string;
  dueDate?: Date;
  order?: number;
  resources: any;
  tenantId: number;
};
