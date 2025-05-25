import { IRequest } from "~/infrastructure/internal/types";
import { autoInjectable } from "tsyringe";
import { BaseService } from "../../../base/services/Base.service";
import { IResult } from "~/api/shared/helpers/results/IResult";
import { ServiceTrace } from "~/api/shared/helpers/trace/ServiceTrace";
import SchemeEntryContentReadProvider from "../providers/SchemeEntryContentRead.provider";
import { ILoggingDriver } from "~/infrastructure/internal/logger/ILoggingDriver";
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum";
import { BadRequestError } from "~/infrastructure/internal/exceptions/BadRequestError";
import { LoggingProviderFactory } from "~/infrastructure/internal/logger/LoggingProviderFactory";
import { SUCCESS, SCHEME_ENTRY_CONTENT_RESOURCE, ERROR } from "~/api/shared/helpers/messages/SystemMessages";
import { RESOURCE_FETCHED_SUCCESSFULLY, RESOURCE_RECORD_NOT_FOUND } from "~/api/shared/helpers/messages/SystemMessagesFunction";
import { SchemeEntryContentCriteriaType, SchemeEntryContentReadRequestType } from "../types/SchemeEntryContentTypes";

@autoInjectable()
export default class SchemeEntryContentReadService extends BaseService<SchemeEntryContentReadRequestType> {
  static serviceName = "SchemeEntryContentReadService";
  private schemeEntryContentReadProvider: SchemeEntryContentReadProvider;
  loggingProvider: ILoggingDriver;

  constructor(schemeEntryContentReadProvider: SchemeEntryContentReadProvider) {
    super(SchemeEntryContentReadService.serviceName);
    this.schemeEntryContentReadProvider = schemeEntryContentReadProvider;
    this.loggingProvider = LoggingProviderFactory.build();
  }

  public async execute(trace: ServiceTrace, args: SchemeEntryContentReadRequestType): Promise<IResult> {
    try {
      this.initializeServiceTrace(trace, args);
      const schemeEntryContents = await this.schemeEntryContentReadProvider.getByCriteria(args);
      trace.setSuccessful();

      this.result.setData(SUCCESS, HttpStatusCodeEnum.SUCCESS, RESOURCE_FETCHED_SUCCESSFULLY(SCHEME_ENTRY_CONTENT_RESOURCE), schemeEntryContents);
      return this.result;
    } catch (error: any) {
      this.loggingProvider.error(error);
      this.result.setError(ERROR, error.httpStatusCode, error.description);
      return this.result;
    }
  }

  public async readOne(trace: ServiceTrace, args: SchemeEntryContentCriteriaType): Promise<IResult> {
    try {
      this.initializeServiceTrace(trace, args);
      const schemeEntryContent = await this.schemeEntryContentReadProvider.getOneByCriteria({ ...args, id: Number(args.id) });

      if (!schemeEntryContent) {
        throw new BadRequestError(RESOURCE_RECORD_NOT_FOUND(SCHEME_ENTRY_CONTENT_RESOURCE), HttpStatusCodeEnum.NOT_FOUND);
      }

      trace.setSuccessful();

      this.result.setData(SUCCESS, HttpStatusCodeEnum.SUCCESS, RESOURCE_FETCHED_SUCCESSFULLY(SCHEME_ENTRY_CONTENT_RESOURCE), schemeEntryContent);
      return this.result;
    } catch (error: any) {
      this.loggingProvider.error(error);
      this.result.setError(ERROR, error.httpStatusCode, error.description);
      return this.result;
    }
  }
}
