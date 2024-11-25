import { Button } from "@/components/ui/button"
import axios from "axios";


const Page=async()=>{
    const res = await axios('https://jsonplaceholder.typicode.com/posts');
    const posts = res?.data;
    console.log("posts",posts)
    return <>
    <Button className="m-5 hover:bg-gray-500">Click Here</Button>
    </>
}

export default Page