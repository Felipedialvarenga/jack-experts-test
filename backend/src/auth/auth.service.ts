import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService){}

    
    async validateUser(authDto: AuthDto){
        const user = await this.userService.getUserByEmail(authDto.email)
        if (user && await bcrypt.compare(authDto.password,user.password)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result;
          }
          return null;
    }
    
    async login(user: any) {
        const payload = { email: user.email, id: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }
}
