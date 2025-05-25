import DbClient, { PrismaTransactionClient } from "~/infrastructure/internal/database";
import { EnforceTenantId } from "~/api/modules/base/decorators/EnforceTenantId.decorator";
import { InternalServerError } from "~/infrastructure/internal/exceptions/InternalServerError";
import { SchemeOfWorkDeleteRequestType } from "../types/SchemeOfWorkTypes";

@EnforceTenantId
export default class SchemeOfWorkDeleteProvider {
  public async delete(criteria: SchemeOfWorkDeleteRequestType, dbClient: PrismaTransactionClient = DbClient) {
    try {
      const { id, tenantId } = criteria;

      const schemeOfWork = await dbClient.schemeOfWork.delete({
        where: { id, tenantId },
      });

      return schemeOfWork;
    } catch (error: any) {
      throw new InternalServerError(error);
    }
  }
}
