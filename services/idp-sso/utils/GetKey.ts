export type GetKey<O, K, E = never> = K extends keyof O ? O[K] : E;
