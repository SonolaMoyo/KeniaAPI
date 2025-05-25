import { autoInjectable } from "tsyringe";
import { BaseService } from "../../../base/services/Base.service";
import { IResult } from "~/api/shared/helpers/results/IResult";
import { ServiceTrace } from "~/api/shared/helpers/trace/ServiceTrace";
import { schemeEntryContentCreateSchema } from "../validators/SchemeEntryContentCreateSchema";
import SchemeEntryContentCreateProvider from "../providers/SchemeEntryContentCreate.provider";
import { SUCCESS, SCHEME_ENTRY_CONTENT_RESOURCE, ERROR } from "~/api/shared/helpers/messages/SystemMessages";
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum";
import { RESOURCE_RECORD_CREATED_SUCCESSFULLY } from "~/api/shared/helpers/messages/SystemMessagesFunction";
import { ILoggingDriver } from "~/infrastructure/internal/logger/ILoggingDriver";
import { LoggingProviderFactory } from "~/infrastructure/internal/logger/LoggingProviderFactory";
import { SchemeEntryContentCreateRequestType } from "../types/SchemeEntryContentTypes";

@autoInjectable()
export default class SchemeEntryContentCreateService extends BaseService<SchemeEntryContentCreateRequestType> {
  static serviceName = "SchemeEntryContentCreateService";
  private schemeEntryContentCreateProvider: SchemeEntryContentCreateProvider;
  loggingProvider: ILoggingDriver;

  constructor(schemeEntryContentCreateProvider: SchemeEntryContentCreateProvider) {
    super(SchemeEntryContentCreateService.serviceName);
    this.schemeEntryContentCreateProvider = schemeEntryContentCreateProvider;
    this.loggingProvider = LoggingProviderFactory.build();
  }

  public async execute(trace: ServiceTrace, args: SchemeEntryContentCreateRequestType): Promise<IResult> {
    try {
      this.initializeServiceTrace(trace, args);

      const schemeEntryContent = await this.schemeEntryContentCreateProvider.create({ ...args });
      trace.setSuccessful();

      this.result.setData(SUCCESS, HttpStatusCodeEnum.CREATED, RESOURCE_RECORD_CREATED_SUCCESSFULLY(SCHEME_ENTRY_CONTENT_RESOURCE), schemeEntryContent);
      return this.result;
    } catch (error: any) {
      this.loggingProvider.error(error);
      this.result.setError(ERROR, error.httpStatusCode, error.description);
      return this.result;
    }
  }
}
