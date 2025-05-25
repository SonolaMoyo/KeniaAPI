import DbClient, { PrismaTransactionClient } from "~/infrastructure/internal/database";
import { EnforceTenantId } from "~/api/modules/base/decorators/EnforceTenantId.decorator";
import { InternalServerError } from "~/infrastructure/internal/exceptions/InternalServerError";
import { SchemeEntryCreateRequestType } from "~/api/modules/lessonPlanning/schemeEntry/types/SchemeEntryTypes";

@EnforceTenantId
export default class SchemeEntryCreateProvider {
  public async create(args: SchemeEntryCreateRequestType, dbClient: PrismaTransactionClient = DbClient) {
    try {
      const { week, theme, topics, objectives, resources, schemeOfWorkId, tenantId } = args;

      const schemeEntry = await dbClient.schemeEntry.create({
        data: {
          week,
          theme,
          topics,
          objectives,
          resources,
          schemeOfWorkId,
          tenantId,
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
