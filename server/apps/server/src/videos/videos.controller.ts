import { Controller } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Video } from '@libs/db/models/video.model';
import { ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
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
}
