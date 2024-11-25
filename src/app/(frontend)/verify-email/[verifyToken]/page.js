"use client"
import { useParams, useRouter } from "next/navigation";
import { verifiyemailApi } from "../../../../front.utils/apis/auth";
import { toast } from "sonner";

const EmailVerification = () => {
    const params = useParams();
    const { verifyToken } = params
    const router = useRouter()
    // alert(verifyToken)
    const handleVerification = async () => {
        try {
            const apiResponse = await verifiyemailApi({ email_verification_token: verifyToken })
            const responseData = apiResponse;
            if (responseData?.success) {
                toast("Success!", {
                    description: responseData?.message,
                    position: "top-right",
                })
                router.push("/login")
            } else {
                toast("Failed!", {
                    description: responseData?.message,
                    position: "top-right",
                })
            }

        } catch (error) {
            // console.log(error)
            toast("Failed!", {
                description: error?.message,
                position: "top-right",
            })
        }
    }

    return <>
        <div className="flex h-[100vh] w-full justify-center items-center  ">

            <button
                className="bg-blue-500 hover:bg-blue-200 border text-white p-2"
                onClick={() => {
                    handleVerification()
                }}
            >
                Verify Email
            </button>
        </div>
    </>
}




export default EmailVerification