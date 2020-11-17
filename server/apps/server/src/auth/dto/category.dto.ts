import { ApiTags, ApiOperation, ApiPropertyOptional } from '@nestjs/swagger';
// 注册对象的dto
export class CategoryDto {
	@ApiPropertyOptional()
	name: string
}