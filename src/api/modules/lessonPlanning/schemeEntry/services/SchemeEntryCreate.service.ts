import { autoInjectable } from "tsyringe";
import { BaseService } from "../../../base/services/Base.service";
import { IResult } from "~/api/shared/helpers/results/IResult";
import { ServiceTrace } from "~/api/shared/helpers/trace/ServiceTrace";
import { schemeEntryCreateSchema } from "../validators/SchemeEntryCreateSchema";
import SchemeEntryCreateProvider from "../providers/SchemeEntryCreate.provider";
import { SUCCESS, SCHEME_ENTRY_RESOURCE, ERROR } from "~/api/shared/helpers/messages/SystemMessages";
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum";
import { RESOURCE_RECORD_CREATED_SUCCESSFULLY } from "~/api/shared/helpers/messages/SystemMessagesFunction";
import { ILoggingDriver } from "~/infrastructure/internal/logger/ILoggingDriver";
import { LoggingProviderFactory } from "~/infrastructure/internal/logger/LoggingProviderFactory";
import { SchemeEntryCreateRequestType } from "../types/SchemeEntryTypes";

@autoInjectable()
export default class SchemeEntryCreateService extends BaseService<SchemeEntryCreateRequestType> {
  static serviceName = "SchemeEntryCreateService";
  private schemeEntryCreateProvider: SchemeEntryCreateProvider;
  loggingProvider: ILoggingDriver;

  constructor(schemeEntryCreateProvider: SchemeEntryCreateProvider) {
    super(SchemeEntryCreateService.serviceName);
    this.schemeEntryCreateProvider = schemeEntryCreateProvider;
    this.loggingProvider = LoggingProviderFactory.build();
  }

  public async execute(trace: ServiceTrace, args: SchemeEntryCreateRequestType): Promise<IResult> {
    try {
      this.initializeServiceTrace(trace, args);

      const schemeEntry = await this.schemeEntryCreateProvider.create({ ...args });
      trace.setSuccessful();

      this.result.setData(SUCCESS, HttpStatusCodeEnum.CREATED, RESOURCE_RECORD_CREATED_SUCCESSFULLY(SCHEME_ENTRY_RESOURCE), schemeEntry);
      return this.result;
    } catch (error: any) {
      this.loggingProvider.error(error);
      this.result.setError(ERROR, error.httpStatusCode, error.description);
      return this.result;
    }
  }
}
