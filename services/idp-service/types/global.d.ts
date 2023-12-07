declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATA_SOURCE: "sqlite";
      DB_NAME: string;
    }
  }
}

export {};
