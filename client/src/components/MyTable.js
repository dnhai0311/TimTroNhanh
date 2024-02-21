import { flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import debounce from 'lodash.debounce';

const MyTable = ({ data, columns }) => {
    const [filtering, setFiltering] = useState('');

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),

        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter: filtering,
        },

        onGlobalFilterChange: setFiltering,
    });

    const updateValue = (e) => {
        setFiltering(e?.target?.value);
    };

    const debouncedValue = debounce(updateValue, 200);

    return (
        <>
            <input type="text" onChange={debouncedValue} className="mb-2 w-100 border p-2" placeholder="Tìm theo tên" />
            <Table striped hover responsive>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default MyTable;
