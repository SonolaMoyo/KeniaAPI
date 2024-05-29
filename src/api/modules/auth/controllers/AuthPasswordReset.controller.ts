import {
  EntryPointHandler,
  INextFunction,
  IRequest,
  IResponse,
  IRouter
} from "~/infrastructure/internal/types"
import BaseController from "../../base/contollers/Base.controller"
import { HttpMethodEnum } from "~/api/shared/helpers/enums/HttpMethod.enum"
import ApplicationStatusEnum from "~/api/shared/helpers/enums/ApplicationStatus.enum"
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum"
import { HttpHeaderEnum } from "~/api/shared/helpers/enums/HttpHeader.enum"
import { HttpContentTypeEnum } from "~/api/shared/helpers/enums/HttpContentType.enum"
import { autoInjectable } from "tsyringe"
import { validateData } from "~/api/shared/helpers/middleware/validateData"
import AuthPasswordResetRequestService from "../services/AuthPasswordResetRequest.service"
import { requestPasswordRequestSchema } from "../validators/RequestPasswordResetSchema"

@autoInjectable()
export default class AuthPasswordResetController extends BaseController {
  static controllerName: string
  authPasswordResetRequestService: AuthPasswordResetRequestService
  constructor(
    authPasswordResetRequestService: AuthPasswordResetRequestService
  ) {
    super()
    this.controllerName = "AuthPasswordResetController"
    this.authPasswordResetRequestService = authPasswordResetRequestService
  }

  resetRequest: EntryPointHandler = async (
    req: IRequest,
    res: IResponse,
    next: INextFunction
  ): Promise<void> => {
    return this.handleResultData(
      res,
      next,
      this.authPasswordResetRequestService.execute(res.trace, req.body),
      {
        [HttpHeaderEnum.CONTENT_TYPE]: HttpContentTypeEnum.APPLICATION_JSON
      }
    )
  }

  public initializeRoutes(router: IRouter): void {
    this.setRouter(router())

    this.addRoute({
      method: HttpMethodEnum.GET,
      path: "/auth/password-reset/request",
      handlers: [validateData(requestPasswordRequestSchema), this.resetRequest],
      produces: [
        {
          applicationStatus: ApplicationStatusEnum.SUCCESS,
          httpStatus: HttpStatusCodeEnum.SUCCESS
        }
      ],
      description: "Request Password Reset"
    })
  }
}
