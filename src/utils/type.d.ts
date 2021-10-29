import { GenderEnum } from "./enum";

declare global {
  declare type IStorage = Partial<{
    openId: string;
    userInfo: {
      age: number,
      gender: GenderEnum
    }
  }>
}