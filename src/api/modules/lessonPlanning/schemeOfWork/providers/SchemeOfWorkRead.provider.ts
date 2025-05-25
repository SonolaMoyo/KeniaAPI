import DbClient, { PrismaTransactionClient } from "~/infrastructure/internal/database";
import { EnforceTenantId } from "~/api/modules/base/decorators/EnforceTenantId.decorator";
import { InternalServerError } from "~/infrastructure/internal/exceptions/InternalServerError";
import { SchemeOfWorkReadRequestType } from "../types/SchemeOfWorkTypes";

@EnforceTenantId
export default class SchemeOfWorkReadProvider {
  public async getByCriteria(criteria: SchemeOfWorkReadRequestType, dbClient: PrismaTransactionClient = DbClient) {
    try {
      const { id, subjectId, staffId, classId, termId, calendarId, tenantId } = criteria;

      const schemeOfWorks = await dbClient.schemeOfWork.findMany({
        where: {
          ...(id && { id }),
          ...(subjectId && { subjectId }),
          ...(staffId && { staffId }),
          ...(classId && { classId }),
          ...(termId && { termId }),
          ...(calendarId && { calendarId }),
          ...(tenantId && { tenantId }),
        },
        include: {
          entries: true,
        },
      });

      return schemeOfWorks;
    } catch (error: any) {
      throw new InternalServerError(error);
    }
  }

  public async getOneByCriteria(criteria: SchemeOfWorkReadRequestType, dbClient: PrismaTransactionClient = DbClient) {
    try {
      const { id, subjectId, staffId, classId, termId, calendarId, tenantId } = criteria;

      const schemeOfWork = await dbClient.schemeOfWork.findFirst({
        where: {
          ...(id && { id }),
          ...(subjectId && { subjectId }),
          ...(staffId && { staffId }),
          ...(classId && { classId }),
          ...(termId && { termId }),
          ...(calendarId && { calendarId }),
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
