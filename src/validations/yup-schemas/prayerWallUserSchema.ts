import * as yup from "yup";

export const createPrayerWallUserSchema = yup.object().shape({
    prayerWallId: yup.string().required(),
    userId: yup.string().required(),
    fullName: yup.string().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
    parishName: yup.string().required(),
});
