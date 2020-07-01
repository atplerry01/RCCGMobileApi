import * as yup from "yup";

export const createPrayerRequestSchema = yup.object().shape({
    userId: yup.string().required(),
    fullName: yup.string().required(),
    // email: yup.string().required(),
    // phone: yup.string().required(),
    // details: yup.string().required(),
    parishName: yup.string().required(),
});
