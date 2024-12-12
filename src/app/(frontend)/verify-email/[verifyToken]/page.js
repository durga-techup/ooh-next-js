"use client"
import { useParams, useRouter } from "next/navigation";
import { verifiyemailApi } from "../../../../front.utils/apis/auth";
import { toast } from "sonner";
import { memo, useCallback, useEffect, useState } from "react";

const EmailVerification = () => {
    const params = useParams();
    const [apiRes, setAPIres] = useState("")
    const { verifyToken } = params
    const router = useRouter()
    // alert(verifyToken)
    const handleVerification = async () => {
        const promise = () => new Promise(async (resolve, reject) => {
            try {
                const res = await verifiyemailApi({ email_verification_token: verifyToken })
                if (res?.success) {
                    resolve(res)
                } else {
                    reject(res)
                }

            } catch (error) {

                reject(error)

            }
        }
        );
        toast.promise(promise, {
            loading: 'Loading...',
            success: (data) => {
                setAPIres(data?.message)

                return `${data?.message}`;
            },
            error: (data) => {
                setAPIres(data?.message)

                return `${data?.message}`;
            },
        });

        // try {

        //     const apiResponse = await verifiyemailApi({ email_verification_token: verifyToken })
        //     const responseData = apiResponse;
        //     // if (responseData?.success) {
        //     //     toast.success("Success!", {
        //     //         description: responseData?.message,
        //     //         position: "top-right",
        //     //     })
        //     //     // router.push("/login")
        //     // } else {
        //     //     toast.error("Failed!", {
        //     //         description: responseData?.message,
        //     //         position: "top-right",
        //     //     })
        //     // }
        //     setAPIres(responseData?.message)


        // } catch (error) {
        //     setAPIres(error?.message)
        //     // console.log(error)
        //     toast.error("Failed!", {
        //         description: error?.message,
        //         position: "top-right",
        //     })
        // }
    }
    // const handleVerification2 = useCallback(handleVerification, [])


    useEffect(() => {
        if (verifyToken) {
            handleVerification()
            console.log("tst")
        }
    }, [])

    return <>
        <div className="flex h-[100vh] w-full justify-center items-center  ">


            <br />
            {apiRes ? apiRes : null
                // <button
                //     className="bg-blue-500 hover:bg-blue-200 border text-white p-2"
                //     onClick={() => {
                //         handleVerification()
                //     }}
                // >
                //     Verify Email
                // </button>
            }
        </div>
    </>
}



export default memo(EmailVerification)