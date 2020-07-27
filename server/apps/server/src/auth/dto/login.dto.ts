import { ApiTags,ApiOperation,ApiPropertyOptional } from '@nestjs/swagger';
// 注册对象的dto
export class LoginDto {
	@ApiPropertyOptional()
	username: string
	@ApiPropertyOptional()
	password: string
}