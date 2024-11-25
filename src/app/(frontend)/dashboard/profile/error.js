"use client"
const error=({error})=>{
    return <>
    <div className="border shadow p-2 text-red-500" >
        {error?.message}
    </div>
    </>
}

export default error