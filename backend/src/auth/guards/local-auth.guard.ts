import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//Validação Email e Senha
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}