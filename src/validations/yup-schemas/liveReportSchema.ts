import * as yup from "yup";

export const createLiveReportSchema = yup.object().shape({
    title: yup.string().required(),
    reportType: yup.string().required(),
    imagePath: yup.string().required(),
    thumbImagePath: yup.string().required(),
});
