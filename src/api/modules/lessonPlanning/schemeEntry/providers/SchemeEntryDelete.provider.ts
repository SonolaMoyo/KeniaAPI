import DbClient, { PrismaTransactionClient } from "~/infrastructure/internal/database";
import { EnforceTenantId } from "~/api/modules/base/decorators/EnforceTenantId.decorator";
import { InternalServerError } from "~/infrastructure/internal/exceptions/InternalServerError";
import { SchemeEntryDeleteRequestType } from "~/api/modules/lessonPlanning/schemeEntry/types/SchemeEntryTypes";

@EnforceTenantId
export default class SchemeEntryDeleteProvider {
  public async delete(criteria: SchemeEntryDeleteRequestType, dbClient: PrismaTransactionClient = DbClient) {
    try {
      const { id, tenantId } = criteria;

      const schemeEntry = await dbClient.schemeEntry.delete({
        where: {
          id,
          tenantId,
        },
      });

      return schemeEntry;
    } catch (error: any) {
      throw new InternalServerError(error);
    }
  }
}
