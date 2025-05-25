import { EntryPointHandler, INextFunction, IRequest, IResponse, IRouter } from "~/infrastructure/internal/types";
import BaseController from "../../../base/contollers/Base.controller";
import { HttpMethodEnum } from "~/api/shared/helpers/enums/HttpMethod.enum";
import ApplicationStatusEnum from "~/api/shared/helpers/enums/ApplicationStatus.enum";
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum";
import { HttpHeaderEnum } from "~/api/shared/helpers/enums/HttpHeader.enum";
import { HttpContentTypeEnum } from "~/api/shared/helpers/enums/HttpContentType.enum";
import { autoInjectable } from "tsyringe";
import { validateData } from "~/api/shared/helpers/middleware/validateData";
import { schemeEntryContentReadSchema } from "../validators/SchemeEntryContentReadSchema";
import SchemeEntryContentReadService from "../services/SchemeEntryContentRead.service";

@autoInjectable()
export default class SchemeEntryContentReadController extends BaseController {
  static controllerName: string;
  private schemeEntryContentReadService: SchemeEntryContentReadService;

  constructor(schemeEntryContentReadService: SchemeEntryContentReadService) {
    super();
    this.controllerName = "SchemeEntryContentReadController";
    this.schemeEntryContentReadService = schemeEntryContentReadService;
  }

  read: EntryPointHandler = async (req: IRequest, res: IResponse, next: INextFunction): Promise<void> => {
    return this.handleResultData(res, next, this.schemeEntryContentReadService.execute(res.trace, req.body), {
      [HttpHeaderEnum.CONTENT_TYPE]: HttpContentTypeEnum.APPLICATION_JSON,
    });
  };

  readOne: EntryPointHandler = async (req: IRequest, res: IResponse, next: INextFunction): Promise<void> => {
    return this.handleResultData(res, next, this.schemeEntryContentReadService.readOne(res.trace, req.body), {
      [HttpHeaderEnum.CONTENT_TYPE]: HttpContentTypeEnum.APPLICATION_JSON,
    });
  };

  public initializeRoutes(router: IRouter): void {
    this.setRouter(router());

    this.addRoute({
      method: HttpMethodEnum.POST,
      path: "/schemeentrycontent/list",
      handlers: [validateData(schemeEntryContentReadSchema), this.read],
      produces: [
        {
          applicationStatus: ApplicationStatusEnum.SUCCESS,
          httpStatus: HttpStatusCodeEnum.SUCCESS,
        },
      ],
      description: "Get all scheme entry contents",
    });

    this.addRoute({
      method: HttpMethodEnum.POST,
      path: "/schemeentrycontent/info",
      handlers: [validateData(schemeEntryContentReadSchema), this.readOne],
      produces: [
        {
          applicationStatus: ApplicationStatusEnum.SUCCESS,
          httpStatus: HttpStatusCodeEnum.SUCCESS,
        },
      ],
      description: "Get a single scheme entry content",
    });
  }
}
