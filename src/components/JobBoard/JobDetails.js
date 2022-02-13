import {
    PencilIcon,
    ArchiveIcon
} from "@heroicons/react/solid";

const JobDetails = ({ row, editJob }) => {
    return (
        <div className="bg-gray-50 px-6 py-3 text-gray-700 text-sm">
            <div className="font-bold text-gray-400 text-sm uppercase">
                Job management and other TBD interactions
            </div>

            <div className="mt-2">
                <button
                    type="button"
                    onClick={() => editJob(row.original)}
                    className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <PencilIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                    Edit
                </button>

                <button
                    type="button"
                    onClick={() => false}
                    className="inline-flex items-center ml-2 px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <ArchiveIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                    Archive Job
                </button>
            </div>
        </div>
    );
};

export default JobDetails;