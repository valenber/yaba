import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AppService, LoginUserDto } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/login')
  loginUser(@Body() loginUserDto: LoginUserDto): string {
    try {
      return this.appService.loginUser(loginUserDto);
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
