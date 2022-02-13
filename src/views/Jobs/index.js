import JobBoard from "../../components/JobBoard";

import CreateJobModal from '../../components/EditJobModal';
import EditJobModal from '../../components/EditJobModal';

function Jobs() {
    return (
        <div>
            <JobBoard />

            <CreateJobModal />
            <EditJobModal />
        </div>
    );
}

export default Jobs;