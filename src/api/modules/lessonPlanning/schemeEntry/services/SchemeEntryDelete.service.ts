import { autoInjectable } from "tsyringe";
import { BaseService } from "../../../base/services/Base.service";
import { IResult } from "~/api/shared/helpers/results/IResult";
import { ServiceTrace } from "~/api/shared/helpers/trace/ServiceTrace";
import SchemeEntryDeleteProvider from "../providers/SchemeEntryDelete.provider";
import { SUCCESS, SCHEME_ENTRY_RESOURCE, ERROR } from "~/api/shared/helpers/messages/SystemMessages";
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum";
import { RESOURCE_RECORD_DELETED_SUCCESSFULLY } from "~/api/shared/helpers/messages/SystemMessagesFunction";
import { ILoggingDriver } from "~/infrastructure/internal/logger/ILoggingDriver";
import { LoggingProviderFactory } from "~/infrastructure/internal/logger/LoggingProviderFactory";
import { SchemeEntryDeleteRequestType } from "../types/SchemeEntryTypes";

@autoInjectable()
export default class SchemeEntryDeleteService extends BaseService<SchemeEntryDeleteRequestType> {
  static serviceName = "SchemeEntryDeleteService";
  private schemeEntryDeleteProvider: SchemeEntryDeleteProvider;
  loggingProvider: ILoggingDriver;

  constructor(schemeEntryDeleteProvider: SchemeEntryDeleteProvider) {
    super(SchemeEntryDeleteService.serviceName);
    this.schemeEntryDeleteProvider = schemeEntryDeleteProvider;
    this.loggingProvider = LoggingProviderFactory.build();
  }

  public async execute(trace: ServiceTrace, args: SchemeEntryDeleteRequestType): Promise<IResult> {
    try {
      this.initializeServiceTrace(trace, args);

      const schemeEntry = await this.schemeEntryDeleteProvider.delete(args);
      trace.setSuccessful();

      this.result.setData(SUCCESS, HttpStatusCodeEnum.SUCCESS, RESOURCE_RECORD_DELETED_SUCCESSFULLY(SCHEME_ENTRY_RESOURCE), schemeEntry);
      return this.result;
    } catch (error: any) {
      this.loggingProvider.error(error);
      this.result.setError(ERROR, error.httpStatusCode, error.description);
      return this.result;
    }
  }
}
