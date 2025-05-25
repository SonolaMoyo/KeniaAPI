import DbClient, { PrismaTransactionClient } from "~/infrastructure/internal/database";
import { EnforceTenantId } from "~/api/modules/base/decorators/EnforceTenantId.decorator";
import { InternalServerError } from "~/infrastructure/internal/exceptions/InternalServerError";
import { SchemeOfWorkUpdateRequestType } from "../types/SchemeOfWorkTypes";
import { SchemeStatus } from "@prisma/client";

@EnforceTenantId
export default class SchemeOfWorkUpdateProvider {
  public async update(criteria: SchemeOfWorkUpdateRequestType, dbClient: PrismaTransactionClient = DbClient) {
    try {
      const { id, subjectId, staffId, classId, termId, calendarId, status, approvedBy, approvedAt, notes, tenantId } = criteria;

      const schemeOfWork = await dbClient.schemeOfWork.update({
        where: { id },
        data: {
          ...(subjectId && { subjectId }),
          ...(staffId && { staffId }),
          ...(classId && { classId }),
          ...(termId && { termId }),
          ...(calendarId && { calendarId }),
          ...(status && { status: status as SchemeStatus }),
          ...(approvedBy && { approvedBy }),
          ...(approvedAt && { approvedAt }),
          ...(notes && { notes }),
          ...(tenantId && { tenantId }),
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
