import DbClient, { PrismaTransactionClient } from "~/infrastructure/internal/database";
import { EnforceTenantId } from "~/api/modules/base/decorators/EnforceTenantId.decorator";
import { InternalServerError } from "~/infrastructure/internal/exceptions/InternalServerError";
import { SchemeEntryAssignmentCreateRequestType } from "~/api/modules/lessonPlanning/schemeEntryAssignment/types/SchemeEntryAssignmentTypes";

@EnforceTenantId
export default class SchemeEntryAssignmentCreateProvider {
  public async create(args: SchemeEntryAssignmentCreateRequestType, dbClient: PrismaTransactionClient = DbClient) {
    try {
      const { schemaEntryId, title, description, dueDate, resources, order, tenantId } = args;

      const schemeEntryAssignment = await dbClient.schemaEntryAssignment.create({
        data: {
          schemaEntryId,
          title,
          description,
          dueDate,
          resources,
          order,
          tenantId,
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
