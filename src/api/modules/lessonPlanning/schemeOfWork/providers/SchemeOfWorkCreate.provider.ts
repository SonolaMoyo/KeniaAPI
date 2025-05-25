import DbClient, { PrismaTransactionClient } from "~/infrastructure/internal/database";
import { EnforceTenantId } from "~/api/modules/base/decorators/EnforceTenantId.decorator";
import { InternalServerError } from "~/infrastructure/internal/exceptions/InternalServerError";
import { SchemeOfWorkCreateRequestType } from "../types/SchemeOfWorkTypes";
import { SchemeStatus } from "@prisma/client";

@EnforceTenantId
export default class SchemeOfWorkCreateProvider {
  public async create(args: SchemeOfWorkCreateRequestType, dbClient: PrismaTransactionClient = DbClient) {
    try {
      const { subjectId, staffId, classId, termId, calendarId, status, approvedBy, approvedAt, notes, tenantId } = args;

      const schemeOfWork = await dbClient.schemeOfWork.create({
        data: {
          subjectId,
          staffId,
          classId,
          termId,
          calendarId,
          status: status as SchemeStatus,
          approvedBy,
          approvedAt,
          notes,
          tenantId,
        },
        include: {
          entries: true,
        },
      });
      return schemeOfWork;
    } catch (error: any) {
      throw new InternalServerError(error);
    }
  }
}
