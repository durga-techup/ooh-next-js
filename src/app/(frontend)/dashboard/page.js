"use client"
import { Button } from "@/components/ui/button"
import { popNotification } from "@/redux/reducers"
import { useDispatch } from "react-redux"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import { LogOutReducer } from "../../../redux/reducers"
import { Suspense, useEffect, useState } from "react"
import { privateApi } from "../../../front.utils/apiService"
import { getAllusersAPI } from "../../../front.utils/apis/users"
// import {
//     Pagination,
//     PaginationContent,
//     PaginationEllipsis,
//     PaginationItem,
//     PaginationLink,
//     PaginationNext,
//     PaginationPrevious,
// } from "@/components/ui/pagination"
import Users from "./@users/page"
import { ButtonLoading } from "@/components/loader/loader"
import ReactPaginate from 'react-paginate';


// import Profile from "./@profile/profile/page"
// import Users from "./@users/users/page"



const Dashboard = () => {
    const dispatch = useDispatch()
    const pathname = usePathname();
    const segments = pathname.split("/").filter((item) => item !== "");
    const [currentPage, setCurrentPage] = useState(1); // The current page
    const [totalItems, setTotalItems] = useState(0); // The total number of items from the API
    const [itemsPerPage, setItemsPerPage] = useState(2); // Items per page
    const [data, setData] = useState([]); // Store the data for the current page
    const [isLoading, setLoading] = useState(false)

    const totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total number of pages
    // Handle page change (previous, next, or direct page click)
    const handlePageChange = (event) => {
        if ((event.selected + 1) < 1 || (event.selected + 1) > totalPages) return; // Prevent going out of bounds
        setCurrentPage((event.selected + 1));
    };

    useEffect(() => {
        const Fun = async () => {
            setLoading(true)
            try {
                const payload = {
                    itemsPerPage,
                    currentPage
                }
                const res = await getAllusersAPI(payload)
                console.log("res:::", res)

                setData(res?.outdata); // Assuming the response contains items
                setTotalItems(res?.total);
            } catch (error) {
            } finally {
                setLoading(false)

            }
        }
        Fun()
    }, [currentPage])

    // Generate a list of pages to display in the pagination



    return <>
        <div className="" style={{
            display: "grid",
            gridTemplateRows: "1fr auto",
            height: "100%",
            background: "rgb(249 248 248)",
            margin: 0,
            padding: 0
        }}>
            {isLoading && <ButtonLoading />}

            <div className="min-h-[50vh]"

            >
                <div className="p-3">
                    <Users paginationData={{
                        itemsPerPage,
                        currentPage
                    }}
                        data={data}
                    />
                </div>
            </div>


            <div className="py-3  shadow" >
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageChange}
                    pageRangeDisplayed={3}
                    pageCount={totalPages}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    containerClassName={" flex justify-center  "}
                    breakClassName={"flex  border"}
                    breakLinkClassName={"p-2 "}
                    pageClassName={" border p-2 mx-1 hover:bg-gray-200"}
                    pageLinkClassName={"p-2"}
                    previousClassName={" border  p-2"}
                    previousLinkClassName={"p-2"}
                    nextClassName={" border p-2"}
                    nextLinkClassName={" p-2"}
                    activeClassName={"bg-black text-white hover:!bg-black "}
                />
            </div>

        </div>







    </>
}


export default Dashboard