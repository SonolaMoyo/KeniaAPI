import { CRITICAL_ERROR_EXITING, ERROR } from "~/api/shared/helpers/messages/SystemMessages";
import ApplicationError from "./ApplicationError";
import { Response } from "express";
import { HttpStatusCodeEnum } from "~/api/shared/helpers/enums/HttpStatusCode.enum";

// https://www.codeconcisely.com/posts/how-to-handle-errors-in-express-with-typescript/
class ErrorHandler {
  public handleError(error: Error | ApplicationError, response?: Response): void {
    if (this.isTrustedError(error) && response) {
      this.handleTrustedError(error as ApplicationError, response);
    } else {
      this.handleCriticalError(error, response);
    }
  }

  private isTrustedError(error: Error) {
    if (error instanceof ApplicationError) {
      return !!error.isOperational;
    }
  }

  private handleTrustedError(error: ApplicationError, response: Response): void {
    response.status(error.httpStatusCode).json({
      statusCode: error.httpStatusCode,
      status: ERROR,
      message: error.message,
    });
  }
  private handleCriticalError(error: Error | ApplicationError, response?: Response): void {
    try {
      response?.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
        status: ERROR,
        message: CRITICAL_ERROR_EXITING,
      });
    } catch (error) {
      console.log("Critical: Error in Error handling", error);
    }
  }
}
export const errorHandler = new ErrorHandler();
