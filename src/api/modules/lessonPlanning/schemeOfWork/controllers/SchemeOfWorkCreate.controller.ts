import { EntryPointHandler, INextFunction, IRequest, IResponse, IRouter } from "~/infrastructure/internal/types";
import BaseController from "../../../base/contollers/Base.controller";
import { HttpMethodEnum } from "~/api/shared/helpers/enums/HttpMethod.enum";
import ApplicationStatusEnum from "~/api/shared/helpers/enums/ApplicationStatus.enum";
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum";
import { HttpHeaderEnum } from "~/api/shared/helpers/enums/HttpHeader.enum";
import { HttpContentTypeEnum } from "~/api/shared/helpers/enums/HttpContentType.enum";
import { autoInjectable } from "tsyringe";
import { validateData } from "~/api/shared/helpers/middleware/validateData";
import { schemeOfWorkCreateSchema } from "../validators/SchemeOfWorkCreateSchema";
import SchemeOfWorkCreateService from "../services/SchemeOfWorkCreate.service";

@autoInjectable()
export default class SchemeOfWorkCreateController extends BaseController {
  static controllerName: string;
  private schemeOfWorkCreateService: SchemeOfWorkCreateService;

  constructor(schemeOfWorkCreateService: SchemeOfWorkCreateService) {
    super();
    this.controllerName = "SchemeOfWorkCreateController";
    this.schemeOfWorkCreateService = schemeOfWorkCreateService;
  }

  create: EntryPointHandler = async (req: IRequest, res: IResponse, next: INextFunction): Promise<void> => {
    return this.handleResultData(res, next, this.schemeOfWorkCreateService.execute(res.trace, req.body), {
      [HttpHeaderEnum.CONTENT_TYPE]: HttpContentTypeEnum.APPLICATION_JSON,
    });
  };

  public initializeRoutes(router: IRouter): void {
    this.setRouter(router());

    this.addRoute({
      method: HttpMethodEnum.POST,
      path: "/schemeofwork/create",
      handlers: [validateData(schemeOfWorkCreateSchema), this.create],
      produces: [
        {
          applicationStatus: ApplicationStatusEnum.SUCCESS,
          httpStatus: HttpStatusCodeEnum.CREATED,
        },
      ],
      description: "Create a new scheme of work",
    });
  }
}
