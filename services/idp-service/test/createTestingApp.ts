import {INestApplication} from "@nestjs/common";
import {createTestingModule} from "./createTestingModule";

export async function createTestingApp(): Promise<INestApplication> {
  const module = await createTestingModule();
  const app = module.createNestApplication();
  return app.init();
}
