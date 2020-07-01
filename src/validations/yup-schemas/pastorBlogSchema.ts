import * as yup from "yup";

export const createBlogSchema = yup.object().shape({
    subject: yup.string().required(),
    blogger: yup.string().required(),
    summary: yup.string().required(),
    details: yup.string().required(),
    imagePath: yup.string().required(),
    thumbImagePath: yup.string().required(),
    parishName: yup.string().required(),
});
