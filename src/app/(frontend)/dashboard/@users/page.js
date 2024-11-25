"use client"
import { Button } from "@/components/ui/button"
import { useDispatch } from "react-redux"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"
import { getAllusersAPI } from "../../../../front.utils/apis/users"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const Users = (props) => {
    const dispatch = useDispatch()
    const pathname = usePathname();
    const segments = pathname.split("/").filter((item) => item !== "");
    const [users, setUsers] = useState([])
    useEffect(() => {
        const Fun = async () => {
            try {
                const apiResponse = await getAllusersAPI(props?.paginationData)
                if (apiResponse?.success) {
                    setUsers(apiResponse?.outdata || [])
                }
            } catch (error) {
                // alert(error?.message)
                // throw new Error("Something went wrong!")
            }
        }
        // Fun()
    }, [])
    // throw new Error("Something went wrong in user page.")

    return <>
       

        <Table>
            <TableCaption></TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    {/* <TableHead className="text-right">Amount</TableHead> */}
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    props?.data?.map((user, index) => {
                        return <TableRow key={index}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            {/* <TableCell className="text-right">$250.00</TableCell> */}
                        </TableRow>
                    })
                }

            </TableBody>
        </Table>

    </>
}


export default Users