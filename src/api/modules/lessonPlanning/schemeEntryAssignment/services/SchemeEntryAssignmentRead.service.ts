import { IRequest } from "~/infrastructure/internal/types";
import { autoInjectable } from "tsyringe";
import { BaseService } from "../../../base/services/Base.service";
import { IResult } from "~/api/shared/helpers/results/IResult";
import { ServiceTrace } from "~/api/shared/helpers/trace/ServiceTrace";
import SchemeEntryAssignmentReadProvider from "../providers/SchemeEntryAssignmentRead.provider";
import { ILoggingDriver } from "~/infrastructure/internal/logger/ILoggingDriver";
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum";
import { BadRequestError } from "~/infrastructure/internal/exceptions/BadRequestError";
import { LoggingProviderFactory } from "~/infrastructure/internal/logger/LoggingProviderFactory";
import { SUCCESS, SCHEME_ENTRY_ASSIGNMENT_RESOURCE, ERROR } from "~/api/shared/helpers/messages/SystemMessages";
import { RESOURCE_FETCHED_SUCCESSFULLY, RESOURCE_RECORD_NOT_FOUND } from "~/api/shared/helpers/messages/SystemMessagesFunction";
import { SchemeEntryAssignmentReadRequestType } from "../types/SchemeEntryAssignmentTypes";

@autoInjectable()
export default class SchemeEntryAssignmentReadService extends BaseService<SchemeEntryAssignmentReadRequestType> {
  static serviceName = "SchemeEntryAssignmentReadService";
  private schemeEntryAssignmentReadProvider: SchemeEntryAssignmentReadProvider;
  loggingProvider: ILoggingDriver;

  constructor(schemeEntryAssignmentReadProvider: SchemeEntryAssignmentReadProvider) {
    super(SchemeEntryAssignmentReadService.serviceName);
    this.schemeEntryAssignmentReadProvider = schemeEntryAssignmentReadProvider;
    this.loggingProvider = LoggingProviderFactory.build();
  }

  public async execute(trace: ServiceTrace, args: SchemeEntryAssignmentReadRequestType): Promise<IResult> {
    try {
      this.initializeServiceTrace(trace, args);
      const schemeEntryAssignments = await this.schemeEntryAssignmentReadProvider.getByCriteria(args);
      trace.setSuccessful();

      this.result.setData(SUCCESS, HttpStatusCodeEnum.SUCCESS, RESOURCE_FETCHED_SUCCESSFULLY(SCHEME_ENTRY_ASSIGNMENT_RESOURCE), schemeEntryAssignments);
      return this.result;
    } catch (error: any) {
      this.loggingProvider.error(error);
      this.result.setError(ERROR, error.httpStatusCode, error.description);
      return this.result;
    }
  }

  public async readOne(trace: ServiceTrace, args: SchemeEntryAssignmentReadRequestType): Promise<IResult> {
    try {
      this.initializeServiceTrace(trace, args);
      const schemeEntryAssignment = await this.schemeEntryAssignmentReadProvider.getOneByCriteria({ ...args, id: Number(args.id) });

      if (!schemeEntryAssignment) {
        throw new BadRequestError(RESOURCE_RECORD_NOT_FOUND(SCHEME_ENTRY_ASSIGNMENT_RESOURCE), HttpStatusCodeEnum.NOT_FOUND);
      }

      trace.setSuccessful();

      this.result.setData(SUCCESS, HttpStatusCodeEnum.SUCCESS, RESOURCE_FETCHED_SUCCESSFULLY(SCHEME_ENTRY_ASSIGNMENT_RESOURCE), schemeEntryAssignment);
      return this.result;
    } catch (error: any) {
      this.loggingProvider.error(error);
      this.result.setError(ERROR, error.httpStatusCode, error.description);
      return this.result;
    }
  }
}
