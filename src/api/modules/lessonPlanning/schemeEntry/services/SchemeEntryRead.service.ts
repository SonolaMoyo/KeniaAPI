import { IRequest } from "~/infrastructure/internal/types";
import { autoInjectable } from "tsyringe";
import { BaseService } from "../../../base/services/Base.service";
import { IResult } from "~/api/shared/helpers/results/IResult";
import { ServiceTrace } from "~/api/shared/helpers/trace/ServiceTrace";
import SchemeEntryReadProvider from "../providers/SchemeEntryRead.provider";
import { ILoggingDriver } from "~/infrastructure/internal/logger/ILoggingDriver";
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum";
import { BadRequestError } from "~/infrastructure/internal/exceptions/BadRequestError";
import { LoggingProviderFactory } from "~/infrastructure/internal/logger/LoggingProviderFactory";
import { SUCCESS, SCHEME_ENTRY_RESOURCE, ERROR } from "~/api/shared/helpers/messages/SystemMessages";
import { RESOURCE_FETCHED_SUCCESSFULLY, RESOURCE_RECORD_NOT_FOUND } from "~/api/shared/helpers/messages/SystemMessagesFunction";
import { SchemeEntryCriteriaType } from "../types/SchemeEntryTypes";

@autoInjectable()
export default class SchemeEntryReadService extends BaseService<SchemeEntryCriteriaType> {
  static serviceName = "SchemeEntryReadService";
  private schemeEntryReadProvider: SchemeEntryReadProvider;
  loggingProvider: ILoggingDriver;

  constructor(schemeEntryReadProvider: SchemeEntryReadProvider) {
    super(SchemeEntryReadService.serviceName);
    this.schemeEntryReadProvider = schemeEntryReadProvider;
    this.loggingProvider = LoggingProviderFactory.build();
  }

  public async execute(trace: ServiceTrace, args: SchemeEntryCriteriaType): Promise<IResult> {
    try {
      this.initializeServiceTrace(trace, args);
      const schemeEntries = await this.schemeEntryReadProvider.getByCriteria(args);
      trace.setSuccessful();

      this.result.setData(SUCCESS, HttpStatusCodeEnum.SUCCESS, RESOURCE_FETCHED_SUCCESSFULLY(SCHEME_ENTRY_RESOURCE), schemeEntries);
      return this.result;
    } catch (error: any) {
      this.loggingProvider.error(error);
      this.result.setError(ERROR, error.httpStatusCode, error.description);
      return this.result;
    }
  }

  public async readOne(trace: ServiceTrace, args: SchemeEntryCriteriaType): Promise<IResult> {
    try {
      this.initializeServiceTrace(trace, args);
      const schemeEntry = await this.schemeEntryReadProvider.getOneByCriteria({ ...args, id: Number(args.id) });

      if (!schemeEntry) {
        throw new BadRequestError(RESOURCE_RECORD_NOT_FOUND(SCHEME_ENTRY_RESOURCE), HttpStatusCodeEnum.NOT_FOUND);
      }

      trace.setSuccessful();

      this.result.setData(SUCCESS, HttpStatusCodeEnum.SUCCESS, RESOURCE_FETCHED_SUCCESSFULLY(SCHEME_ENTRY_RESOURCE), schemeEntry);
      return this.result;
    } catch (error: any) {
      this.loggingProvider.error(error);
      this.result.setError(ERROR, error.httpStatusCode, error.description);
      return this.result;
    }
  }
}
