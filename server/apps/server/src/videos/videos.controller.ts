import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Video } from '@libs/db/models/video.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/current-user.decorator';
import { videoDto } from '../auth/dto/video.dto';
@Crud({
    model: Video
})
@Controller('videos')
@ApiTags('视频管理')
export class VideosController {
    //构造器函数 中用依赖注入的方法 注入schema模型
    constructor(
        @InjectModel(Video) private readonly model: ReturnModelType<typeof Video>,
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
}
