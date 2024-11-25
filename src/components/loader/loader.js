import { ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"

export function ButtonLoading() {
  return (
    <div className="h-[100vh] flex justify-center items-center spinner">
        <Button className="bg-black z-50" style={{cursor:"wait"}} >
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Please wait....
    </Button>

    </div>
    
  )
}
