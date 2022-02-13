import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';

import ProjectSelector from '../ProjectSelector';

import { updateJob } from '../../actions/jobs';
import { CLOSE_EDIT_JOB_MODAL } from '../../actions/types';

const EditJobModal = () => {
    const [jobProjects, setJobProjects] = useState([]);

    const {
        editJobModalOpen,
        editingJob
    } = useSelector(state => state.jobs);
    const { projects } = useSelector(state => state.projects);

    const dispatch = useDispatch();
    const closeEditJobModal = () => dispatch({ type: CLOSE_EDIT_JOB_MODAL });

    useEffect(() => {
        setJobProjects(editingJob.project_ids 
            ? editingJob.project_ids
                .map(projectId => ([
                    projectId,
                    projects.find(project => project.id == projectId)
                ]))
                .filter(([_, project]) => Boolean(project))
                .map(([projectId, project]) => ({
                    value: projectId,
                    label: project.name
                }))
            : []);
    }, [editingJob]);
    
    function saveJob(job) {
        dispatch(updateJob({ 
            id: job.id, 
            job: {
                ...job,
                project_ids: jobProjects.map(jobProject => jobProject.value)
            } 
        }));
        
        closeEditJobModal();
    }

    return (
        <Transition appear show={editJobModalOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={() => false}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                Edit {editingJob.name}
                            </Dialog.Title>

                            <div className="mt-2">
                                <p className="text-xs font-bold text-gray-400 mb-2 uppercase">
                                    Time-tracking data sources
                                </p>
                                <p className="text-sm text-gray-500 mb-2">
                                    This job aggregates time-tracking data from these projects retrieved from an external time-tracking system (e.g. Hubstaff):
                                </p>

                                <ProjectSelector 
                                    value={jobProjects}
                                    onChange={value => setJobProjects(value)} />
                            </div>

                            <div className="mt-6">
                                <p className="text-xs font-bold text-gray-400 mb-2 uppercase">
                                    TBD job fields edited here
                                </p>
                                <p className="text-sm text-gray-500 mb-2">
                                    Other field groups...
                                </p>
                            </div>
                            
                            <div className="mt-6">
                                <p className="text-xs font-bold text-gray-400 mb-2 uppercase">
                                    TBD job fields edited here
                                </p>
                                <p className="text-sm text-gray-500 mb-2">
                                    Other field groups...
                                </p>
                            </div>

                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    onClick={closeEditJobModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex justify-center ml-4 px-4 py-2 text-sm font-medium text-white bg-green-700 border border-transparent rounded-md hover:bg-green-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    onClick={(ev) => saveJob(editingJob)}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default EditJobModal;