const JobDetails = ({ row }) => (
    <div className="bg-gray-50 px-6 py-3 text-gray-700 text-sm">
        <div className="font-bold text-gray-400">
            Here we will display extended information / contextual actions for the job.  For now, display a JSON view of this record's mock data:
        </div>

        <pre
            style={{
                fontSize: '10px',
            }}
        >
            <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
        </pre>
    </div>
);

export default JobDetails;