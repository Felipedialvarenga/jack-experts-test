import {Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req){
        return await this.authService.login(req.user);
    }

}
