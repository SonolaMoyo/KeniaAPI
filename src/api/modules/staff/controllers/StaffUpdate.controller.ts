import { EntryPointHandler, INextFunction, IRequest, IResponse, IRouter } from "~/infrastructure/internal/types";
import BaseController from "../../base/contollers/Base.controller";
import { HttpMethodEnum } from "~/api/shared/helpers/enums/HttpMethod.enum";
import ApplicationStatusEnum from "~/api/shared/helpers/enums/ApplicationStatus.enum";
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum";
import { HttpHeaderEnum } from "~/api/shared/helpers/enums/HttpHeader.enum";
import { HttpContentTypeEnum } from "~/api/shared/helpers/enums/HttpContentType.enum";
import { autoInjectable } from "tsyringe";
import { validateData } from "~/api/shared/helpers/middleware/validateData";
import { staffUpdateManySchema, staffUpdateSchema } from "../validators/StaffUpdateSchema";
import StaffUpdateService from "../services/StaffUpdate.service";

@autoInjectable()
export default class StaffUpdateController extends BaseController {
  static controllerName: string;
  private staffUpdateService: StaffUpdateService;
  constructor(staffUpdateService: StaffUpdateService) {
    super();
    this.controllerName = "StaffUpdateController";
    this.staffUpdateService = staffUpdateService;
  }

  updateMany: EntryPointHandler = async (req: IRequest, res: IResponse, next: INextFunction): Promise<void> => {
    return this.handleResultData(res, next, this.staffUpdateService.updateMany(res.trace, req.body), {
      [HttpHeaderEnum.CONTENT_TYPE]: HttpContentTypeEnum.APPLICATION_JSON,
    });
  };

  updateOne: EntryPointHandler = async (req: IRequest, res: IResponse, next: INextFunction): Promise<void> => {
    return this.handleResultData(res, next, this.staffUpdateService.execute(res.trace, req), {
      [HttpHeaderEnum.CONTENT_TYPE]: HttpContentTypeEnum.APPLICATION_JSON,
    });
  };

  // removeListFromStaff: EntryPointHandler = async (req: IRequest, res: IResponse, next: INextFunction): Promise<void> => {
  //   return this.handleResultData(res, next, this.staffUpdateService.removeListFromStaff(res.trace, req.body), {
  //     [HttpHeaderEnum.CONTENT_TYPE]: HttpContentTypeEnum.APPLICATION_JSON,
  //   });
  // };

  public initializeRoutes(router: IRouter): void {
    this.setRouter(router());

    this.addRoute({
      method: HttpMethodEnum.POST,
      path: "/staff/update/:id",
      handlers: [validateData(staffUpdateSchema), this.updateOne],
      produces: [
        {
          applicationStatus: ApplicationStatusEnum.SUCCESS,
          httpStatus: HttpStatusCodeEnum.SUCCESS,
        },
      ],
      description: "Update Staff Information",
    });

    this.addRoute({
      method: HttpMethodEnum.POST,
      path: "/staff/update_many",
      handlers: [validateData(staffUpdateManySchema), this.updateMany],
      produces: [
        {
          applicationStatus: ApplicationStatusEnum.SUCCESS,
          httpStatus: HttpStatusCodeEnum.SUCCESS,
        },
      ],
      description: "Update Staffs Information",
    });

    // this.addRoute({
    //   method: HttpMethodEnum.POST,
    //   path: "/staff/remove_list",
    //   handlers: [this.removeListFromStaff],
    //   produces: [
    //     {
    //       applicationStatus: ApplicationStatusEnum.SUCCESS,
    //       httpStatus: HttpStatusCodeEnum.SUCCESS,
    //     },
    //   ],
    //   description: "Update Staff Department",
    // });
  }
}
