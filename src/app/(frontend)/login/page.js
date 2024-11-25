"use client"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { pushNotification } from "@/redux/reducers"
import axios from "axios"
import { toast } from "sonner"
//  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Formik, Field, ErrorMessage, Form, useFormik } from "formik";
import * as Yup from "yup";
import { CloudCog, Lock, MailOpen } from "lucide-react"
import { LogInReducer } from "../../../redux/reducers"
import { ComponentLoading } from "@/components/loader/componentLoader"
import { ButtonLoading } from "@/components/loader/loader"
import InputOtp from "@/components/inputOtp/otp"
import { privateApi } from "../../../front.utils/apiService"
import CryptoJS from 'crypto-js';
import PayloadEncryption from "../../../front.utils/payloadEncryption"
import { loginApi } from "../../../front.utils/apis/login"



export default function LogIn() {
    const dispatch = useDispatch()
    const isAuthentication = useSelector(state => state.user.userInfo?.token)

    const [isLoading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (isAuthentication) {
            router.push("/dashboard")
        }
    }, [dispatch, isAuthentication])

    const validationSchema = Yup.object().shape({
        // name: Yup.string()
        //     .min(2, 'Name must be minimum 2')
        //     .max(100, 'Name must not be more than 100 characters')
        //     .required('Name is required'),
        email: Yup.string().email('Invalid email').required('email is required').trim().transform(value => value.toLowerCase()),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('password is required').trim(),
        // confirmPassword: Yup.string()
        //     .oneOf([Yup.ref('password')], 'Passwords must match')
        //     .required('Confirm Password is required'),
    });


    const handleSubmit = async (values) => {
        const payload = (values)

        try {
            setLoading(true)
            const apiResponse = await loginApi(payload)
            console.log("apiResponse", apiResponse)
            const responseData = apiResponse;
            if (responseData?.success) {
                dispatch(LogInReducer(responseData?.finalData))
                toast("Success!", {
                    description: apiResponse?.message,
                    position: "top-right",
                })
                router.push("/dashboard")

            } else {
                toast("Failed!", {
                    description: apiResponse?.message,
                    position: "top-right",
                })
            }

        } catch (error) {
            toast("Something went wrong!", {
                description: error.message,
                position: "top-right",
            })
        } finally {
            setLoading(false)

        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: handleSubmit,
    });


    console.log("Formik values", formik.values)
    console.log("Formik errors", formik.errors)
    console.log("Formik touched", formik.touched)

    const [otp, setotp] = useState()
    const handleOTPValues = (e) => {
        console.log("data", e)
        setotp(Number(e))

    }

    if (isAuthentication) {
        return <ComponentLoading />
    }




    return (
        <div className="flex h-[100vh] justify-center items-center p-3">
            {isLoading && <ButtonLoading />}
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>LogIn</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent >
                    <div>
                        <div>
                            <form onSubmit={formik.handleSubmit}>
                                <div>
                                    <div className="">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-2 pointer-events-none">
                                                <MailOpen  className="h-3.5 w-3.5"  />
                                            </div>
                                            <Input
                                                className=" !ps-10"
                                                id="email"
                                                placeholder="example@gmail.com"
                                                name="email"
                                                type="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>

                                        {formik.touched.email && formik.errors.email && (
                                            <div className="text-red-500" >{formik.errors.email}</div>
                                        )}



                                    </div>
                                    <div className="mt-5">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-2 pointer-events-none">
                                                <Lock className="h-3.5 w-3.5"  />
                                            </div>
                                            <Input
                                                className=" !ps-10"
                                                placeholder="password"
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>
                                        {formik.touched.password && formik.errors.password && (
                                            <div className="text-red-500">{formik.errors.password}</div>
                                        )}
                                    </div>
                                    <div className="mt-5">
                                        <Button className=" w-[100%]" type="submit" disabled={isLoading}>
                                            Submit
                                        </Button>
                                    </div>

                                </div>

                            </form>
                        </div>
                        <div className="my-5 float-right">
                            <p className="p-0" >
                                <span className="">
                                    <small>
                                        Create a new account? | <Link href={"register"}  >
                                            Register
                                        </Link>
                                    </small>
                                </span>
                            </p>
                        </div>
                    </div>


                </CardContent>
            </Card>
        </div>

    )
}
