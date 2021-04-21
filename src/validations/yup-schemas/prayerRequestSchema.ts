import * as yup from "yup";

export const createPrayerRequestSchema = yup.object().shape({
    title: yup.string().required(),
    parishName: yup.string().required(),
    details: yup.string().required(),
    division_id: yup.string().required(),
    user_id: yup.string().required(),
});
