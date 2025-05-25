import DbClient, { PrismaTransactionClient } from "~/infrastructure/internal/database";
import { EnforceTenantId } from "~/api/modules/base/decorators/EnforceTenantId.decorator";
import { InternalServerError } from "~/infrastructure/internal/exceptions/InternalServerError";
import { SchemeEntryUpdateRequestType } from "~/api/modules/lessonPlanning/schemeEntry/types/SchemeEntryTypes";

@EnforceTenantId
export default class SchemeEntryUpdateProvider {
  public async update(criteria: SchemeEntryUpdateRequestType, dbClient: PrismaTransactionClient = DbClient) {
    try {
      const { id, week, theme, topics, objectives, resources, schemeOfWorkId, tenantId } = criteria;

      const schemeEntry = await dbClient.schemeEntry.update({
        where: { id, tenantId },
        data: {
          ...(week && { week }),
          ...(theme && { theme }),
          ...(topics && { topics }),
          ...(objectives && { objectives }),
          ...(resources && { resources }),
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
