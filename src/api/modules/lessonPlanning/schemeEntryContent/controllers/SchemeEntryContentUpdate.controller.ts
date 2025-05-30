import { EntryPointHandler, INextFunction, IRequest, IResponse, IRouter } from "~/infrastructure/internal/types";
import BaseController from "../../../base/contollers/Base.controller";
import { HttpMethodEnum } from "~/api/shared/helpers/enums/HttpMethod.enum";
import ApplicationStatusEnum from "~/api/shared/helpers/enums/ApplicationStatus.enum";
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum";
import { HttpHeaderEnum } from "~/api/shared/helpers/enums/HttpHeader.enum";
import { HttpContentTypeEnum } from "~/api/shared/helpers/enums/HttpContentType.enum";
import { autoInjectable } from "tsyringe";
import { validateData } from "~/api/shared/helpers/middleware/validateData";
import { schemeEntryContentUpdateSchema } from "../validators/SchemeEntryContentUpdateSchema";
import SchemeEntryContentUpdateService from "../services/SchemeEntryContentUpdate.service";

@autoInjectable()
export default class SchemeEntryContentUpdateController extends BaseController {
  static controllerName: string;
  private schemeEntryContentUpdateService: SchemeEntryContentUpdateService;

  constructor(schemeEntryContentUpdateService: SchemeEntryContentUpdateService) {
    super();
    this.controllerName = "SchemeEntryContentUpdateController";
    this.schemeEntryContentUpdateService = schemeEntryContentUpdateService;
  }

  update: EntryPointHandler = async (req: IRequest, res: IResponse, next: INextFunction): Promise<void> => {
    return this.handleResultData(res, next, this.schemeEntryContentUpdateService.execute(res.trace, req.body), {
      [HttpHeaderEnum.CONTENT_TYPE]: HttpContentTypeEnum.APPLICATION_JSON,
    });
  };

  public initializeRoutes(router: IRouter): void {
    this.setRouter(router());

    this.addRoute({
      method: HttpMethodEnum.POST,
      path: "/schemeentrycontent/update",
      handlers: [validateData(schemeEntryContentUpdateSchema), this.update],
      produces: [
        {
          applicationStatus: ApplicationStatusEnum.SUCCESS,
          httpStatus: HttpStatusCodeEnum.SUCCESS,
        },
      ],
      description: "Update a scheme entry content",
    });
  }
}
