import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useState, useEffect, memo } from 'react';
import { Container, Form, Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
const PostTable = ({ data, columns, total, isPayment, isAdmin }) => {
    const { isDarkMode } = useSelector((state) => state.theme);
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState('');
    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPost, setTotalPost] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
            pagination: {
                pageCount: totalPage,
                pageIndex: currentPage,
                pageSize: pageSize,
            },
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    });

    useEffect(() => {
        total &&
            setTotalPage(
                totalPost % pageSize < 1 ? Math.floor(totalPost / pageSize) : Math.floor(totalPost / pageSize) + 1,
            );
    }, [total, totalPost, pageSize]);

    useEffect(() => {
        total && setTotalPost(table.getFilteredRowModel().rows.length);
        if (total && table.getRowModel().rows.length === 0) {
            setCurrentPage(currentPage - 1);
        }
    }, [total, filtering, table, currentPage]);

    const handlePageClick = (e) => {
        const selectedPage = +e.selected;
        setCurrentPage(selectedPage);
    };

    return (
        <Container>
            <div className="d-flex justify-content-end">
                <div className="d-flex justify-content-center align-items-center">
                    <Form.Text className={`m-0 me-1 text-center ${isDarkMode ? 'text-light' : ''}`}>
                        Số trang hiển thị
                    </Form.Text>
                    <Form.Control
                        as="select"
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(+e.target.value);
                            setCurrentPage(0);
                        }}
                        className="w-50"
                    >
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                    </Form.Control>
                </div>
                <div className="d-flex justify-content-center align-items-center ms-2">
                    {isAdmin ? (
                        <>
                            <Form.Text className={`text-center ${isDarkMode ? 'text-light' : ''}`}>Tìm kiếm</Form.Text>
                            <Form.Control
                                as="input"
                                value={filtering}
                                onChange={(e) => {
                                    setFiltering(e.target.value);
                                    setCurrentPage(0);
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <Form.Text className={`text-center ${isDarkMode ? 'text-light' : ''}`}>
                                Lọc {isPayment ? 'giao dịch' : ' bài đăng'} theo trạng thái
                            </Form.Text>
                            <Form.Control
                                as="select"
                                value={filtering}
                                onChange={(e) => {
                                    setFiltering(e.target.value);
                                    setCurrentPage(0);
                                }}
                            >
                                <option value={''}>Tất cả</option>
                                {isPayment ? (
                                    <>
                                        <option>Nạp tiền</option>
                                        <option>Thanh toán</option>
                                        <option value="pending">Đợi hoàn thành</option>
                                        <option value="success">Thành công</option>
                                        <option value="failure">Thất bại</option>
                                    </>
                                ) : (
                                    <>
                                        <option value="payment">Đợi thanh toán</option>
                                        <option value="pending">Chờ duyệt</option>
                                        <option value="approved">Chấp nhận</option>
                                        <option value="rejected">Từ chối</option>
                                        <option value="expired">Hết hạn</option>
                                    </>
                                )}
                            </Form.Control>
                        </>
                    )}
                </div>
            </div>
            <Table striped bordered hover responsive variant={isDarkMode ? 'dark' : ''}>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                    {header.isPlaceholder ? null : (
                                        <div>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {{ asc: '🔼', desc: '🔽' }[header.column.getIsSorted() ?? null]}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

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
            <div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    pageCount={totalPage}
                    previousLabel="<"
                    pageClassName={`page-item ${isDarkMode ? 'bg-dark' : 'bg-light'}`}
                    pageLinkClassName="page-link"
                    previousClassName={`page-item ${isDarkMode ? 'bg-dark' : 'bg-light'}`}
                    previousLinkClassName="page-link"
                    nextClassName={`page-item ${isDarkMode ? 'bg-dark' : 'bg-light'}`}
                    nextLinkClassName="page-link"
                    breakClassName={`page-item ${isDarkMode ? 'bg-dark' : 'bg-light'}`}
                    breakLinkClassName="page-link"
                    containerClassName={`pagination justify-content-center ${isDarkMode ? 'bg-dark' : ''}`}
                    activeClassName="active"
                    forcePage={Math.min(currentPage, totalPage - 1)}
                    renderOnZeroPageCount={null}
                />
            </div>
        </Container>
    );
};

export default memo(PostTable);
