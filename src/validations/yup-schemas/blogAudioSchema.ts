import * as yup from "yup";

export const createBlogAudioSchema = yup.object().shape({
    pastorBlogId: yup.string().required(),
    audioId: yup.string().required()
});
