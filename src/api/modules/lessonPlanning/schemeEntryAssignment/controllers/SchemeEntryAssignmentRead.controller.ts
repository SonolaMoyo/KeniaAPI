import { EntryPointHandler, INextFunction, IRequest, IResponse, IRouter } from "~/infrastructure/internal/types";
import BaseController from "../../../base/contollers/Base.controller";
import { HttpMethodEnum } from "~/api/shared/helpers/enums/HttpMethod.enum";
import ApplicationStatusEnum from "~/api/shared/helpers/enums/ApplicationStatus.enum";
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum";
import { HttpHeaderEnum } from "~/api/shared/helpers/enums/HttpHeader.enum";
import { HttpContentTypeEnum } from "~/api/shared/helpers/enums/HttpContentType.enum";
import { autoInjectable } from "tsyringe";
import { validateData } from "~/api/shared/helpers/middleware/validateData";
import { schemeEntryAssignmentReadSchema } from "../validators/SchemeEntryAssignmentReadSchema";
import SchemeEntryAssignmentReadService from "../services/SchemeEntryAssignmentRead.service";

@autoInjectable()
export default class SchemeEntryAssignmentReadController extends BaseController {
  static controllerName: string;
  private schemeEntryAssignmentReadService: SchemeEntryAssignmentReadService;

  constructor(schemeEntryAssignmentReadService: SchemeEntryAssignmentReadService) {
    super();
    this.controllerName = "SchemeEntryAssignmentReadController";
    this.schemeEntryAssignmentReadService = schemeEntryAssignmentReadService;
  }

  read: EntryPointHandler = async (req: IRequest, res: IResponse, next: INextFunction): Promise<void> => {
    return this.handleResultData(res, next, this.schemeEntryAssignmentReadService.execute(res.trace, req.body), {
      [HttpHeaderEnum.CONTENT_TYPE]: HttpContentTypeEnum.APPLICATION_JSON,
    });
  };

  readOne: EntryPointHandler = async (req: IRequest, res: IResponse, next: INextFunction): Promise<void> => {
    return this.handleResultData(res, next, this.schemeEntryAssignmentReadService.readOne(res.trace, req.body), {
      [HttpHeaderEnum.CONTENT_TYPE]: HttpContentTypeEnum.APPLICATION_JSON,
    });
  };

  public initializeRoutes(router: IRouter): void {
    this.setRouter(router());

    this.addRoute({
      method: HttpMethodEnum.POST,
      path: "/schemeentryassignment/list",
      handlers: [validateData(schemeEntryAssignmentReadSchema), this.read],
      produces: [
        {
          applicationStatus: ApplicationStatusEnum.SUCCESS,
          httpStatus: HttpStatusCodeEnum.SUCCESS,
        },
      ],
      description: "Get all scheme entry assignments",
    });

    this.addRoute({
      method: HttpMethodEnum.POST,
      path: "/schemeentryassignment/info",
      handlers: [validateData(schemeEntryAssignmentReadSchema), this.readOne],
      produces: [
        {
          applicationStatus: ApplicationStatusEnum.SUCCESS,
          httpStatus: HttpStatusCodeEnum.SUCCESS,
        },
      ],
      description: "Get a single scheme entry assignment",
    });
  }
}
