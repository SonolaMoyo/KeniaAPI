import { autoInjectable } from "tsyringe";
import { BaseService } from "../../../base/services/Base.service";
import { IResult } from "~/api/shared/helpers/results/IResult";
import { ServiceTrace } from "~/api/shared/helpers/trace/ServiceTrace";
import SchemeEntryContentDeleteProvider from "../providers/SchemeEntryContentDelete.provider";
import { SUCCESS, SCHEME_ENTRY_CONTENT_RESOURCE, ERROR } from "~/api/shared/helpers/messages/SystemMessages";
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum";
import { RESOURCE_RECORD_DELETED_SUCCESSFULLY } from "~/api/shared/helpers/messages/SystemMessagesFunction";
import { ILoggingDriver } from "~/infrastructure/internal/logger/ILoggingDriver";
import { LoggingProviderFactory } from "~/infrastructure/internal/logger/LoggingProviderFactory";
import { SchemeEntryContentDeleteRequestType } from "../types/SchemeEntryContentTypes";

@autoInjectable()
export default class SchemeEntryContentDeleteService extends BaseService<SchemeEntryContentDeleteRequestType> {
  static serviceName = "SchemeEntryContentDeleteService";
  private schemeEntryContentDeleteProvider: SchemeEntryContentDeleteProvider;
  loggingProvider: ILoggingDriver;

  constructor(schemeEntryContentDeleteProvider: SchemeEntryContentDeleteProvider) {
    super(SchemeEntryContentDeleteService.serviceName);
    this.schemeEntryContentDeleteProvider = schemeEntryContentDeleteProvider;
    this.loggingProvider = LoggingProviderFactory.build();
  }

  public async execute(trace: ServiceTrace, args: SchemeEntryContentDeleteRequestType): Promise<IResult> {
    try {
      this.initializeServiceTrace(trace, args);
      const schemeEntryContent = await this.schemeEntryContentDeleteProvider.delete(args);
      trace.setSuccessful();

      this.result.setData(SUCCESS, HttpStatusCodeEnum.SUCCESS, RESOURCE_RECORD_DELETED_SUCCESSFULLY(SCHEME_ENTRY_CONTENT_RESOURCE), schemeEntryContent);
      return this.result;
    } catch (error: any) {
      this.loggingProvider.error(error);
      this.result.setError(ERROR, error.httpStatusCode, error.description);
      return this.result;
    }
  }
}
