"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const Base_controller_1 = __importDefault(require("../../base/contollers/Base.controller"));
const SubjectCreate_service_1 = __importDefault(require("../services/SubjectCreate.service"));
const SubjectCreateSchema_1 = require("../validators/SubjectCreateSchema");
const HttpHeader_enum_1 = require("../../../shared/helpers/enums/HttpHeader.enum");
const HttpMethod_enum_1 = require("../../../shared/helpers/enums/HttpMethod.enum");
const validateData_1 = require("../../../shared/helpers/middleware/validateData");
const HttpStatusCode_enum_1 = require("../../../shared/helpers/enums/HttpStatusCode.enum");
const ApplicationStatus_enum_1 = __importDefault(require("../../../shared/helpers/enums/ApplicationStatus.enum"));
const HttpContentType_enum_1 = require("../../../shared/helpers/enums/HttpContentType.enum");
let SubjectCreateController = class SubjectCreateController extends Base_controller_1.default {
    constructor(subjectCreateService) {
        super();
        this.create = async (req, res, next) => {
            return this.handleResultData(res, next, this.subjectCreateService.execute(res.trace, req), {
                [HttpHeader_enum_1.HttpHeaderEnum.CONTENT_TYPE]: HttpContentType_enum_1.HttpContentTypeEnum.APPLICATION_JSON,
            });
        };
        this.controllerName = "SubjectCreateController";
        this.subjectCreateService = subjectCreateService;
    }
    initializeRoutes(router) {
        this.setRouter(router());
        this.addRoute({
            method: HttpMethod_enum_1.HttpMethodEnum.POST,
            path: "/subject/create",
            handlers: [(0, validateData_1.validateData)(SubjectCreateSchema_1.subjectCreateSchema), this.create],
            produces: [
                {
                    applicationStatus: ApplicationStatus_enum_1.default.SUCCESS,
                    httpStatus: HttpStatusCode_enum_1.HttpStatusCodeEnum.CREATED,
                },
            ],
            description: "Create a new subject",
        });
    }
};
SubjectCreateController = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [SubjectCreate_service_1.default])
], SubjectCreateController);
exports.default = SubjectCreateController;
//# sourceMappingURL=SubjectCreate.controller.js.map