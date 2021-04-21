import * as yup from "yup";

export const createPrayerRoomSchema = yup.object().shape({
    title: yup.string().required(),
    summary: yup.string().required(),
    details: yup.string().required(),
    division_id: yup.string().required(),
});
