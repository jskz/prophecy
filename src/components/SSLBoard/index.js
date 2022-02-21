import { useMemo, useState } from 'react';
import moment from 'moment';
import 'moment-duration-format';
import {
    useTable,

    useExpanded,
    useFlexLayout,
    useResizeColumns
} from 'react-table';
import {
    PlusCircleIcon,
    TrashIcon
} from "@heroicons/react/solid";

import { ColumnResizer } from '../ColumnResizer';

const TWO_WEEKS_IN_SECONDS = 1209600;

const SSLBoard = ({ domains = [], removeDomain, removeDomainLoading, addDomain, addDomainLoading }) => {
    const [domainName, setDomainName] = useState('');

    const defaultColumn = useMemo(
        () => ({
            minWidth: 250,
            width: 250,
            maxWidth: 700,
        }),
        []
    );
    const columns = useMemo(
        () => [
            {
                Header: 'Host',
                accessor: 'host',
                width: 500,
                Cell: ({ row }) => {
                    const { host } = row.values;

                    return (
                        <span className="block overflow-hidden text-ellipsis">
                            <a href={`https://${host}`} rel="noreferrer" target="_blank">
                                {host}
                            </a>
                        </span>
                    )
                }
            },
            {
                Header: 'Expiration',
                accessor: 'expiration',
                Cell: ({ row }) => {
                    const { expiration } = row.values;

                    if(!expiration) {
                        return null;
                    }

                    return (
                        <span className="block overflow-hidden text-ellipsis">
                            {moment.unix(expiration).toISOString()}
                        </span>
                    )
                }
            },
            {
                Header: 'Valid For',
                accessor: 'until',
                Cell: ({ row }) => {
                    const { expiration } = row.values;

                    if(!expiration) {
                        return null;
                    }

                    const duration = moment.duration(moment.unix(expiration).diff(moment()));
                    const durationSeconds = parseInt(duration.asSeconds());

                    if (durationSeconds <= 0) {
                        return (
                            <span className="block overflow-hidden text-ellipsis text-red-600 font-bold">
                                Expired
                            </span>
                        )
                    } else if (durationSeconds <= TWO_WEEKS_IN_SECONDS) {
                        return (
                            <span className="block overflow-hidden text-ellipsis text-red-600">
                                {duration.format('M [months and] d [days]')}
                            </span>
                        );
                    }

                    return (
                        <span className="block overflow-hidden text-ellipsis">
                            {duration.format('M [months and] d [days]')}
                        </span>
                    )
                }
            },
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row }) => {
                    const { host } = row.values;

                    return (
                        <div>
                            <button
                                type="button"
                                onClick={() => removeDomain(host)}
                                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm disabled:bg-red-200 leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <TrashIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                                Delete
                            </button>
                        </div>
                    );
                }
            }
        ],
        [removeDomain]
    );

    const sslTable = useTable(
        {
            columns,
            data: domains,
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
    } = sslTable;

    return (
        <div className="flex flex-col overflow-hidden">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden border-gray-200 sm:rounded-lg relative">
                        <div className="bg-gray-50 px-6 py-3 text-gray-700 text-sm">
                            <p className="text-xs font-bold text-gray-400 mb-2 uppercase">
                                Add a new domain for active SSL monitoring:
                            </p>
                            <div className="relative flex items-stretch flex-grow focus-within:z-10 max-w-md">
                                <input
                                    type="text"
                                    name="domain"
                                    id="domain"
                                    value={domainName}
                                    onChange={ev => setDomainName(ev.target.value)}
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                                    placeholder="www.example.com"
                                />
                                <button
                                    onClick={() => addDomain(domainName)}
                                    disabled={addDomainLoading || !domainName.length}
                                    type="button"
                                    className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 disabled:bg-indigo-200 text-sm font-medium rounded-r-md  text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <PlusCircleIcon className="h-5 w-5" aria-hidden="true" />
                                    <span>{addDomainLoading ? 'Creating...' : 'Add'}</span>
                                </button>
                            </div>
                            <p className="text-xs font-bold text-gray-400 mt-2">
                                The information on this page is updated every 24 hours.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
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

                                    return (
                                        <div key={row.host}
                                            {...row.getToggleRowExpandedProps()}
                                            {...row.getRowProps()}
                                            className={`tr hover:bg-gray-100 hover:cursor-pointer`}>
                                            {
                                                row.cells.map(cell => (
                                                    <span {...cell.getCellProps()} className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r-[1px] flex items-center">
                                                        {cell.render('Cell')}
                                                    </span>
                                                ))
                                            }
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SSLBoard;