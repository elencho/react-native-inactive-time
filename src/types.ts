export type ITime = number | null;
export interface UserInactivityResponse {
  elapsedTime: ITime;
  formattedTime: string | null;
}
