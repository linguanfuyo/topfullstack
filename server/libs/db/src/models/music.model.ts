import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose'
import { ApiOperation, ApiPropertyOptional } from '@nestjs/swagger';
import { Episode } from './episode.model'
import { User } from './user.model'
@modelOptions({
	schemaOptions: {
		timestamps: true, //设置这个timestamps为true 会默认的添加俩个字段 创建时间和更新时间
		toJSON: { virtuals: true } // 开启虚拟字段 只能查出来 不能保存到数据库
	}
})

export class Music {
	@prop()  //指明这是一个数据库里面的字段@prop() 
	@ApiPropertyOptional({ description: '标题', example: 'vue学习' })
	name: string

	@prop({ default: '生活' })  //指明这是一个数据库里面的字段@prop() 
	@ApiPropertyOptional({ description: '标签', example: '生活' })
	tag: string

	@prop()  //指明这是一个数据库里面的字段@prop() 
	@ApiPropertyOptional({ description: '作者', example: '林阿富' })
	authod: Ref<User>

	@prop()
	@ApiPropertyOptional({ description: '封面图', example: '' })
	cover: string

	@prop()
	@ApiPropertyOptional({ description: '', example: '' })
	content: string

	// //关联Episode数据库  这是一个虚拟字段 只能查出来 不能保存到数据库
	// @arrayProp({ ref: 'Episode', localField: '_id', foreignField: 'course' })
	// // @ApiPropertyOptional({description: '课时'})
	// episodes: Ref<Episode>[]
	@prop({ default: 0 })
	@ApiPropertyOptional({ description: '观看次数', example: '记录生活点滴' })
	lookNum: number

	@prop({ default: 0 })
	@ApiPropertyOptional({ description: '点赞数', example: '记录生活点滴' })
	likeNum: number

	@prop({ default: 0 })
	@ApiPropertyOptional({ description: '不支持数', example: '记录生活点滴' })
	unlikeNum: number

	@prop({ default: 0 })
	@ApiPropertyOptional({ description: '收藏数', example: '记录生活点滴' })
	collectNum: number

	@prop({ default: 0 })
	@ApiPropertyOptional({ description: '评论数', example: '记录生活点滴' })
	coomentNum: number

	@prop({ default: "1" })
	@ApiPropertyOptional({ description: '状态', example: '1：审核通过，2：待审核，3：不通过' })
	status: string

	@prop({ default: '生活' })  //指明这是一个数据库里面的字段@prop() 
	@ApiPropertyOptional({ description: '类别', example: '生活' })
	category: string
}