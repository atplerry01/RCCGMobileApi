import * as yup from "yup";

export const createPrayerRoomUserSchema = yup.object().shape({
    prayerRoomId: yup.string().required(),
    user_id: yup.string().required(),
    fullName: yup.string().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
    parishName: yup.string().required(),
});
