import { PencilIcon } from "@heroicons/react/solid";

const JobDetails = ({ row, editJob }) => {
    return (
        <div className="bg-gray-50 px-6 py-3 text-gray-700 text-sm">
            <div className="font-bold text-gray-400">
                Here we will display extended information / contextual actions for the job.
            </div>

            <div>
                <button
                    type="button"
                    onClick={() => editJob(row.original)}
                    className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <PencilIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                    Edit
                </button>
            </div>
        </div>
    );
};

export default JobDetails;