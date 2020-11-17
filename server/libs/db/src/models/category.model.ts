import { prop, modelOptions, Ref } from '@typegoose/typegoose'
import { ApiOperation, ApiPropertyOptional } from '@nestjs/swagger';
@modelOptions({
    schemaOptions: {
        timestamps: true, //设置这个timestamps为true 会默认的添加俩个字段 创建时间和更新时间
        toJSON: { virtuals: true } // 开启虚拟字段 只能查出来 不能保存到数据库
    }
})

export class Category {
    @prop()  //指明这是一个数据库里面的字段@prop() 
    @ApiPropertyOptional({ description: '分类', example: '搞笑' })
    name: string
}