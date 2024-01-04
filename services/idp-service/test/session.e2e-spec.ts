import * as request from "supertest";
import {HttpStatus, INestApplication} from "@nestjs/common";
import {constants} from "~/modules/session/constants";
import {createTestingApp} from "./createTestingApp";

describe("Session API (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestingApp();
  });

  it(`/session (POST) ${HttpStatus.UNAUTHORIZED} -  without Device ID header`, () => {
    return request(app.getHttpServer())
      .post("/session")
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it(`/session (POST) ${HttpStatus.UNAUTHORIZED} -  with empty Device ID header`, () => {
    return request(app.getHttpServer())
      .post("/session")
      .set(constants.Headers.DeviceId, "")
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it(`/session (POST) ${HttpStatus.CREATED} -  with Device ID header`, () => {
    return request(app.getHttpServer())
      .post("/session")
      .set(constants.Headers.DeviceId, "some-device-id")
      .expect(HttpStatus.CREATED);
  });
});
