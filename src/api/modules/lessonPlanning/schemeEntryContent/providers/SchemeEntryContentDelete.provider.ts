import DbClient, { PrismaTransactionClient } from "~/infrastructure/internal/database";
import { EnforceTenantId } from "~/api/modules/base/decorators/EnforceTenantId.decorator";
import { InternalServerError } from "~/infrastructure/internal/exceptions/InternalServerError";
import { SchemeEntryContentDeleteRequestType } from "~/api/modules/lessonPlanning/schemeEntryContent/types/SchemeEntryContentTypes";

@EnforceTenantId
export default class SchemeEntryContentDeleteProvider {
  public async delete(criteria: SchemeEntryContentDeleteRequestType, dbClient: PrismaTransactionClient = DbClient) {
    try {
      const { id, tenantId } = criteria;

      const schemeEntryContent = await dbClient.schemeEntryContent.delete({
        where: {
          id,
          tenantId,
        },
      });

      return schemeEntryContent;
    } catch (error: any) {
      throw new InternalServerError(error);
    }
  }
}
