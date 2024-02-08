import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { Container, Form, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";

export default function PostTable({ data, columns, total }) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPost, setTotalPost] = useState(total);
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
        pageIndex: currentPage,
        pageSize: pageSize,
      },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });
  useEffect(() => {
    setTotalPost(total);
  }, [total]);
  useEffect(() => {
    setTotalPage(
      totalPost % pageSize < 1
        ? Math.floor(totalPost / pageSize)
        : Math.floor(totalPost / pageSize) + 1
    );
  }, [totalPost, pageSize]);

  useEffect(() => {
    setTotalPost(table.getFilteredRowModel().rows.length);
  }, [total, filtering, table]);

  useEffect(() => {
    if (+totalPage < +currentPage) setCurrentPage(0);
  }, [totalPage, currentPage]);

  // useEffect(() => {
  //   if (total > 0) {
  //     if (table.getFilteredRowModel().rows.length === 0) {
  //       setCurrentPage(currentPage - 1);
  //     }
  //   }
  // }, [total, pageSize]);

  const handlePageClick = (e) => {
    const selectedPage = +e.selected;
    setCurrentPage(selectedPage);
    table.setPageIndex(currentPage);
  };
  return (
    <Container>
      <div className="d-flex justify-content-end">
        <div className="d-flex justify-content-center align-items-center">
          <Form.Text className="m-0 me-1 text-center">
            Số trang hiển thị
          </Form.Text>
          <Form.Control
            as="select"
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value)}
            className="w-50"
          >
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
          </Form.Control>
        </div>
        <div className="d-flex justify-content-center align-items-center ms-2">
          <Form.Text className="text-center">
            Lọc bài đăng theo trạng thái
          </Form.Text>
          <Form.Control
            as="select"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
          >
            <option value={""}>Tất cả</option>
            <option>payment</option>
            <option>pending</option>
            <option>approved</option>
            <option>rejected</option>
            <option>expired</option>
          </Form.Control>
        </div>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: "🔼", desc: "🔽" }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
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
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="bg-white">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          pageCount={totalPage}
          previousLabel="<"
          pageClassName="page-item bg-white"
          pageLinkClassName="page-link"
          previousClassName="page-item bg-white"
          previousLinkClassName="page-link"
          nextClassName="page-item bg-white"
          nextLinkClassName="page-link"
          breakClassName="page-item bg-white"
          breakLinkClassName="page-link"
          containerClassName="pagination justify-content-center"
          activeClassName="active"
          forcePage={Math.min(currentPage, totalPage - 1)}
          renderOnZeroPageCount={null}
        />
      </div>
    </Container>
  );
}
