import { EntryPointHandler, INextFunction, IRequest, IResponse, IRouter } from "~/infrastructure/internal/types";
import BaseController from "../../../base/contollers/Base.controller";
import { HttpMethodEnum } from "~/api/shared/helpers/enums/HttpMethod.enum";
import ApplicationStatusEnum from "~/api/shared/helpers/enums/ApplicationStatus.enum";
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum";
import { HttpHeaderEnum } from "~/api/shared/helpers/enums/HttpHeader.enum";
import { HttpContentTypeEnum } from "~/api/shared/helpers/enums/HttpContentType.enum";
import { autoInjectable } from "tsyringe";
import { validateData } from "~/api/shared/helpers/middleware/validateData";
import { schemeEntryAssignmentUpdateSchema } from "../validators/SchemeEntryAssignmentUpdateSchema";
import SchemeEntryAssignmentUpdateService from "../services/SchemeEntryAssignmentUpdate.service";

@autoInjectable()
export default class SchemeEntryAssignmentUpdateController extends BaseController {
  static controllerName: string;
  private schemeEntryAssignmentUpdateService: SchemeEntryAssignmentUpdateService;

  constructor(schemeEntryAssignmentUpdateService: SchemeEntryAssignmentUpdateService) {
    super();
    this.controllerName = "SchemeEntryAssignmentUpdateController";
    this.schemeEntryAssignmentUpdateService = schemeEntryAssignmentUpdateService;
  }

  update: EntryPointHandler = async (req: IRequest, res: IResponse, next: INextFunction): Promise<void> => {
    return this.handleResultData(res, next, this.schemeEntryAssignmentUpdateService.execute(res.trace, req.body), {
      [HttpHeaderEnum.CONTENT_TYPE]: HttpContentTypeEnum.APPLICATION_JSON,
    });
  };

  public initializeRoutes(router: IRouter): void {
    this.setRouter(router());

    this.addRoute({
      method: HttpMethodEnum.POST,
      path: "/schemeentryassignment/update",
      handlers: [validateData(schemeEntryAssignmentUpdateSchema), this.update],
      produces: [
        {
          applicationStatus: ApplicationStatusEnum.SUCCESS,
          httpStatus: HttpStatusCodeEnum.SUCCESS,
        },
      ],
      description: "Update a scheme entry assignment",
    });
  }
}
