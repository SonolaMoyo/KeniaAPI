"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../../../infrastructure/internal/database"));
const InternalServerError_1 = require("../../../../infrastructure/internal/exceptions/InternalServerError");
class SubjectCreateProvider {
    async create(args, dbClient = database_1.default) {
        try {
            const { name, description, classId, tenantId, staffIds } = args;
            const subject = await dbClient.subject.create({
                data: {
                    name,
                    description,
                    classId,
                    tenantId,
                    staffs: {
                        connect: staffIds?.map((id) => ({ id })),
                    },
                },
                include: {
                    class: true,
                    staffs: true,
                },
            });
            return subject;
        }
        catch (error) {
            throw new InternalServerError_1.InternalServerError(error);
        }
    }
}
exports.default = SubjectCreateProvider;
//# sourceMappingURL=SubjectCreate.provider.js.map