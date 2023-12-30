import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import {Response} from "express";

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = this.toStatusCode(exception);
    const payload = this.toResponsePayload(exception, status);

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      console.error(exception);
    }
    return response.status(status).json(payload);
  }

  private toStatusCode(exception: any): number {
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private toMessage(exception: any, status: number): string {
    return status < HttpStatus.INTERNAL_SERVER_ERROR
      ? exception.message
      : "Internal Server Error";
  }

  private toName(exception: any, status: number): string {
    return status < HttpStatus.INTERNAL_SERVER_ERROR
      ? exception.name
      : "InternalServerError";
  }

  private toResponsePayload(
    exception: any,
    status: number,
  ): Record<string, unknown> {
    return {
      message: this.toMessage(exception, status),
      error: this.toName(exception, status),
    };
  }
}
