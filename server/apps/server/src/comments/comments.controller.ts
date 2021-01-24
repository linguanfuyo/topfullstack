import { Comment } from '@libs/db/models/Comment.model';
import { Controller, Get, Post, Query, UseGuards, Body } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose'
import { ApiTags, ApiOperation, ApiPropertyOptional } from '@nestjs/swagger';
import { CurrentUser } from '../auth/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
@Controller('comments')
@ApiTags('用户评论')
export class CommentsController {
    //构造器函数 中用依赖注入的方法 注入schema模型
    constructor(@InjectModel(Comment) private readonly commentModel: ReturnModelType<typeof Comment>) { }

    @Get()
    async index(@Query('query') query: string) {
        const params = JSON.parse(query)
        // .where(params.where).setOptions(params);
        const res = await this.commentModel.find({ object: params.where.object }).populate('uid').setOptions(params)
        let data = []
        for (let i = 0; i < res.length; i++) {
            let res2 = await this.commentModel.find({ parentId: res[i]._id }).populate('uid').populate({ path: 'object', select: 'uid', populate: { path: 'uid', select: 'username' } })
            let com = {
                frist: res[i],
                two: []
            }
            com.two = res2
            console.log(com)
            data.push(com)
        }
        return {
            code: 1,
            data: data,
            msg: '操作成功'
        }

    }


    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: '创建评论' })
    async create(@Body() dto, @CurrentUser() user) {
        dto.uid = user._id
        return await this.commentModel.create(dto);
    }
}
