"use client"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import React from "react"
import { useSelector } from "react-redux"
import { Car } from "lucide-react"
const Navbar = () => {
    const pathname = usePathname();
    const segments = pathname.split("/").filter((item) => item !== "");
  
  
    
    return <>
        <div className=" flex  justify-between items-center gap-5">
            <div className="flex-auto">
                <Breadcrumb>
                    <BreadcrumbList>
                        {
                            segments?.map((data, i) => {
                                return <React.Fragment key={String(i)}>
                                    <BreadcrumbItem >
                                        <Link disabled={i == segments?.length - 1} href={`/${segments.slice(0, i + 1).join("/")}`}>{data}</Link>
                                    </BreadcrumbItem>
                                    {i == segments?.length - 1 ? null : <BreadcrumbSeparator />}
                                </React.Fragment>
                            })
                        }
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
           
        </div>
    </>
}


export default Navbar