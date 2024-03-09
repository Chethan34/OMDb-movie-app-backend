import { ApiProperty } from '@nestjs/swagger';

export class JwtTokenResponse {
  @ApiProperty()
  access_token: string;
}
