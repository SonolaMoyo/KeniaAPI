import DbClient, { PrismaTransactionClient } from "~/infrastructure/internal/database";
import { SchoolCalendarCriteriaType } from "../types/SchoolCalendarTypes";
import { InternalServerError } from "~/infrastructure/internal/exceptions/InternalServerError";

export default class SchoolCalendarReadProvider {
  public async getByCriteria(criteria: SchoolCalendarCriteriaType, dbClient: PrismaTransactionClient = DbClient) {
    try {
      const { id, ids, year, tenantId } = criteria;

      const schoolCalendars = await dbClient.schoolCalendar.findMany({
        where: {
          ...(id && { id }),
          ...(ids && { id: { in: ids } }),
          ...(year && { year }),
          ...(tenantId && { tenantId }),
        },
        include: {
          terms: {
            include: {
              breakWeeks: true,
            },
          },
        },
      });

      return schoolCalendars;
    } catch (error: any) {
      throw new InternalServerError(error);
    }
  }

  public async getOneByCriteria(criteria: SchoolCalendarCriteriaType, dbClient: PrismaTransactionClient = DbClient) {
    try {
      const { id, year, tenantId } = criteria;

      const schoolCalendar = await dbClient.schoolCalendar.findFirst({
        where: {
          ...(id && { id }),
          ...(year && { year }),
          ...(tenantId && { tenantId }),
        },
        include: {
          terms: {
            include: {
              breakWeeks: true,
            },
          },
        },
      });

      return schoolCalendar;
    } catch (error: any) {
      throw new InternalServerError(error);
    }
  }
}
