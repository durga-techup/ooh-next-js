import connectDB from '@/DB/connectDB';
// import User from '@/model/User';
import Joi from 'joi';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import User from '../../model/User';
import AuthCheck from '../../(middleware)/auth';
import { apiFinalResponse } from '../../../../backend.utils/apiResponse';





export async function GET(req) {
    await connectDB();
    // const { email, password } = await req.json();
    // const { error } = schema.validate({ email, password });
    // if (error) return NextResponse.json({ success: false, message: error.details[0].message.replace(/['"]+/g, '') });
    try {
        const isAuthenticated = await AuthCheck(req);
        if (isAuthenticated) {
    const {searchParams} = await req.nextUrl

            // const users = await User.find({}, { name: 1, email: 1, role: 1 })
            // console.log("req?.params",searchParams)

            // console.log("req?.limit",data?.limit)
            const limit = searchParams.get('limit');
            const page = searchParams.get('page');
            const limitValue = limit || 2;
            const pageNo = page || 1;
            const offset = (pageNo - 1) * limitValue;


            const users = await User.find({}, { password:0,email_verification_token_expires:0,email_verification_token:0,
                mobile_verification_otp: 0,
                mobile_verification_otp_expires: 0,
             }).sort({ createdAt: -1 })
                .limit(limitValue).skip(offset).exec()

            return NextResponse.json(apiFinalResponse({ success: true, outdata: users, total: await User.countDocuments() }))
        } else {
            return NextResponse.json(apiFinalResponse({ success: false, message: "You are not authorized Please login!" }));
        }

    } catch (error) {
        console.log('Error in register (server) => ', error);
        return NextResponse.json(apiFinalResponse({ success: false, message: "Something Went Wrong Please Retry Later !" }))
    }
}
