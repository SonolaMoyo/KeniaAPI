import { autoInjectable } from "tsyringe";
import { BaseService } from "../../../base/services/Base.service";
import { IResult } from "~/api/shared/helpers/results/IResult";
import { ServiceTrace } from "~/api/shared/helpers/trace/ServiceTrace";
import SchemeEntryAssignmentUpdateProvider from "../providers/SchemeEntryAssignmentUpdate.provider";
import { SUCCESS, SCHEME_ENTRY_ASSIGNMENT_RESOURCE, ERROR } from "~/api/shared/helpers/messages/SystemMessages";
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum";
import { RESOURCE_RECORD_UPDATED_SUCCESSFULLY } from "~/api/shared/helpers/messages/SystemMessagesFunction";
import { ILoggingDriver } from "~/infrastructure/internal/logger/ILoggingDriver";
import { LoggingProviderFactory } from "~/infrastructure/internal/logger/LoggingProviderFactory";
import { SchemeEntryAssignmentUpdateRequestType } from "../types/SchemeEntryAssignmentTypes";

@autoInjectable()
export default class SchemeEntryAssignmentUpdateService extends BaseService<SchemeEntryAssignmentUpdateRequestType> {
  static serviceName = "SchemeEntryAssignmentUpdateService";
  private schemeEntryAssignmentUpdateProvider: SchemeEntryAssignmentUpdateProvider;
  loggingProvider: ILoggingDriver;

  constructor(schemeEntryAssignmentUpdateProvider: SchemeEntryAssignmentUpdateProvider) {
    super(SchemeEntryAssignmentUpdateService.serviceName);
    this.schemeEntryAssignmentUpdateProvider = schemeEntryAssignmentUpdateProvider;
    this.loggingProvider = LoggingProviderFactory.build();
  }

  public async execute(trace: ServiceTrace, args: SchemeEntryAssignmentUpdateRequestType): Promise<IResult> {
    try {
      this.initializeServiceTrace(trace, args);
      const schemeEntryAssignment = await this.schemeEntryAssignmentUpdateProvider.update({ ...args, id: Number(args.id) });
      trace.setSuccessful();

      this.result.setData(SUCCESS, HttpStatusCodeEnum.SUCCESS, RESOURCE_RECORD_UPDATED_SUCCESSFULLY(SCHEME_ENTRY_ASSIGNMENT_RESOURCE), schemeEntryAssignment);
      return this.result;
    } catch (error: any) {
      this.loggingProvider.error(error);
      this.result.setError(ERROR, error.httpStatusCode, error.description);
      return this.result;
    }
  }
}
