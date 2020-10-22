export type TjokeType = "programming" | "general" | "knock-knock";

export interface IJoke {
  id: number;
  type: TjokeType;
  setup: string;
  punchline: string;
}

export type TinitialState = Array<IJoke>;
