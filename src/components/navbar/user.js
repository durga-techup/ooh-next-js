import { useSelector } from "react-redux"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const UserDetails = () => {
    const userInfo = useSelector(state => state.user.userInfo)

    return <>

        <div>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>
                    {
                        userInfo?.user?.name.toUpperCase()
                    }
                </AvatarFallback>
            </Avatar>

        </div>

    </>
}


export default UserDetails