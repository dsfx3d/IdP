import {type Request} from "express";
import {type SessionService} from "../session.service";

export type TSessionInterceptorRequest = Request & {
  sessionService: SessionService;
};
