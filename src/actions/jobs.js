import { JOB_UPDATED } from "./types";

export const updateJob = (job) => dispatch => {
    dispatch({ type: JOB_UPDATED, payload: {
        id: job.id,
        job: { ...job }
    }});
};