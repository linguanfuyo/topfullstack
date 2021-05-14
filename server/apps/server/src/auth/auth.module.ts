import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './local.strategy'
import { AdminLocalStrategy } from './adminLocal.strategy'
import { JwtStrategy,AdminJwtStrategy } from './jwt.strategy'
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'adminJWT' }),
	  PassportModule
  ],
  controllers: [AuthController],
  providers: [LocalStrategy,AdminLocalStrategy,JwtStrategy,AdminJwtStrategy]
})
export class AuthModule {}
