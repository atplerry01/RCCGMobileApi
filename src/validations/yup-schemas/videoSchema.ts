import * as yup from "yup";

export const createVideoSchema = yup.object().shape({
    subject: yup.string().required(),
    summary: yup.string().required(),
    details: yup.string().required(),
    filePath: yup.string().required(),
    thumbImagePath: yup.string().required(),
    source: yup.string().required(),
});
