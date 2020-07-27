import { ApiTags,ApiOperation,ApiPropertyOptional } from '@nestjs/swagger';
// 注册对象的dto
export class RegisterDto {
	@ApiPropertyOptional()
	username: string
	@ApiPropertyOptional()
	password: string
}