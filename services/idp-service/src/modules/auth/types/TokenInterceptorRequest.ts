import {Request} from "express";
import {TokenService} from "../services/token.service";

export type TokenInterceptorRequest = Request & {
  tokenService: TokenService;
};
