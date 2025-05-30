import { TypeParser } from "~/utils/TypeParser";
import ServerConfig from "~/config/ServerConfig";
import { BooleanUtil } from "~/utils/BooleanUtil";
import { ROUTE_WHITE_LIST } from "~/config/RoutesConfig";
import { Request, Response, NextFunction } from "express";
import { Middleware, IRequest } from "~/infrastructure/internal/types";

const root = ServerConfig.Server.Root;

class RouteWhiteListMiddleware {
  public handle: Middleware = (req: Request, _res: Response, next: NextFunction): void => {
    TypeParser.cast<IRequest>(req).isWhiteList = false;
    TypeParser.cast<IRequest>(req).isProtected = false;

    const isDynamicPath = ROUTE_WHITE_LIST.some(() => {
      // TODO: Refactor to parse dynamic routes
      // Match root, auth/password-reset, and capture a combination of alphanumeric characters
      const dynamicRegex = new RegExp(`${root}/auth/password-reset/([a-zA-Z0-9])`);
      return dynamicRegex.test(req.path);
    });

    const existsUnauthorizedPath = ROUTE_WHITE_LIST.some((path) => BooleanUtil.areEqual(path, req.path));

    if (existsUnauthorizedPath || isDynamicPath) {
      TypeParser.cast<IRequest>(req).isWhiteList = true;
    }

    // TypeParser.cast<IRequest>(req).isWhiteList = true;

    return next();
  };
}

export default new RouteWhiteListMiddleware();
