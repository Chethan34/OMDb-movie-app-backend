import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { JwtTokenResponse } from './dto/jwt-token-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({
    type: JwtTokenResponse,
    isArray: false,
  })
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginUserDto })
  @Post('login')
  login(@Request() req): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }

  @ApiCreatedResponse({
    type: JwtTokenResponse,
    isArray: false,
  })
  @Post('signup')
  signup(@Body() body: CreateUserDto): Promise<{ access_token: string }> {
    return this.authService.signup(body);
  }
}
