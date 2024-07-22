import DbClient, { PrismaTransactionClient } from "~/infrastructure/internal/database";
import { Tenant } from "@prisma/client";
import { TenantCriteria } from "../types/TenantTypes";
import { BadRequestError } from "~/infrastructure/internal/exceptions/BadRequestError";
import { NOT_FOUND } from "~/api/shared/helpers/messages/SystemMessages";
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum";

export default class StaffDeleteProvider {
  public async deleteOneByCriteria(criteria: TenantCriteria, dbClient: PrismaTransactionClient = DbClient): Promise<Tenant | any> {
    const { id } = criteria.id;
    const deletedTenant = await dbClient?.tenant?.delete({
      where: { id },
    });
    return deletedTenant;
  }

  public async deleteByCriteria(criteria: TenantCriteria, dbClient: PrismaTransactionClient = DbClient): Promise<Tenant | any> {
    const deletedTenant = await dbClient?.tenant?.deleteMany({
      where: criteria,
    });
    return deletedTenant;
  }
}
