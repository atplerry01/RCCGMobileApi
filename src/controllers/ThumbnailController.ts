import { Request, Response } from 'express';
const ffmpeg = require('ffmpeg-static')
const genThumbnail = require('simple-thumbnail')

class ThumbnailController {

    static image = async (req: Request, res: Response) => {
        const { } = req.body;

        try {
            await genThumbnail('https://www.w3schools.com/Html/mov_bbb.webm', 'bunny.webm', '150x?', {
                path: ffmpeg.path
            })

            return res.status(201).json({
                success: true,
            });
        } catch (error) {
            res.status(400).send({
                success: false,
                msg: 'something went wrong',
            });
            return;
        }
    };

}

export default ThumbnailController;
