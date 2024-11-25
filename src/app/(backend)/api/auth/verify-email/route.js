import connectDB from '@/DB/connectDB';
// import User from '@/model/User';
import Joi from 'joi';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import User from '../../../model/User';
import { apiFinalResponse } from '../../../../../backend.utils/apiResponse';
import { payloadDecrypt } from '../../../../../backend.utils/encryption';

const schema = Joi.object({
    email_verification_token: Joi.string().required(),
});



export async function POST(req) {
    await connectDB();
    // const { email, password } = await req.json();
    const encryptedData = await req.json();
    const decryptedPayload = payloadDecrypt(encryptedData)
    console.log(decryptedPayload)
    const { email_verification_token } = (decryptedPayload)
    const { error } = schema.validate({ email_verification_token });
    if (error) return NextResponse.json(apiFinalResponse({ success: false, message: error.details[0].message.replace(/['"]+/g, '') }));

    try {
        const checkUser = await User.findOneAndUpdate(
            {
                email_verification_token,
                email_verification_token_expires: { $gte: Date.now() },
                isVerifiedEmail: false,
            }, {
            isVerifiedEmail: true,
        });
        if (!checkUser) {
            return NextResponse.json(apiFinalResponse({ success: false, message: "Something Went Wrong Please Retry Later!" }))
        }
        return NextResponse.json(apiFinalResponse({ success: true, message: "Email Verified Successfully" }))
    } catch (error) {
        console.log('Error in register (server) => ', error);
        return NextResponse.json(apiFinalResponse({ success: false, message: "Something Went Wrong Please Retry Later !" }))
    }
}
