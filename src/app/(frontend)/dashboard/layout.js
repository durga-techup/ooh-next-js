"use client"
// import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import Navbar from "@/components/navbar/page"
import { AppSidebar } from "@/components/app-sidebar"
import { Suspense, useEffect } from "react"
import { ComponentLoading } from "../../../components/loader/componentLoader"
import Users from "./@users/page"
import { Skeleton } from "@/components/ui/skeleton"
import { SkeletonCard } from "../../../components/skeltonCustom/skelton"
import UserDetails from "@/components/navbar/user"
import { Button } from "@/components/ui/button"
import { LogOutReducer } from "../../../redux/reducers"
import Verify_OTP from "../auth/login/verifyOTP"


// import { AppSidebar } from "@/components/sidebar/app-sidebar"

export default function Layout({ children }) {
  const isAuthentication = useSelector(state => state.user.userInfo?.token)
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isAuthentication) {
      router.push("/login")
    }
  }, [isAuthentication])

  

  if (!isAuthentication) {
    return <ComponentLoading />
  }
  window.addEventListener('keyup', (event) => {
    console.log('Key released:', event.key);
  });

  return (
    <SidebarProvider>
      <AppSidebar />
        <main className="w-full">
          <div className="flex my-3 mx-2 justify-between items-center gap-3">
            <div className="flex  gap-3">
            <SidebarTrigger />
            <Suspense fallback={<SkeletonCard />}>
              <Navbar />
            </Suspense>
            </div>
            <Suspense fallback={<SkeletonCard />}>
            <div className="flex items-center">
            <Button
                    onClick={() => {
                        dispatch(LogOutReducer())

                    }}
                    className="mx-3 hover:bg-gray-500">
                    Logout
                </Button>
          <UserDetails/>
            </div>
            
          </Suspense>
          </div>
          <hr/>

          <div className="p-3 m-3">
            {/* <Suspense fallback={<SkeletonCard />}> */}
              {children}
              <Verify_OTP/>
            {/* </Suspense> */}
            {/* {profile} */}
            {/* <Suspense fallback={<div>Loading users content...</div>}> */}
            {/* <Suspense fallback={<SkeletonCard />}>
              {users}
            </Suspense> */}
            {/* <Suspense fallback={"Loading.........."}>
         {Users}
            </Suspense> */}

          </div>
        </main>
        
     
    </SidebarProvider>
  )
}
