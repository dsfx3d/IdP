import {Request} from "express";
import {TokenService} from "../token.service";

export type TokenInterceptorRequest = Request & {
  tokenService: TokenService;
};
