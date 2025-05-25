import { autoInjectable } from "tsyringe";
import { BaseService } from "../../../base/services/Base.service";
import { IResult } from "~/api/shared/helpers/results/IResult";
import { ServiceTrace } from "~/api/shared/helpers/trace/ServiceTrace";
import SchemeOfWorkUpdateProvider from "../providers/SchemeOfWorkUpdate.provider";
import { SUCCESS, ERROR } from "~/api/shared/helpers/messages/SystemMessages";
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum";
import { RESOURCE_RECORD_UPDATED_SUCCESSFULLY } from "~/api/shared/helpers/messages/SystemMessagesFunction";
import { ILoggingDriver } from "~/infrastructure/internal/logger/ILoggingDriver";
import { LoggingProviderFactory } from "~/infrastructure/internal/logger/LoggingProviderFactory";
import { SchemeOfWorkUpdateRequestType } from "../types/SchemeOfWorkTypes";

@autoInjectable()
export default class SchemeOfWorkUpdateService extends BaseService<SchemeOfWorkUpdateRequestType> {
  static serviceName = "SchemeOfWorkUpdateService";
  private schemeOfWorkUpdateProvider: SchemeOfWorkUpdateProvider;
  loggingProvider: ILoggingDriver;

  constructor(schemeOfWorkUpdateProvider: SchemeOfWorkUpdateProvider) {
    super(SchemeOfWorkUpdateService.serviceName);
    this.schemeOfWorkUpdateProvider = schemeOfWorkUpdateProvider;
    this.loggingProvider = LoggingProviderFactory.build();
  }

  public async execute(trace: ServiceTrace, args: SchemeOfWorkUpdateRequestType): Promise<IResult> {
    try {
      this.initializeServiceTrace(trace, args);
      const schemeOfWork = await this.schemeOfWorkUpdateProvider.update({ ...args, id: Number(args.id) });
      trace.setSuccessful();

      this.result.setData(SUCCESS, HttpStatusCodeEnum.SUCCESS, RESOURCE_RECORD_UPDATED_SUCCESSFULLY("SchemeOfWork"), schemeOfWork);
      return this.result;
    } catch (error: any) {
      this.loggingProvider.error(error);
      this.result.setError(ERROR, error.httpStatusCode, error.description);
      return this.result;
    }
  }
}
