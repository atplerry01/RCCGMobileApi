import * as yup from "yup";

export const createPrayerRequestSchema = yup.object().shape({
    fullName: yup.string().required(),
    phone: yup.string().required(),
    details: yup.string().required(),
    division_id: yup.string().required()
});
