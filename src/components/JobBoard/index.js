import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    useTable,

    useExpanded,
    useFlexLayout,
    useResizeColumns
} from 'react-table';

import { ColumnResizer } from '../ColumnResizer';
import JobDetails from './JobDetails';
import { currencyFormatter } from '../../util/formatting';

import { EDIT_JOB } from '../../actions/types';

const JobBoard = () => {
    const dispatch = useDispatch();

    const { jobs } = useSelector(state => state.jobs);
    const { projects } = useSelector(state => state.projects);
    const { resources } = useSelector(state => state.resources);

    // react-table definitions
    const defaultColumn = useMemo(
        () => ({
            minWidth: 200,
            width: 200,
            maxWidth: 400,
        }),
        []
    );
    const columns = useMemo(
        () => [
            {
                Header: 'Job Name',
                accessor: 'name',
                Cell: ({ row }) => {
                    const { name } = row.values;

                    return (
                        <span className="block overflow-hidden text-ellipsis">
                            {name}
                        </span>
                    )
                }
            },
            {
                Header: 'Project Status',
                accessor: 'project_status',
                Cell: ({ row }) => {
                    const { project_status } = row.values;

                    switch(project_status) {
                        case 'Pending':
                            return (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                    {project_status}
                                </span>
                            );
                        default:
                            return (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {project_status}
                                </span>
                            );
                    }
                }
            },
            {
                Header: 'Budget',
                accessor: 'budget',
                Cell: ({ row }) => {
                    const { budget } = row.values;

                    return (
                        <span>
                            {currencyFormatter.format(budget)}
                        </span>
                    );
                }
            },
            {
                Header: 'Budget Hours',
                accessor: 'budget_hours'
            },
            {
                Header: () => (
                    <>
                        <span>
                            Hours Invested
                        </span>
                    </>
                ),
                accessor: 'hours_invested',
                Cell: ({ row }) => {
                    const { project_ids, budget_hours } = row.original;
                    const hours_invested = projects
                        .filter(project => project_ids.includes(project.id))
                        .reduce((prev, curr) => prev + curr.hours_invested, 0);

                    if (typeof budget_hours !== 'undefined') {
                        const budgetHoursExhaustedPercentage = parseInt(hours_invested * 100 / budget_hours);
                        let exhaustedStyles = '';

                        if(hours_invested > budget_hours) {
                            exhaustedStyles = 'text-red-700';
                        }

                        return (
                            <span>
                                <span className="hours-invested">{`${hours_invested.toFixed(1)}`}</span>
                                <span className={`font-bold budget-percentage-exhausted ${exhaustedStyles}`}>{` (${budgetHoursExhaustedPercentage}%)`}</span>
                            </span>
                        );
                    }

                    return (
                        <span className="font-bold">
                            {hours_invested.toFixed(1)}
                        </span>
                    );
                }
            },
            {
                Header: 'Start Date',
                accessor: 'start_date'
            },
            {
                Header: 'Projected Finish Date',
                accessor: 'projected_finish_date'
            },
            {
                Header: 'Resources',
                accessor: 'resources',
                Cell: ({ row }) => {
                    const projectAllocations = row.original.allocations;
                    const projectResources = row.original.resource_ids
                        .map(resource => ([resource, resources.find(r => r.id === resource)]))
                        .filter(([_, resource]) => Boolean(resource))
                        .map(([_, resource]) => (
                            `${resource.name} - ${(projectAllocations[resource.id] || 0) * 100}%`)
                        )
                        .join(', ');

                    return (
                        <span className="block overflow-hidden text-ellipsis">
                            {projectResources}
                        </span>
                    );
                }
            }
        ],
        [projects, resources]
    );

    const editJob = (row) => dispatch({ type: EDIT_JOB, payload: { ...row } });

    const jobTable = useTable(
        {
            columns,
            data: jobs,
            defaultColumn,
            autoResetExpanded: false
        },
        useExpanded,
        useFlexLayout,
        useResizeColumns
    );

    const {
        getTableProps,
        getTableBodyProps,
        prepareRow,
        headerGroups,
        rows
    } = jobTable;

    return (
        <div className="flex flex-col overflow-hidden">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden border-gray-200 sm:rounded-lg relative">
                        <div className="bg-gray-50 px-6 py-3 text-gray-700 text-sm">
                            [Job board actions like creating a new project or filtering the view/switching between saved filters will be placed here]
                        </div>
                    </div>
                    <div className="overflow-hidden border-gray-200 sm:rounded-lg relative">
                        <div className="absolute min-h-[56px] bg-gray-50 min-w-full border-b-[2px]">
                        </div>
                        <div className="min-w-full divide-y divide-gray-200 table"  {...getTableProps()}>
                            <div className="bg-gray-50 min-w-full">
                                <div>
                                    <div>
                                        {headerGroups.map(headerGroup => (
                                            <div {...headerGroup.getHeaderGroupProps()} className="tr">
                                                {headerGroup.headers.map(column => (
                                                    <div {...column.getHeaderProps()} className="pl-6 py-3 text-left text-xs min-h-[56px] font-medium text-gray-500 uppercase tracking-wider items-center flex">
                                                        <div className="flex-grow">
                                                            {column.render('Header')}
                                                        </div>

                                                        <ColumnResizer {...column.getResizerProps()} />
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                    <div {...getTableBodyProps()} className="bg-white divide-y divide-gray-200 border-b-[1px]">
                                        {rows.map(row => {
                                            prepareRow(row);

                                            const { project_ids, budget_hours } = row.original;
                                            const hours_invested = projects
                                                .filter(project => project_ids.includes(project.id))
                                                .reduce((prev, curr) => prev + curr.hours_invested, 0);
                                            let extraRowClasses = '';

                                            if(hours_invested > budget_hours) {
                                                extraRowClasses = `bg-red-100`;
                                            }

                                            return (
                                                <>
                                                    <div
                                                        {...row.getToggleRowExpandedProps()}
                                                        {...row.getRowProps()}
                                                        className={`tr hover:bg-gray-100 hover:cursor-pointer ${row.isExpanded ? 'bg-gray-200' : ''} ${extraRowClasses}`}>
                                                        {
                                                            row.cells.map(cell => (
                                                                <span {...cell.getCellProps()} className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r-[1px]">
                                                                    {cell.render('Cell')}
                                                                </span>
                                                            ))
                                                        }
                                                    </div>
                                                    {row.isExpanded ? (
                                                        <div>
                                                            <JobDetails row={row} editJob={editJob} />
                                                        </div>
                                                    ) : null}
                                                </>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobBoard;