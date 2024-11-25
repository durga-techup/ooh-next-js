"use client"

import { ComponentLoading } from "@/components/loader/componentLoader"
import { ButtonLoading } from "@/components/loader/loader"
import InputOtp from "@/components/inputOtp/otp"
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"


const Verify_OTP = () => {
    const [isLoading, setLoading] = useState(false)
    const [counter, setCounter] = React.useState(120);

    React.useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    const minutes = Math.floor(counter / 60);
    const seconds = counter % 60;
    const router = useRouter()
    const [otp, setotp] = useState()

    const handleOTPValues = (e) => {
        console.log("data", e)
        setotp(Number(e))
    }

    const handleSubmit = () => {
        console.log("submit", otp)
    }

    return <>
        <div className="flex h-[100vh] justify-center items-center p-3">
            {isLoading && <ButtonLoading />}
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Verify OTP</CardTitle>
                    <CardDescription>
                        We have sent 4 digit code.
                    </CardDescription>
                    <CardDescription>
                        To complete the verification process please enter the 4 digit code below.
                    </CardDescription>
                </CardHeader>
                <CardContent >
                    <div>
                        <div>
                            {/* <form > */}
                            <div>
                                <div>
                                    <InputOtp setOtp={handleOTPValues} otp={otp} />
                                </div>
                                <div className="mt-3" >
                                    Resend after {" "}
                                    <span className="text-blue-500">
                                        {minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}
                                    </span>
                                </div>
                                <div className="mt-5 ">
                                    {/* <div>
                                        <Link
                                            href={"/register"}
                                        >
                                            <Button className=""
                                            >
                                                Go Back
                                            </Button>
                                        </Link>

                                        </div> */}

                                    <div>
                                        <Button className="w-full"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </Button>
                                    </div>


                                </div>
                            </div>

                            {/* </form> */}
                        </div>
                        {/* <div className="my-5 float-right">
                            <p className="p-0" >
                                <span className="">
                                    <small>
                                        Create a new account? | <Link href={"register"}  >
                                            Register
                                        </Link>
                                    </small>
                                </span>
                            </p>
                        </div> */}
                    </div>


                </CardContent>
            </Card>
        </div>

    </>
}

export default Verify_OTP