import DbClient, { PrismaTransactionClient } from "~/infrastructure/internal/database";
import { EnforceTenantId } from "~/api/modules/base/decorators/EnforceTenantId.decorator";
import { InternalServerError } from "~/infrastructure/internal/exceptions/InternalServerError";
import { SchemeEntryAssignmentDeleteRequestType } from "~/api/modules/lessonPlanning/schemeEntryAssignment/types/SchemeEntryAssignmentTypes";

@EnforceTenantId
export default class SchemeEntryAssignmentDeleteProvider {
  public async delete(criteria: SchemeEntryAssignmentDeleteRequestType, dbClient: PrismaTransactionClient = DbClient) {
    try {
      const { id, tenantId } = criteria;

      const schemeEntryAssignment = await dbClient.schemaEntryAssignment.delete({
        where: {
          id,
          tenantId,
        },
      });

      return schemeEntryAssignment;
    } catch (error: any) {
      throw new InternalServerError(error);
    }
  }
}
