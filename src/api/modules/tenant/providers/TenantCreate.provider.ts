import { Tenant } from "@prisma/client";
import DbClient, { PrismaTransactionClient } from "~/infrastructure/internal/database";
import { InternalServerError } from "~/infrastructure/internal/exceptions/InternalServerError";

export default class TenantCreateProvider {
  public async create(args: any, dbClient: PrismaTransactionClient = DbClient): Promise<Tenant> {
    try {
      const newTenant = await dbClient?.tenant?.create({
        data: {
          metadata: {
            create: {
              totalStaff: 1,
              totalStudents: 0,
            },
          },
        },
        include: {
          metadata: true,
        },
      });

      return newTenant;
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }
}
