import { useMemo } from 'react';
import moment from 'moment';
import 'moment-duration-format';
import {
    useTable,

    useExpanded,
    useFlexLayout,
    useResizeColumns
} from 'react-table';

import { ColumnResizer } from '../ColumnResizer';

const TWO_WEEKS_IN_SECONDS = 1209600;

const SSLBoard = ({ domains = [] }) => {
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

                    const duration = moment.duration(moment.unix(expiration).diff(moment()));
                    const durationSeconds = parseInt(duration.asSeconds());

                    if(durationSeconds <= 0) {
                        return (
                            <span className="block overflow-hidden text-ellipsis text-red-600 font-bold">
                                Expired
                            </span>
                        )
                    } else if(durationSeconds <= TWO_WEEKS_IN_SECONDS) {
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
        ],
        []
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
            <div className="overflow-x-auto">
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
                                        <>
                                            <div
                                                {...row.getToggleRowExpandedProps()}
                                                {...row.getRowProps()}
                                                className={`tr hover:bg-gray-100 hover:cursor-pointer`}>
                                                {
                                                    row.cells.map(cell => (
                                                        <span {...cell.getCellProps()} className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r-[1px]">
                                                            {cell.render('Cell')}
                                                        </span>
                                                    ))
                                                }
                                            </div>
                                        </>
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