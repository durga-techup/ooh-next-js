import { ReloadIcon } from "@radix-ui/react-icons"


export function ComponentLoading() {
    return (
        <div className="h-[100vh] flex justify-center items-center spinner">
            <span className="flex items-center">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait....
            </span>
        </div>

    )
}
