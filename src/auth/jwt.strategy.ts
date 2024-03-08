import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET', //TODO: update to env
    });
  }

  async validate(payload: any) {
    // example of how to get full user data from server in here after validation
    // const user = await this.usersService.getById(payload.sub);
    return {
      id: payload.sub,
      name: payload.name,
      // ...user,
    };
  }
}
