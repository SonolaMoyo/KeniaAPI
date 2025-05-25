import { autoInjectable } from "tsyringe";
import { BaseService } from "../../../base/services/Base.service";
import { IResult } from "~/api/shared/helpers/results/IResult";
import { ServiceTrace } from "~/api/shared/helpers/trace/ServiceTrace";
import SchemeEntryContentUpdateProvider from "../providers/SchemeEntryContentUpdate.provider";
import { SUCCESS, SCHEME_ENTRY_CONTENT_RESOURCE, ERROR } from "~/api/shared/helpers/messages/SystemMessages";
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum";
import { RESOURCE_RECORD_UPDATED_SUCCESSFULLY } from "~/api/shared/helpers/messages/SystemMessagesFunction";
import { ILoggingDriver } from "~/infrastructure/internal/logger/ILoggingDriver";
import { LoggingProviderFactory } from "~/infrastructure/internal/logger/LoggingProviderFactory";
import { IRequest } from "~/infrastructure/internal/types";
import { SchemeEntryContentUpdateRequestType } from "../types/SchemeEntryContentTypes";

@autoInjectable()
export default class SchemeEntryContentUpdateService extends BaseService<SchemeEntryContentUpdateRequestType> {
  static serviceName = "SchemeEntryContentUpdateService";
  private schemeEntryContentUpdateProvider: SchemeEntryContentUpdateProvider;
  loggingProvider: ILoggingDriver;

  constructor(schemeEntryContentUpdateProvider: SchemeEntryContentUpdateProvider) {
    super(SchemeEntryContentUpdateService.serviceName);
    this.schemeEntryContentUpdateProvider = schemeEntryContentUpdateProvider;
    this.loggingProvider = LoggingProviderFactory.build();
  }

  public async execute(trace: ServiceTrace, args: SchemeEntryContentUpdateRequestType): Promise<IResult> {
    try {
      this.initializeServiceTrace(trace, args);
      const schemeEntryContent = await this.schemeEntryContentUpdateProvider.update({ ...args, id: Number(args.id) });
      trace.setSuccessful();

      this.result.setData(SUCCESS, HttpStatusCodeEnum.SUCCESS, RESOURCE_RECORD_UPDATED_SUCCESSFULLY(SCHEME_ENTRY_CONTENT_RESOURCE), schemeEntryContent);
      return this.result;
    } catch (error: any) {
      this.loggingProvider.error(error);
      this.result.setError(ERROR, error.httpStatusCode, error.description);
      return this.result;
    }
  }
}
