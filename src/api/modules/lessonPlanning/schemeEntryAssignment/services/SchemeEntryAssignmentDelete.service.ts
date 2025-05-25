import { autoInjectable } from "tsyringe";
import { BaseService } from "../../../base/services/Base.service";
import { IResult } from "~/api/shared/helpers/results/IResult";
import { ServiceTrace } from "~/api/shared/helpers/trace/ServiceTrace";
import SchemeEntryAssignmentDeleteProvider from "../providers/SchemeEntryAssignmentDelete.provider";
import { SUCCESS, SCHEME_ENTRY_ASSIGNMENT_RESOURCE, ERROR } from "~/api/shared/helpers/messages/SystemMessages";
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum";
import { RESOURCE_RECORD_DELETED_SUCCESSFULLY } from "~/api/shared/helpers/messages/SystemMessagesFunction";
import { ILoggingDriver } from "~/infrastructure/internal/logger/ILoggingDriver";
import { LoggingProviderFactory } from "~/infrastructure/internal/logger/LoggingProviderFactory";
import { SchemeEntryAssignmentDeleteRequestType } from "../types/SchemeEntryAssignmentTypes";

@autoInjectable()
export default class SchemeEntryAssignmentDeleteService extends BaseService<SchemeEntryAssignmentDeleteRequestType> {
  static serviceName = "SchemeEntryAssignmentDeleteService";
  private schemeEntryAssignmentDeleteProvider: SchemeEntryAssignmentDeleteProvider;
  loggingProvider: ILoggingDriver;

  constructor(schemeEntryAssignmentDeleteProvider: SchemeEntryAssignmentDeleteProvider) {
    super(SchemeEntryAssignmentDeleteService.serviceName);
    this.schemeEntryAssignmentDeleteProvider = schemeEntryAssignmentDeleteProvider;
    this.loggingProvider = LoggingProviderFactory.build();
  }

  public async execute(trace: ServiceTrace, args: SchemeEntryAssignmentDeleteRequestType): Promise<IResult> {
    try {
      this.initializeServiceTrace(trace, args);
      const schemeEntryAssignment = await this.schemeEntryAssignmentDeleteProvider.delete(args);
      trace.setSuccessful();

      this.result.setData(SUCCESS, HttpStatusCodeEnum.SUCCESS, RESOURCE_RECORD_DELETED_SUCCESSFULLY(SCHEME_ENTRY_ASSIGNMENT_RESOURCE), schemeEntryAssignment);
      return this.result;
    } catch (error: any) {
      this.loggingProvider.error(error);
      this.result.setError(ERROR, error.httpStatusCode, error.description);
      return this.result;
    }
  }
}
