import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

//Validação JWT
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}