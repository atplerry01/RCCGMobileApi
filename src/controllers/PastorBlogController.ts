import { Request, Response } from 'express';
import { BlogAudio } from '../entity/BlogAudio';
import { BlogVideo } from '../entity/BlogVideo';
import { PastorBlog } from '../entity/PastorBlog';
import { Paginator } from '../utils/pagination';
import { createBlogSchema, formatYupError } from '../validations';
import { getAudioByIdService } from './../services/audio';
import { createPastorBlogAudioService, createPastorBlogService, createPastorBlogVideoService, deletePastorBlogService, getPastorBlogByIdService, getPastorBlogService, updatePastorBlogService, getPastorBlogByIdOnlyService } from './../services/pastorblog';
import { getVideoByIdService } from './../services/video';

class PastorBlogController {
  static all = async (req: Request, res: Response) => {
    const { page, per_page } = req.query;

    try {
      const entity: any = await getPastorBlogService();
      const result = await Paginator(entity, page, per_page);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return false;
    }
  };

  static getOneById = async (req: Request, res: Response) => {
    const id: any = req.params.id;

    try {
      const entity: any = await getPastorBlogByIdService(id);

      if (entity.success) {
        return res.status(200).json({
          success: entity.success,
          data: entity.data,
        });
      } else {
        return res.status(400).json({
          success: entity.success,
          msg: entity.msg,
        });
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        msg: error,
      });
    }
  };

  static create = async (req: Request, res: Response) => {
    const { subject, blogger, summary, details, parishName, imagePath, thumbImagePath } = req.body;

    try {
      await createBlogSchema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ errors: formatYupError(err), message: "Validation Error" });
    }

    // Create Entity Object
    const pastorBlog = new PastorBlog();
    pastorBlog.subject = subject;
    pastorBlog.blogger = blogger;
    pastorBlog.summary = summary;
    pastorBlog.details = details;
    pastorBlog.parishName = parishName;
    pastorBlog.imagePath = imagePath;
    pastorBlog.thumbImagePath = thumbImagePath;

    try {
      await createPastorBlogService(pastorBlog);

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

  static createBlogVideo = async (req: Request, res: Response) => {
    const { pastorBlogId, videoId } = req.body;

    const entity: any = await getVideoByIdService(videoId);

    if (!entity.success) {
      return res.status(400).send({
        success: false,
        msg: 'VideoId does not exist',
      });
    }

    // Create Entity Object
    const blogVideo = new BlogVideo();
    blogVideo.pastorBlogId = pastorBlogId;
    blogVideo.videoId = videoId;

    try {
      await createPastorBlogVideoService(blogVideo);

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

  static createBlogAudio = async (req: Request, res: Response) => {
    const { pastorBlogId, audioId } = req.body;

    const entity: any = await getAudioByIdService(audioId);

    if (!entity.success) {
      return res.status(400).send({
        success: false,
        msg: 'audioId does not exist',
      });
    }

    // Create Entity Object
    const blogAudio = new BlogAudio();
    blogAudio.pastorBlogId = pastorBlogId;
    blogAudio.audioId = audioId;

    try {

      await createPastorBlogAudioService(blogAudio);

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

  static update = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    const { subject, blogger, summary, details, imagePath, thumbImagePath, transcribeId } = req.body;

    try {
      const entity: any = await getPastorBlogByIdOnlyService(id);

      if (!entity.success) {
        return res.status(400).json({
          success: false,
          msg: entity.msg,
        });
      }

      const pastorBlog: PastorBlog = entity.data;

      pastorBlog.subject = subject;
      pastorBlog.blogger = blogger;
      pastorBlog.summary = summary;
      pastorBlog.details = details;
      pastorBlog.imagePath = imagePath;
      pastorBlog.thumbImagePath = thumbImagePath;
      pastorBlog.transcribeId = transcribeId;

      console.log('eeeeeeeeeeee', pastorBlog);
      
      await updatePastorBlogService(pastorBlog);

      return res.status(200).json({
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

  static delete = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const entity: any = await getPastorBlogByIdService(id);

      if (!entity.success) {
        return res.status(400).json({
          success: false,
          msg: entity.msg,
        });
      }

      await deletePastorBlogService(id);

      return res.status(200).json({
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

export default PastorBlogController;
