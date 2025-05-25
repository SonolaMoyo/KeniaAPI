import { EntryPointHandler, INextFunction, IRequest, IResponse, IRouter } from "~/infrastructure/internal/types";
import BaseController from "../../../base/contollers/Base.controller";
import { HttpMethodEnum } from "~/api/shared/helpers/enums/HttpMethod.enum";
import ApplicationStatusEnum from "~/api/shared/helpers/enums/ApplicationStatus.enum";
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum";
import { HttpHeaderEnum } from "~/api/shared/helpers/enums/HttpHeader.enum";
import { HttpContentTypeEnum } from "~/api/shared/helpers/enums/HttpContentType.enum";
import { autoInjectable } from "tsyringe";
import SchemeEntryAssignmentDeleteService from "../services/SchemeEntryAssignmentDelete.service";

@autoInjectable()
export default class SchemeEntryAssignmentDeleteController extends BaseController {
  static controllerName: string;
  private schemeEntryAssignmentDeleteService: SchemeEntryAssignmentDeleteService;

  constructor(schemeEntryAssignmentDeleteService: SchemeEntryAssignmentDeleteService) {
    super();
    this.controllerName = "SchemeEntryAssignmentDeleteController";
    this.schemeEntryAssignmentDeleteService = schemeEntryAssignmentDeleteService;
  }

  delete: EntryPointHandler = async (req: IRequest, res: IResponse, next: INextFunction): Promise<void> => {
    return this.handleResultData(res, next, this.schemeEntryAssignmentDeleteService.execute(res.trace, req.body), {
      [HttpHeaderEnum.CONTENT_TYPE]: HttpContentTypeEnum.APPLICATION_JSON,
    });
  };

  public initializeRoutes(router: IRouter): void {
    this.setRouter(router());

    this.addRoute({
      method: HttpMethodEnum.POST,
      path: "/schemeentryassignment/delete",
      handlers: [this.delete],
      produces: [
        {
          applicationStatus: ApplicationStatusEnum.SUCCESS,
          httpStatus: HttpStatusCodeEnum.SUCCESS,
        },
      ],
      description: "Delete a scheme entry assignment",
    });
  }
}
