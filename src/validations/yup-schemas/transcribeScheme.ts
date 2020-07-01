import * as yup from "yup";

export const createTranscribeSchema = yup.object().shape({
    subject: yup.string().required(),
    summary: yup.string().required(),
    details: yup.string().required(),
    parishName: yup.string().required(),
});
