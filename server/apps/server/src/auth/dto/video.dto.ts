import { Category } from '@libs/db/models/Category.model';
import { ApiTags, ApiOperation, ApiPropertyOptional } from '@nestjs/swagger';
// 注册对象的dto
export class videoDto {
	@ApiPropertyOptional()
	title: string
	@ApiPropertyOptional()
	category: Array<Category>
	@ApiPropertyOptional()
	authod: string
	@ApiPropertyOptional()
	cover: string
	@ApiPropertyOptional()
	file: string
	@ApiPropertyOptional()
	desc: string
	@ApiPropertyOptional()
	uid: string
	@ApiPropertyOptional()
	lookNum: number
	@ApiPropertyOptional()
	likeNum: number
	@ApiPropertyOptional()
	unlikeNum: number
	@ApiPropertyOptional()
	collectNum: number
	@ApiPropertyOptional()
	commentNum: number
	@ApiPropertyOptional()
	status: string
}