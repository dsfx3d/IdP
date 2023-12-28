import {ConfigService} from "@nestjs/config";
import {CryptoService} from "./crypto.service";
import {Test, TestingModule} from "@nestjs/testing";

const mockConfig = {
  get: jest.fn(() => "0123456789abcdef0123456789abcdef"),
};

describe(CryptoService.name, () => {
  let service: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CryptoService,
        {
          provide: ConfigService,
          useValue: mockConfig,
        },
      ],
    }).compile();
    service = module.get<CryptoService>(CryptoService);
  });

  it("encrypts and decrypts a string", () => {
    const value = "test";
    const encrypted = service.encrypt(value);
    expect(encrypted).not.toBe(value);
    const decrypted = service.decrypt(encrypted);
    expect(decrypted).toBe(value);
  });
});
