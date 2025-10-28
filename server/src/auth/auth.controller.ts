import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async handleRegister(
    @Body() data: RegisterDto,
    @Res() res: Response,
  ): Promise<Response> {
    await this.authService.register(data);
    return res.json({ message: 'User registered successfully' });
  }

  @Post('login')
  async handleLogin(
    @Body() data: LoginDto,
    @Res() res: Response,
  ): Promise<Response> {
    const token = await this.authService.login(data);
    return res.json({ message: 'Login successful', token });
  }
}
