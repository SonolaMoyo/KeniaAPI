import { Request, Response, NextFunction } from "express"
import { TypeParser } from "~/utils/TypeParser"
import { IRequest, Middleware } from "~/infrastructure/internal/types"
import { DefaultValue } from "~/utils/DefaultValue"
import { HttpHeaderEnum } from "~/api/shared/helpers/enums/HttpHeader.enum"

class ClientInfoMiddleware {
  handle: Middleware = (
    req: Request,
    _res: Response,
    next: NextFunction
  ): void => {
    TypeParser.cast<IRequest>(req).ipAddress = DefaultValue.evaluateAndGet(
      req.ip,
      req.headers[HttpHeaderEnum.FORWARDED_FOR] as string
    )
    TypeParser.cast<IRequest>(req).userAgent = req.headers[
      HttpHeaderEnum.USER_AGENT
    ] as string
    TypeParser.cast<IRequest>(req).origin = (req.headers[
      HttpHeaderEnum.ORIGIN
    ] || req.headers[HttpHeaderEnum.REFERRER]) as string

    return next()
  }
}

export default new ClientInfoMiddleware()
