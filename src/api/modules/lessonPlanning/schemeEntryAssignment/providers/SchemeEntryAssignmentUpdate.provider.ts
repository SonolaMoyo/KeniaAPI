import DbClient, { PrismaTransactionClient } from "~/infrastructure/internal/database";
import { EnforceTenantId } from "~/api/modules/base/decorators/EnforceTenantId.decorator";
import { InternalServerError } from "~/infrastructure/internal/exceptions/InternalServerError";
import { SchemeEntryAssignmentUpdateRequestType } from "~/api/modules/lessonPlanning/schemeEntryAssignment/types/SchemeEntryAssignmentTypes";

@EnforceTenantId
export default class SchemeEntryAssignmentUpdateProvider {
  public async update(criteria: SchemeEntryAssignmentUpdateRequestType, dbClient: PrismaTransactionClient = DbClient) {
    try {
      const { id, schemaEntryId, title, description, dueDate, resources, order, tenantId } = criteria;

      const schemeEntryAssignment = await dbClient.schemaEntryAssignment.update({
        where: { id, tenantId },
        data: {
          ...(schemaEntryId && { schemaEntryId }),
          ...(title && { title }),
          ...(description && { description }),
          ...(dueDate && { dueDate }),
          ...(resources && { resources }),
          ...(order && { order }),
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
