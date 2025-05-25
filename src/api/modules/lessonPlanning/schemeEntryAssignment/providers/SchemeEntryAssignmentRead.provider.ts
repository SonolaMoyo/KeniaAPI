import DbClient, { PrismaTransactionClient } from "~/infrastructure/internal/database";
import { EnforceTenantId } from "~/api/modules/base/decorators/EnforceTenantId.decorator";
import { InternalServerError } from "~/infrastructure/internal/exceptions/InternalServerError";
import { SchemeEntryAssignmentReadRequestType } from "~/api/modules/lessonPlanning/schemeEntryAssignment/types/SchemeEntryAssignmentTypes";

@EnforceTenantId
export default class SchemeEntryAssignmentReadProvider {
  public async getByCriteria(criteria: SchemeEntryAssignmentReadRequestType, dbClient: PrismaTransactionClient = DbClient) {
    try {
      const { id, schemaEntryId, tenantId } = criteria;

      const schemeEntryAssignments = await dbClient.schemaEntryAssignment.findMany({
        where: {
          ...(id && { id }),
          ...(schemaEntryId && { schemaEntryId }),
          ...(tenantId && { tenantId }),
        },
        include: {
          schemaEntry: true,
        },
      });

      return schemeEntryAssignments;
    } catch (error: any) {
      throw new InternalServerError(error);
    }
  }

  public async getOneByCriteria(criteria: SchemeEntryAssignmentReadRequestType, dbClient: PrismaTransactionClient = DbClient) {
    try {
      const { id, schemaEntryId, title, tenantId } = criteria;

      const schemeEntryAssignment = await dbClient.schemaEntryAssignment.findFirst({
        where: {
          ...(id && { id }),
          ...(title && { title: { contains: title } }),
          ...(schemaEntryId && { schemaEntryId }),
          ...(tenantId && { tenantId }),
        },
        include: {
          schemaEntry: true,
        },
      });

      return schemeEntryAssignment;
    } catch (error: any) {
      throw new InternalServerError(error);
    }
  }
}
