import * as yup from "yup";

export const createBlogVideoSchema = yup.object().shape({
    pastorBlogId: yup.string().required(),
    videoId: yup.string().required()
});
