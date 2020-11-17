import { ApiTags, ApiOperation, ApiPropertyOptional } from '@nestjs/swagger';
// 注册对象的dto
export class RegisterDto {
	@ApiPropertyOptional()
	username: string
	@ApiPropertyOptional()
	password: string
	@ApiPropertyOptional()
	avatar: string
	@ApiPropertyOptional()
	phone: string
	@ApiPropertyOptional()
	desc: string
	@ApiPropertyOptional()
	type: string
	@ApiPropertyOptional()
	user_id: string
}