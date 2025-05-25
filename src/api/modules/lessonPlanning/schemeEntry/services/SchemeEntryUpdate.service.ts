import { autoInjectable } from "tsyringe";
import { BaseService } from "../../../base/services/Base.service";
import { IResult } from "~/api/shared/helpers/results/IResult";
import { ServiceTrace } from "~/api/shared/helpers/trace/ServiceTrace";
import SchemeEntryUpdateProvider from "../providers/SchemeEntryUpdate.provider";
import { SUCCESS, SCHEME_ENTRY_RESOURCE, ERROR } from "~/api/shared/helpers/messages/SystemMessages";
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum";
import { RESOURCE_RECORD_UPDATED_SUCCESSFULLY } from "~/api/shared/helpers/messages/SystemMessagesFunction";
import { ILoggingDriver } from "~/infrastructure/internal/logger/ILoggingDriver";
import { LoggingProviderFactory } from "~/infrastructure/internal/logger/LoggingProviderFactory";
import { SchemeEntryUpdateRequestType } from "../types/SchemeEntryTypes";

@autoInjectable()
export default class SchemeEntryUpdateService extends BaseService<SchemeEntryUpdateRequestType> {
  static serviceName = "SchemeEntryUpdateService";
  private schemeEntryUpdateProvider: SchemeEntryUpdateProvider;
  loggingProvider: ILoggingDriver;

  constructor(schemeEntryUpdateProvider: SchemeEntryUpdateProvider) {
    super(SchemeEntryUpdateService.serviceName);
    this.schemeEntryUpdateProvider = schemeEntryUpdateProvider;
    this.loggingProvider = LoggingProviderFactory.build();
  }

  public async execute(trace: ServiceTrace, args: SchemeEntryUpdateRequestType): Promise<IResult> {
    try {
      this.initializeServiceTrace(trace, args);
      const schemeEntry = await this.schemeEntryUpdateProvider.update({ ...args, id: Number(args.id) });
      trace.setSuccessful();

      this.result.setData(SUCCESS, HttpStatusCodeEnum.SUCCESS, RESOURCE_RECORD_UPDATED_SUCCESSFULLY(SCHEME_ENTRY_RESOURCE), schemeEntry);
      return this.result;
    } catch (error: any) {
      this.loggingProvider.error(error);
      this.result.setError(ERROR, error.httpStatusCode, error.description);
      return this.result;
    }
  }
}
