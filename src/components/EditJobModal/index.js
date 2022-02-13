import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';

import ProjectSelector from '../ProjectSelector';
import ResourceSelector from '../ResourceSelector';

import { updateJob } from '../../actions/jobs';
import {
    CLOSE_EDIT_JOB_MODAL,
    SET_EDITING_JOB_NAME,
    SET_EDITING_JOB_PROJECT_IDS,
    SET_EDITING_JOB_RESOURCE_IDS,
    SET_EDITING_JOB_RESOURCE_ALLOCATION
} from '../../actions/types';

const EditJobModal = () => {
    const [jobProjects, setJobProjects] = useState([]);
    const [jobResources, setJobResources] = useState([]);

    const {
        editJobModalOpen,
        editingJob
    } = useSelector(state => state.jobs);
    const { resources } = useSelector(state => state.resources);
    const { projects } = useSelector(state => state.projects);

    const dispatch = useDispatch();

    const setEditingJobName = (value) => dispatch({ type: SET_EDITING_JOB_NAME, payload: value });
    const setEditingJobProjectIds = (value) => dispatch({ type: SET_EDITING_JOB_PROJECT_IDS, payload: value });
    const setEditingJobResourceIds = (value) => dispatch({ type: SET_EDITING_JOB_RESOURCE_IDS, payload: value });
    const setEditingJobResourceAllocation = (id, value) => dispatch({ type: SET_EDITING_JOB_RESOURCE_ALLOCATION, payload: { id, value } });
    const closeEditJobModal = () => dispatch({ type: CLOSE_EDIT_JOB_MODAL });

    useEffect(() => {
        setJobProjects(editingJob.project_ids
            ? editingJob.project_ids
                .map(projectId => ([
                    projectId,
                    projects.find(project => project.id === projectId)
                ]))
                .filter(([_, project]) => Boolean(project))
                .map(([projectId, project]) => ({
                    value: projectId,
                    label: project.name
                }))
            : []);
    }, [editingJob, projects]);

    useEffect(() => {
        setJobResources(editingJob.resource_ids
            ? editingJob.resource_ids
                .map(resource => ([
                    resource,
                    resources.find(r => r.id === resource)
                ]))
                .filter(([_, resource]) => Boolean(resource))
                .map(([resourceId, resource]) => ({
                    value: resourceId,
                    label: resource.name
                }))
            : []);
    }, [editingJob, resources]);

    function saveJob(job) {
        dispatch(updateJob({
            id: job.id,
            job: {
                ...job,
                project_ids: jobProjects.map(jobProject => jobProject.value),
                resource_ids: jobResources.map(jobResource => jobResource.value)
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
                        <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                Edit {editingJob.name}
                            </Dialog.Title>

                            <form onSubmit={(ev) => {
                                ev.preventDefault();
                                saveJob(editingJob);
                                return false;
                            }}>
                                <div className="mt-6">
                                    <label htmlFor="name" className="block text-xs font-bold text-gray-400 mb-2 uppercase">
                                        Job Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            required
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            placeholder="Job Name"
                                            value={editingJob.name}
                                            onChange={(ev) => setEditingJobName(ev.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <p className="text-xs font-bold text-gray-400 mb-2 uppercase">
                                        Time-tracking data sources
                                    </p>
                                    <p className="text-sm text-gray-500 mb-2">
                                        This job aggregates time-tracking data from these projects retrieved from an external time-tracking system (e.g. Hubstaff):
                                    </p>

                                    <ProjectSelector
                                        value={jobProjects}
                                        onChange={value => setEditingJobProjectIds(value.map(project => project.value))} />
                                </div>

                                <div className="mt-6">
                                    <p className="text-xs font-bold text-gray-400 mb-2 uppercase">
                                        Allocated resources
                                    </p>
                                    <p className="text-sm text-gray-500 mb-2">
                                        Choose assigned resources and specify their allocation (%) to this job.
                                    </p>

                                    <ResourceSelector
                                        value={jobResources}
                                        onChange={(value, action) => {
                                            setEditingJobResourceIds(value.map(resource => resource.value));

                                            if(action.action === 'remove-value') {
                                                setEditingJobResourceAllocation(action.removedValue.value, 0);
                                            }
                                        }} />
                                    <div className="mt-2">
                                        {
                                            jobResources
                                                .map(resource => ([
                                                    resource.value,
                                                    resources.find(r => r.id === resource.value),
                                                    editingJob.allocations[resource.value] || 0
                                                ]))
                                                .map(([_, resource, allocation]) =>
                                                    <div>
                                                        <div className="line-allocation">
                                                            {resource.name} - {parseInt(allocation * 100)}% ({(resource.weekly_hours * allocation).toFixed(1)} hours/week)
                                                        </div>
                                                        <div className="line-allocation-assignment">
                                                            <input
                                                                className="w-full"
                                                                value={parseInt(allocation * 100)}
                                                                min={0}
                                                                max={100}
                                                                step={5}
                                                                type="range"
                                                                onChange={ev => {
                                                                    const allocation = ev.target.value / 100;

                                                                    setEditingJobResourceAllocation(resource.id, allocation);
                                                                }}>
                                                            </input>
                                                        </div>
                                                    </div>
                                                )
                                        }
                                    </div>
                                </div>

                                <div className="mt-6 pb-4 border-b-[1px]">
                                    <p className="text-xs font-bold text-gray-400 mb-2 uppercase">
                                        TBD job fields edited here
                                    </p>
                                    <p className="text-sm text-gray-500 mb-2">
                                        Other field groups...
                                    </p>
                                </div>

                                <div className="mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeEditJobModal}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center ml-4 px-4 py-2 text-sm font-medium text-white bg-green-700 border border-transparent rounded-md hover:bg-green-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default EditJobModal;