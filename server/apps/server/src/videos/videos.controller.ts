import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Video } from '@libs/db/models/video.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/current-user.decorator';
import { videoDto } from '../auth/dto/video.dto';
import { Action } from '@libs/db/models/action.model';
@Crud({
    model: Video
})
@Controller('videos')
@ApiTags('视频管理')
export class VideosController {
    //构造器函数 中用依赖注入的方法 注入schema模型
    constructor(
        @InjectModel(Video) private readonly model: ReturnModelType<typeof Video>,
        @InjectModel(Action) private readonly actionModel: ReturnModelType<typeof Action>,
    ) { }

    // 上传视频
    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: '上传视频' })
    async create(@Body() dto: videoDto, @CurrentUser() user) {
        dto.uid = user._id
        const res = await this.model.create(dto);
        return { code: 1, message: '发布成功' }
    }

    // 更改视频
    @Post('/updateNum')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: '更新视频点赞数量' })
    async updateNum(@Body() body, @CurrentUser() user) {
        const count = await this.actionModel.countDocuments({ object: body.object, action: body.action })
        if (body.action === 'like') {
            const res = await this.model.findByIdAndUpdate(body.object, {
                'likeNum': count
            });
        } else if (body.action === 'unLike') {
            const res = await this.model.findByIdAndUpdate(body.object, {
                'unlikeNum': count
            });
        } else {
            const res = await this.model.findByIdAndUpdate(body.object, {
                'collectNum': count
            });
        }
        return { code: 1, message: '更新成功' }
    }

    @Post('/info')
    @ApiOperation({ summary: '获取视频详情' })
    async index(@Body() body) {
        const res = await this.model.findOne({ _id: body._id }).populate('uid').lean()
        const res2 = await this.model.find({
            category: { $in: res.category },
            _id: { $ne: res._id }
        }).populate('uid').lean()

        return {
            one: res,
            two: res2,
            static: {
                followNum: await this.actionModel.countDocuments({ object: { $eq: res.uid } }).lean(),
                videoNum: await this.model.countDocuments({ uid: res.uid })
            }
        }
    }

}
