import { autoInjectable } from "tsyringe";
import { BaseService } from "../../../base/services/Base.service";
import { IResult } from "~/api/shared/helpers/results/IResult";
import { ServiceTrace } from "~/api/shared/helpers/trace/ServiceTrace";
import SchemeOfWorkDeleteProvider from "../providers/SchemeOfWorkDelete.provider";
import { SUCCESS, ERROR } from "~/api/shared/helpers/messages/SystemMessages";
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum";
import { RESOURCE_RECORD_DELETED_SUCCESSFULLY } from "~/api/shared/helpers/messages/SystemMessagesFunction";
import { ILoggingDriver } from "~/infrastructure/internal/logger/ILoggingDriver";
import { LoggingProviderFactory } from "~/infrastructure/internal/logger/LoggingProviderFactory";
import { SchemeOfWorkDeleteRequestType } from "../types/SchemeOfWorkTypes";

@autoInjectable()
export default class SchemeOfWorkDeleteService extends BaseService<SchemeOfWorkDeleteRequestType> {
  static serviceName = "SchemeOfWorkDeleteService";
  private schemeOfWorkDeleteProvider: SchemeOfWorkDeleteProvider;
  loggingProvider: ILoggingDriver;

  constructor(schemeOfWorkDeleteProvider: SchemeOfWorkDeleteProvider) {
    super(SchemeOfWorkDeleteService.serviceName);
    this.schemeOfWorkDeleteProvider = schemeOfWorkDeleteProvider;
    this.loggingProvider = LoggingProviderFactory.build();
  }

  public async execute(trace: ServiceTrace, args: SchemeOfWorkDeleteRequestType): Promise<IResult> {
    try {
      this.initializeServiceTrace(trace, args);
      const schemeOfWork = await this.schemeOfWorkDeleteProvider.delete(args);
      trace.setSuccessful();

      this.result.setData(SUCCESS, HttpStatusCodeEnum.SUCCESS, RESOURCE_RECORD_DELETED_SUCCESSFULLY("SchemeOfWork"), schemeOfWork);
      return this.result;
    } catch (error: any) {
      this.loggingProvider.error(error);
      this.result.setError(ERROR, error.httpStatusCode, error.description);
      return this.result;
    }
  }
}
