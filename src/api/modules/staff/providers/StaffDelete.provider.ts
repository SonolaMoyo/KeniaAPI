import { Staff } from "@prisma/client";
import DbClient from "~/infrastructure/internal/database";
import { StaffCriteriaType } from "~/api/modules/staff/types/StaffTypes";
import { NOT_FOUND } from "~/api/shared/helpers/messages/SystemMessages";
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum";
import { BadRequestError } from "~/infrastructure/internal/exceptions/BadRequestError";
import { EnforceTenantId } from "~/api/modules/base/decorators/EnforceTenantId.decorator";

@EnforceTenantId
export default class StaffDeleteProvider {
  public async deleteOne(criteria: StaffCriteriaType, tx?: any): Promise<Staff | any> {
    const dbClient = tx ? tx : DbClient;
    const toDelete = await dbClient?.staff?.findFirst({
      where: criteria,
    });
    // if(!toDelete) throw new Error("Staff not found");
    if (!toDelete) throw new BadRequestError(`Staff ${NOT_FOUND}`, HttpStatusCodeEnum.NOT_FOUND);

    const deletedStaff = await dbClient?.staff?.delete({
      where: { id: toDelete.id },
    });
    return deletedStaff;
  }

  public async deleteMany(criteria: StaffCriteriaType, tx?: any): Promise<Staff | any> {
    const dbClient = tx ? tx : DbClient;
    const deletedStaff = await dbClient?.staff?.deleteMany({
      where: criteria,
    });
    return deletedStaff;
  }
}
