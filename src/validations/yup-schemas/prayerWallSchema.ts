import * as yup from "yup";

export const createPrayerWallSchema = yup.object().shape({
    group_id: yup.string().required(),
    title: yup.string().required(),
    summary: yup.string().required(),
    parishName: yup.string().required(),
    details: yup.string().required(),
    division_id: yup.string().required(),
    user_id: yup.string().required(),
});
