import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose'
import { ApiOperation, ApiPropertyOptional } from '@nestjs/swagger';
import { Episode } from './episode.model'
import { User } from './user.model'
import { Category } from './Category.model'
@modelOptions({
	schemaOptions: {
		timestamps: true, //设置这个timestamps为true 会默认的添加俩个字段 创建时间和更新时间
		toJSON: { virtuals: true } // 开启虚拟字段 只能查出来 不能保存到数据库
	}
})

export class Video {
	@prop()  //指明这是一个数据库里面的字段@prop() 
	@ApiPropertyOptional({ description: '视频标题', example: '打工人' })
	title: string

	@prop({ default: '生活' })  //指明这是一个数据库里面的字段@prop() 
	@ApiPropertyOptional({ description: '标签', example: '生活' })
	category: Ref<Category>[]

	@prop()  //指明这是一个数据库里面的字段@prop() 
	@ApiPropertyOptional({ description: '作者', example: '林阿富' })
	authod: Ref<User>

	@prop()
	@ApiPropertyOptional({ description: '封面图url', example: '' })
	cover: string

	@prop()
	@ApiPropertyOptional({ description: '视频url', example: '' })
	file: string

	@prop()
	@ApiPropertyOptional({ description: '描述', example: '记录生活点滴' })
	desc: string

	@prop({ default: 0 })
	@ApiPropertyOptional({ description: '观看次数', example: '0' })
	lookNum: number

	@prop({ default: 0 })
	@ApiPropertyOptional({ description: '点赞数', example: '0' })
	likeNum: number

	@prop({ default: 0 })
	@ApiPropertyOptional({ description: '不支持数', example: '0' })
	unlikeNum: number

	@prop({ default: 0 })
	@ApiPropertyOptional({ description: '收藏数', example: '0' })
	collectNum: number

	@prop({ default: 0 })
	@ApiPropertyOptional({ description: '评论数', example: '0' })
	coomentNum: number

	@prop({ default: "1" })
	@ApiPropertyOptional({ description: '状态', example: '1：审核通过，2：待审核，3：不通过' })
	status: string

}