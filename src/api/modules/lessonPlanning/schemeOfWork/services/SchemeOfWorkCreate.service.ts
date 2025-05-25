import { autoInjectable } from "tsyringe";
import { BaseService } from "../../../base/services/Base.service";
import { IResult } from "~/api/shared/helpers/results/IResult";
import { ServiceTrace } from "~/api/shared/helpers/trace/ServiceTrace";
import SchemeOfWorkCreateProvider from "../providers/SchemeOfWorkCreate.provider";
import { SUCCESS, ERROR } from "~/api/shared/helpers/messages/SystemMessages";
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum";
import { RESOURCE_RECORD_CREATED_SUCCESSFULLY } from "~/api/shared/helpers/messages/SystemMessagesFunction";
import { ILoggingDriver } from "~/infrastructure/internal/logger/ILoggingDriver";
import { LoggingProviderFactory } from "~/infrastructure/internal/logger/LoggingProviderFactory";
import { SchemeOfWorkCreateRequestType } from "../types/SchemeOfWorkTypes";

@autoInjectable()
export default class SchemeOfWorkCreateService extends BaseService<SchemeOfWorkCreateRequestType> {
  static serviceName = "SchemeOfWorkCreateService";
  private schemeOfWorkCreateProvider: SchemeOfWorkCreateProvider;
  loggingProvider: ILoggingDriver;

  constructor(schemeOfWorkCreateProvider: SchemeOfWorkCreateProvider) {
    super(SchemeOfWorkCreateService.serviceName);
    this.schemeOfWorkCreateProvider = schemeOfWorkCreateProvider;
    this.loggingProvider = LoggingProviderFactory.build();
  }

  public async execute(trace: ServiceTrace, args: SchemeOfWorkCreateRequestType): Promise<IResult> {
    try {
      this.initializeServiceTrace(trace, args);

      const schemeOfWork = await this.schemeOfWorkCreateProvider.create({ ...args });
      trace.setSuccessful();

      this.result.setData(SUCCESS, HttpStatusCodeEnum.CREATED, RESOURCE_RECORD_CREATED_SUCCESSFULLY("SchemeOfWork"), schemeOfWork);
      return this.result;
    } catch (error: any) {
      this.loggingProvider.error(error);
      this.result.setError(ERROR, error.httpStatusCode, error.description);
      return this.result;
    }
  }
}
