import { ApiTags,ApiOperation,ApiPropertyOptional } from '@nestjs/swagger';
// 登录对象的dto
export class LoginDto {
	@ApiPropertyOptional()
	username: string
	@ApiPropertyOptional()
	password: string
}

// 管理员登录对象的dto
export class AdminLoginDto {
	@ApiPropertyOptional()
	name: string
	@ApiPropertyOptional()
	password: string
}