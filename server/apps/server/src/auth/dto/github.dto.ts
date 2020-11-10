import { ApiTags, ApiOperation, ApiPropertyOptional } from '@nestjs/swagger';
// 注册对象的dto
export class githubDto {
	@ApiPropertyOptional()
	username: string
	@ApiPropertyOptional()
	avatar: string
	@ApiPropertyOptional()
	type: string
	@ApiPropertyOptional()
	user_id: string
}