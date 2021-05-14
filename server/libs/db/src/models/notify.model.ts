import { prop, modelOptions } from '@typegoose/typegoose'
import { ApiOperation, ApiPropertyOptional } from '@nestjs/swagger';
@modelOptions({
	schemaOptions: {
		timestamps: true //设置这个timestamps为true 会默认的添加俩个字段 创建时间和更新时间
	}
})

export class Notify {
	@prop({default: '系统通知'})  
	@ApiPropertyOptional({ description: '标题', example: '系统通知' })
	title: string

	@prop({default: 1})
	@ApiPropertyOptional({ description: '通知类型', example: '' })
	type: number

	@prop({ default: 'http://lgf-tofullstack.oss-cn-hangzhou.aliyuncs.com/5a884ede05bb27188a7e1f8b3e98b4d8.jpg' })
	@ApiPropertyOptional({ description: '错误类型', example: '' })
	image: string

	@prop({ default: null })
	@ApiPropertyOptional({ description: '描述内容', example: '' })
	content: string


}