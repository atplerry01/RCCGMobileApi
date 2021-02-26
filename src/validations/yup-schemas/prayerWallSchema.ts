import * as yup from "yup";

export const createPrayerWallSchema = yup.object().shape({
    title: yup.string().required(),
    details: yup.string().required(),
    phone: yup.string().required(),
    division_id: yup.string().required(),
});
