import { Module,Global } from '@nestjs/common';
import { CommonService } from './common.service';
//导入环境变量模块
import { ConfigModule } from '@nestjs/config';
import { DbModule } from '@libs/db';
import { JwtModule } from '@nestjs/jwt'

@Global()
@Module({
  imports: [
	  ConfigModule.forRoot({
		  isGlobal: true
	  }),
	  DbModule,
	  JwtModule.registerAsync({
		  useFactory(){
			  return {
				  secret: '1456adafafsfdfyrye'
			  }
		  }
	  })
  ],
  providers: [CommonService],
  exports: [CommonService,JwtModule],
})
export class CommonModule {}
