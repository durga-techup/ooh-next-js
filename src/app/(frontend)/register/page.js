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
import { ComponentLoading } from "../../../components/loader/componentLoader"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { useFormik } from "formik"
import * as Yup from "yup";
import { Lock, MailOpen, User } from "lucide-react"
import { toast } from "sonner"
import axios from "axios"
import { ButtonLoading } from "@/components/loader/loader"
import PayloadEncryption, { responseDecrypt } from "../../../front.utils/payloadEncryption"
import { privateApi } from "../../../front.utils/apiService"
import { registerApi } from "../../../front.utils/apis/register"
// import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import FacebookLogin from 'react-facebook-login';
import { MobileIcon } from "@radix-ui/react-icons"


export default function CardWithForm() {
    const dispatch = useDispatch()
    const router = useRouter()
    const isAuthentication = useSelector(state => state.user.userInfo?.token)
    const [isLoading, setLoading] = useState(false)

   

    useEffect(() => {
        if (isAuthentication) {
            router.push("/")
        }
    }, [dispatch, isAuthentication])

    const handleSubmit = async (values) => {
        const payload = values
        try {
            setLoading(true)
            const responseData = await registerApi(payload)
            console.log("responseData", responseData)
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
            toast("Failed!", {
                description: error?.message,
                position: "top-right",
            })
        } finally {
            setLoading(false)
        }

    }
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


    const validationSchema = Yup.object().shape({
        name: Yup.string().required("name is required").trim().transform(value => value.toLowerCase()),
        email: Yup.string().email('Invalid email').required("email is required").trim().transform(value => value.toLowerCase()),
        mobNo: Yup.string().matches(phoneRegExp, 'Phone number is not valid').trim(),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters long.') // Minimum length 8
            .max(20, 'Password must be no longer than 20 characters.') // Maximum length 20
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.') // At least one uppercase letter
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter.') // At least one lowercase letter
            .matches(/\d/, 'Password must contain at least one number.') // At least one number
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character.') // At least one special character
            .matches(/^\S*$/, 'Password cannot contain spaces.')
            .required('password is required')
            .trim()
        , // No spaces allowed
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'passwords must match').required('password is required')
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            mobNo:'',
            password: "",
            confirmPassword: ""
        },
        validationSchema,
        onSubmit: handleSubmit
    })


    console.log("Formik values", formik.values)
    console.log("Formik errors", formik.errors)
    console.log("Formik touched", formik.touched)


    
    const handleLoginSuccess = (response) => {
        console.log('Login Success:', response);
        // You can send the response.tokenId to your backend to verify and authenticate the user.
    };

    const handleLoginFailure = (error) => {
        console.error('Login Failed:', error);
    };

    const handleFacebookCallback = (response) => {
        if (response?.status === "unknown") {
            console.error("error:facebook", 'Sorry!', 'Something went wrong with facebook Login.');
            return;
        }
        console.log("response", response);

    }

    if (isAuthentication) {
        return <ComponentLoading />
    }


    return (
        <div className="flex h-[100vh] justify-center items-center p-3">
            {isLoading && <ButtonLoading />}

            <Card className="w-[380px]">

                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>
                        Enter your email below to register
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="">
                                    <div className="">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-2 pointer-events-none">
                                                <User className="" />
                                            </div>
                                            <Input type="text" className=" !ps-10" id="name" name="name" placeholder="your name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        </div>
                                        {formik.touched.name && formik.errors.name && (
                                            <div className="text-red-500 text-sm" >{formik.errors.name}</div>
                                        )}
                                    </div>
                                    <div className="mt-5">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-2 pointer-events-none">
                                                <MailOpen className="" />
                                            </div>
                                            <Input type="email" className=" !ps-10" id="email" name="email" placeholder="example@email.com" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        </div>
                                        {formik.touched.email && formik.errors.email && (
                                            <div className="text-red-500 text-sm" >{formik.errors.email}</div>
                                        )}
                                    </div>
                                    <div className="mt-5">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-2 pointer-events-none">
                                                <MobileIcon className="" />
                                            </div>
                                            <Input type="text" className=" !ps-10" id="mobNo" name="mobNo" placeholder="ex:9874561230" value={formik.values.mobNo} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        </div>
                                        {formik.touched.mobNo && formik.errors.mobNo && (
                                            <div className="text-red-500 text-sm" >{formik.errors.mobNo}</div>
                                        )}
                                    </div>
                                    <div className="mt-5">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-2 pointer-events-none">
                                                <Lock />
                                            </div>
                                            <Input className=" !ps-10" id="password" name="password" type="password" placeholder="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        </div>
                                        {formik.touched.password && formik.errors.password && (
                                            <div className="text-red-500 text-sm">{formik.errors.password}</div>
                                        )}
                                    </div>
                                    <div className="mt-5">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-2 pointer-events-none">
                                                <Lock />
                                            </div>
                                            <Input className=" !ps-10" id="confirmPassword" name="confirmPassword" type="password" placeholder="confirm password" value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        </div>
                                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                            <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
                                        )}
                                    </div>
                                    <div className=" mt-5">
                                        <Button className="w-[100%]" type="submit">Register</Button>
                                    </div>
                                    <div className="mt-5">
                                        <GoogleLogin
                                            onSuccess={credentialResponse => {
                                                console.log(credentialResponse?.credential);
                                                var decoded = jwtDecode(credentialResponse?.credential);
                                                console.log(decoded)
                                            }}
                                            onError={(error) => {
                                                console.log('Login Failed', error);
                                            }} />
                                    </div>
                                    {/* <div className="mt-5">
                                        <FacebookLogin
                                            buttonStyle={{ padding: "5px", width: "100%" }}
                                            appId="946726573608245"  // we need to get this from facebook developer console by setting the app.
                                            autoLoad={false}
                                            fields="name,email,picture"
                                            callback={handleFacebookCallback}
                                            icon="fa-facebook "
                                            textButton="Sign in with facebook"
                                        />
                                    </div> */}

                                </div>
                            </form>
                        </div>

                        <div className="my-5 float-right">
                            <p className="p-0 m-0" >
                                <span className="">
                                    <small>
                                        Already have an account? | <Link href={"login"}  >
                                            LogIn
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
