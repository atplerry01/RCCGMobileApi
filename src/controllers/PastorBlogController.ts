import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { PastorBlog } from '../entity/PastorBlog';
import { Paginator } from '../utils/pagination';
import { createPastorBlogService, deletePastorBlogService, getPastorBlogByIdService, getPastorBlogService, updatePastorBlogService } from './../services/pastorBlog';

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
    const { name } = req.body;

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

    // Create Entity Object
    const pastorBlog = new PastorBlog();
    pastorBlog.subject = subject;
    pastorBlog.blogger = blogger;
    pastorBlog.summary = summary;
    pastorBlog.details = details;
    pastorBlog.parishName = parishName;
    pastorBlog.imagePath = imagePath;
    pastorBlog.thumbImagePath = thumbImagePath;

    const errors = await validate(pastorBlog); // TODO:

    if (errors.length > 0) {
      res.status(400).send({
        success: false,
        msg: errors,
      });
      return;
    }

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

  static update = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    const { subject, blogger, summary, details, imagePath, thumbImagePath } = req.body;

    try {
      const entity: any = await getPastorBlogByIdService(id);

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

      const errors = await validate(pastorBlog);

      if (errors.length > 0) {
        res.status(400).send({
          success: false,
          msg: errors,
        });
        return;
      }

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
