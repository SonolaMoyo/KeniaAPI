import DbClient, { PrismaTransactionClient } from "~/infrastructure/internal/database";
import { DormitoryCriteriaType } from "../types/DormitoryTypes";
import { InternalServerError } from "~/infrastructure/internal/exceptions/InternalServerError";

export default class DormitoryReadProvider {
  public async getByCriteria(criteria: DormitoryCriteriaType, dbClient: PrismaTransactionClient = DbClient) {
    try {
      const { id, ids, name, tenantId } = criteria;

      const dormitories = await dbClient.dormitory.findMany({
        where: {
          ...(id && { id }),
          ...(ids && { id: { in: ids } }),
          ...(name && { name: { contains: name } }),
          ...(tenantId && { tenantId }),
        },
        include: {
          students: true,
        },
      });

      return dormitories;
    } catch (error: any) {
      throw new InternalServerError(error);
    }
  }

  public async getOneByCriteria(criteria: DormitoryCriteriaType, dbClient: PrismaTransactionClient = DbClient) {
    try {
      const { id, name, tenantId } = criteria;

      const dormitory = await dbClient.dormitory.findFirst({
        where: {
          ...(id && { id }),
          ...(name && { name: { contains: name } }),
          ...(tenantId && { tenantId }),
        },
        include: {
          students: true,
        },
      });

      return dormitory;
    } catch (error: any) {
      throw new InternalServerError(error);
    }
  }
}
