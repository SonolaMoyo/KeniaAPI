import DbClient, { PrismaTransactionClient } from "~/infrastructure/internal/database";
import { EnforceTenantId } from "~/api/modules/base/decorators/EnforceTenantId.decorator";
import { InternalServerError } from "~/infrastructure/internal/exceptions/InternalServerError";
import { SchemeEntryContentUpdateRequestType } from "~/api/modules/lessonPlanning/schemeEntryContent/types/SchemeEntryContentTypes";

@EnforceTenantId
export default class SchemeEntryContentUpdateProvider {
  public async update(criteria: SchemeEntryContentUpdateRequestType, dbClient: PrismaTransactionClient = DbClient) {
    try {
      const { id, schemeEntryId, title, contentType, fileUrl, description, order, tenantId } = criteria;

      const schemeEntryContent = await dbClient.schemeEntryContent.update({
        where: { id, tenantId },
        data: {
          ...(schemeEntryId && { schemeEntryId }),
          ...(title && { title }),
          ...(fileUrl && { fileUrl }),
          ...(description && { description }),
          ...(order && { order }),
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
