import * as yup from "yup";

export const createPrayerWallGroupSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    division_id: yup.string().required(),
    prayer_date: yup.string().required(),
    start_time: yup.string().required(),
    end_time: yup.string().required(),
});
