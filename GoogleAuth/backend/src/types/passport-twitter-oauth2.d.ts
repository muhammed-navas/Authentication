declare module 'passport-twitter-oauth2' {
  import { Strategy as PassportStrategy } from 'passport';
  
  export interface StrategyOptions {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    scope?: string[];
  }

  export interface Profile {
    id: string;
    displayName: string;
    username?: string;
    photos?: Array<{ value: string }>;
    provider: string;
    _json: any;
    _raw: string;
    [key: string]: any;
  }

  export type VerifyCallback = (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void
  ) => void;

  export class Strategy extends PassportStrategy {
    constructor(
      options: StrategyOptions,
      verify: VerifyCallback
    );
  }
}
