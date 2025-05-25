import DbClient, { PrismaTransactionClient } from "~/infrastructure/internal/database";
import { EnforceTenantId } from "~/api/modules/base/decorators/EnforceTenantId.decorator";
import { InternalServerError } from "~/infrastructure/internal/exceptions/InternalServerError";
import { SchemeEntryContentCriteriaType } from "~/api/modules/lessonPlanning/schemeEntryContent/types/SchemeEntryContentTypes";

@EnforceTenantId
export default class SchemeEntryContentReadProvider {
  public async getByCriteria(criteria: SchemeEntryContentCriteriaType, dbClient: PrismaTransactionClient = DbClient) {
    try {
      const { id, schemeEntryId, contentType, tenantId } = criteria;

      const schemeEntryContents = await dbClient.schemeEntryContent.findMany({
        where: {
          ...(id && { id }),
          ...(schemeEntryId && { schemeEntryId }),
          ...(contentType && { contentType }),
          ...(tenantId && { tenantId }),
        },
        include: {
          schemeEntry: true,
        },
      });

      return schemeEntryContents;
    } catch (error: any) {
      throw new InternalServerError(error);
    }
  }

  public async getOneByCriteria(criteria: SchemeEntryContentCriteriaType, dbClient: PrismaTransactionClient = DbClient) {
    try {
      const { id, schemeEntryId, title, tenantId } = criteria;

      const schemeEntryContent = await dbClient.schemeEntryContent.findFirst({
        where: {
          ...(id && { id }),
          ...(schemeEntryId && { schemeEntryId }),
          ...(title && { title: { contains: title } }),
          ...(tenantId && { tenantId }),
        },
        include: {
          schemeEntry: true,
        },
      });

      return schemeEntryContent;
    } catch (error: any) {
      throw new InternalServerError(error);
    }
  }
}
