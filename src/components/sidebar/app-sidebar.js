import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Calendar, Home, Inbox, Plus, Search, Settings } from "lucide-react"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

import Logo from '../../../public/logo4.png'
import Link from "next/link"

const Sidebardata = [{
    title: "Home",
    url: "#",
    icon: Home,
},
{
    title: "Profile",
    url: "profile",
    icon: Inbox,
},
{
    title: "Calendar",
    url: "#",
    icon: Calendar,
},
{
    title: "Search",
    url: "#",
    icon: Search,
}
]


export function AppSidebar() {
    return (
        <Sidebar collapsible="none">

            <SidebarHeader >
                <Image src={Logo} alt="Logo" className="" />
            </SidebarHeader>
            <SidebarContent>


                <SidebarGroup className="" >


                    {
                        Sidebardata.map((m, i) => {





                            return <Collapsible key={i} defaultOpen={i == 0} className="group/collapsible">  <SidebarGroup>



                                <SidebarGroupLabel asChild>

                                    <CollapsibleTrigger>


                                        <span className="flex items-center ">
                                            <m.icon size={16} className="mr-2" />

                                            {
                                                m?.title
                                            }
                                        </span>







                                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                    </CollapsibleTrigger>

                                </SidebarGroupLabel>


                                <CollapsibleContent>
                                    <SidebarGroupContent >


                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem>
                                                <Link href={"/dashboard/" + m.url}>
                                                    <span className="flex items-center ">

                                                        <m.icon size={16} className="mr-2" />

                                                        {m.title}
                                                    </span>
                                                </Link>
                                            </SidebarMenuSubItem>

                                        </SidebarMenuSub>
                                    </SidebarGroupContent>
                                </CollapsibleContent>
                            </SidebarGroup>
                            </Collapsible>

                        })
                    }
                </SidebarGroup>






            </SidebarContent>
            <SidebarFooter >
                Footer
               
            </SidebarFooter>
        </Sidebar>
    )
}
