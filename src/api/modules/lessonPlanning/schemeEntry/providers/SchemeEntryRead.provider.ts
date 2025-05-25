import DbClient, { PrismaTransactionClient } from "~/infrastructure/internal/database";
import { EnforceTenantId } from "~/api/modules/base/decorators/EnforceTenantId.decorator";
import { InternalServerError } from "~/infrastructure/internal/exceptions/InternalServerError";
import { SchemeEntryCriteriaType } from "~/api/modules/lessonPlanning/schemeEntry/types/SchemeEntryTypes";

@EnforceTenantId
export default class SchemeEntryReadProvider {
  public async getByCriteria(criteria: SchemeEntryCriteriaType, dbClient: PrismaTransactionClient = DbClient) {
    try {
      const { id, week, theme, schemeOfWorkId, tenantId } = criteria;

      const schemeEntries = await dbClient.schemeEntry.findMany({
        where: {
          ...(id && { id }),
          ...(week && { week }),
          ...(theme && { theme: { contains: theme } }),
          ...(schemeOfWorkId && { schemeOfWorkId }),
          ...(tenantId && { tenantId }),
        },
        include: {
          schemeOfWork: true,
          schemaEntryAssignments: true,
        },
      });

      return schemeEntries;
    } catch (error: any) {
      throw new InternalServerError(error);
    }
  }

  public async getOneByCriteria(criteria: SchemeEntryCriteriaType, dbClient: PrismaTransactionClient = DbClient) {
    try {
      const { id, week, theme, schemeOfWorkId, tenantId } = criteria;

      const schemeEntry = await dbClient.schemeEntry.findFirst({
        where: {
          ...(id && { id }),
          ...(week && { week }),
          ...(theme && { theme: { contains: theme } }),
          ...(schemeOfWorkId && { schemeOfWorkId }),
          ...(tenantId && { tenantId }),
        },
        include: {
          schemeOfWork: true,
          schemaEntryAssignments: true,
        },
      });

      return schemeEntry;
    } catch (error: any) {
      throw new InternalServerError(error);
    }
  }
}
