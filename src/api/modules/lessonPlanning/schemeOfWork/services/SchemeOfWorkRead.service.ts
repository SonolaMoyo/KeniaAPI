import { IRequest } from "~/infrastructure/internal/types";
import { autoInjectable } from "tsyringe";
import { BaseService } from "../../../base/services/Base.service";
import { IResult } from "~/api/shared/helpers/results/IResult";
import { ServiceTrace } from "~/api/shared/helpers/trace/ServiceTrace";
import SchemeOfWorkReadProvider from "../providers/SchemeOfWorkRead.provider";
import { ILoggingDriver } from "~/infrastructure/internal/logger/ILoggingDriver";
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum";
import { BadRequestError } from "~/infrastructure/internal/exceptions/BadRequestError";
import { LoggingProviderFactory } from "~/infrastructure/internal/logger/LoggingProviderFactory";
import { SUCCESS, ERROR } from "~/api/shared/helpers/messages/SystemMessages";
import { RESOURCE_FETCHED_SUCCESSFULLY, RESOURCE_RECORD_NOT_FOUND } from "~/api/shared/helpers/messages/SystemMessagesFunction";
import { SchemeOfWorkReadRequestType } from "../types/SchemeOfWorkTypes";

@autoInjectable()
export default class SchemeOfWorkReadService extends BaseService<SchemeOfWorkReadRequestType> {
  static serviceName = "SchemeOfWorkReadService";
  private schemeOfWorkReadProvider: SchemeOfWorkReadProvider;
  loggingProvider: ILoggingDriver;

  constructor(schemeOfWorkReadProvider: SchemeOfWorkReadProvider) {
    super(SchemeOfWorkReadService.serviceName);
    this.schemeOfWorkReadProvider = schemeOfWorkReadProvider;
    this.loggingProvider = LoggingProviderFactory.build();
  }

  public async execute(trace: ServiceTrace, args: SchemeOfWorkReadRequestType): Promise<IResult> {
    try {
      this.initializeServiceTrace(trace, args);
      const schemeOfWorks = await this.schemeOfWorkReadProvider.getByCriteria(args);
      trace.setSuccessful();

      this.result.setData(SUCCESS, HttpStatusCodeEnum.SUCCESS, RESOURCE_FETCHED_SUCCESSFULLY("SchemeOfWork"), schemeOfWorks);
      return this.result;
    } catch (error: any) {
      this.loggingProvider.error(error);
      this.result.setError(ERROR, error.httpStatusCode, error.description);
      return this.result;
    }
  }

  public async readOne(trace: ServiceTrace, args: SchemeOfWorkReadRequestType): Promise<IResult> {
    try {
      this.initializeServiceTrace(trace, args);
      const schemeOfWork = await this.schemeOfWorkReadProvider.getOneByCriteria({ ...args, id: Number(args.id) });

      if (!schemeOfWork) {
        throw new BadRequestError(RESOURCE_RECORD_NOT_FOUND("SchemeOfWork"), HttpStatusCodeEnum.NOT_FOUND);
      }

      trace.setSuccessful();

      this.result.setData(SUCCESS, HttpStatusCodeEnum.SUCCESS, RESOURCE_FETCHED_SUCCESSFULLY("SchemeOfWork"), schemeOfWork);
      return this.result;
    } catch (error: any) {
      this.loggingProvider.error(error);
      this.result.setError(ERROR, error.httpStatusCode, error.description);
      return this.result;
    }
  }
}
