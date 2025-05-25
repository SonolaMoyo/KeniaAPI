import DbClient, { PrismaTransactionClient } from "~/infrastructure/internal/database";
import { EnforceTenantId } from "~/api/modules/base/decorators/EnforceTenantId.decorator";
import { InternalServerError } from "~/infrastructure/internal/exceptions/InternalServerError";
import { SchemeEntryContentCreateRequestType } from "~/api/modules/lessonPlanning/schemeEntryContent/types/SchemeEntryContentTypes";

@EnforceTenantId
export default class SchemeEntryContentCreateProvider {
  public async create(args: SchemeEntryContentCreateRequestType, dbClient: PrismaTransactionClient = DbClient) {
    try {
      const { schemeEntryId, title, contentType, fileUrl, description, order, tenantId } = args;

      const schemeEntryContent = await dbClient.schemeEntryContent.create({
        data: {
          schemeEntryId,
          title,
          contentType,
          fileUrl,
          description,
          order,
          tenantId,
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
