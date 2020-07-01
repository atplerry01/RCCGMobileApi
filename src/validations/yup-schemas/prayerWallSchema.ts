import * as yup from "yup";

export const createPrayerWallSchema = yup.object().shape({
    title: yup.string().required(),
    summary: yup.string().required(),
    details: yup.string().required(),
    parishName: yup.string().required(),
    phone: yup.string().required(),
    whatsapp: yup.string().required(),
});
