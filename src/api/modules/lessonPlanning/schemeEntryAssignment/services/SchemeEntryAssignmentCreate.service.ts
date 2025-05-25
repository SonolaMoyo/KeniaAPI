import { autoInjectable } from "tsyringe";
import { BaseService } from "../../../base/services/Base.service";
import { IResult } from "~/api/shared/helpers/results/IResult";
import { ServiceTrace } from "~/api/shared/helpers/trace/ServiceTrace";
import { schemeEntryAssignmentCreateSchema } from "../validators/SchemeEntryAssignmentCreateSchema";
import SchemeEntryAssignmentCreateProvider from "../providers/SchemeEntryAssignmentCreate.provider";
import { SUCCESS, SCHEME_ENTRY_ASSIGNMENT_RESOURCE, ERROR } from "~/api/shared/helpers/messages/SystemMessages";
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum";
import { RESOURCE_RECORD_CREATED_SUCCESSFULLY } from "~/api/shared/helpers/messages/SystemMessagesFunction";
import { ILoggingDriver } from "~/infrastructure/internal/logger/ILoggingDriver";
import { LoggingProviderFactory } from "~/infrastructure/internal/logger/LoggingProviderFactory";
import { IRequest } from "~/infrastructure/internal/types";
import { SchemeEntryAssignmentCreateRequestType } from "../types/SchemeEntryAssignmentTypes";

@autoInjectable()
export default class SchemeEntryAssignmentCreateService extends BaseService<SchemeEntryAssignmentCreateRequestType> {
  static serviceName = "SchemeEntryAssignmentCreateService";
  private schemeEntryAssignmentCreateProvider: SchemeEntryAssignmentCreateProvider;
  loggingProvider: ILoggingDriver;

  constructor(schemeEntryAssignmentCreateProvider: SchemeEntryAssignmentCreateProvider) {
    super(SchemeEntryAssignmentCreateService.serviceName);
    this.schemeEntryAssignmentCreateProvider = schemeEntryAssignmentCreateProvider;
    this.loggingProvider = LoggingProviderFactory.build();
  }

  public async execute(trace: ServiceTrace, args: SchemeEntryAssignmentCreateRequestType): Promise<IResult> {
    try {
      this.initializeServiceTrace(trace, args);

      const schemeEntryAssignment = await this.schemeEntryAssignmentCreateProvider.create({ ...args });
      trace.setSuccessful();

      this.result.setData(SUCCESS, HttpStatusCodeEnum.CREATED, RESOURCE_RECORD_CREATED_SUCCESSFULLY(SCHEME_ENTRY_ASSIGNMENT_RESOURCE), schemeEntryAssignment);
      return this.result;
    } catch (error: any) {
      this.loggingProvider.error(error);
      this.result.setError(ERROR, error.httpStatusCode, error.description);
      return this.result;
    }
  }
}
