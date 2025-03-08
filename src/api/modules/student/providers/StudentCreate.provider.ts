import { Student } from "@prisma/client";
import { StudentCreateType } from "../types/StudentTypes";
import DbClient, { PrismaTransactionClient } from "~/infrastructure/internal/database";
import { InternalServerError } from "~/infrastructure/internal/exceptions/InternalServerError";

export default class StudentCreateProvider {
  public async create(data: StudentCreateType, dbClient: PrismaTransactionClient = DbClient): Promise<Student> {
    try {
      const { userId, classId, classDivisionId, tenantId, enrollmentDate, dormitoryId, studentGroupIds, guardianIds, subjectIds } = data;

      const student = await dbClient?.student.create({
        data: {
          userId,
          classId,
          classDivisionId,
          tenantId,
          enrollmentDate,
          dormitoryId,
          studentGroups: {
            connect: studentGroupIds?.map((id) => ({ id })),
          },
          guardians: {
            connect: guardianIds?.map((id) => ({ id })),
          },
          subjects: {
            connect: subjectIds?.map((id) => ({ id })),
          },
        },
        include: {
          user: true,
          class: true,
          subjects: true,
          classDivision: true,
          guardians: true,
          documents: true,
          dormitory: true,
          medicalHistory: true,
          studentGroups: true,
        },
      });

      if (student.user) {
        delete (student.user as any).password;
      }

      return student;
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }
}
