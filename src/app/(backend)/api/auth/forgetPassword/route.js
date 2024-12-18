// import User from '@/model/User';
import connectDB from '@/DB/connectDB';
import Joi from 'joi';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import User from '../../../model/User';
import { apiFinalResponse } from '../../../../../backend.utils/apiResponse';

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

export async function POST(req) {
    await connectDB();
    // const { email, password } = await req.json();
    const encryptedData  = await req.json();
    const decryptedPayload = payloadDecrypt(encryptedData)
    const { email, password }   =decryptedPayload
    const { error } = schema.validate({ email, password });
    if (error) return NextResponse.json(apiFinalResponse({ success: false, message: error.details[0].message.replace(/['"]+/g, '') }));
    // if (email === 'mrmoiz.dev@gmail.com') return NextResponse.json({ success: true, message: "Password Updated Successfully" });
    try {
        const ifExist = await User.findOne({ email });
        if (ifExist?.role === 'admin') return NextResponse.json(apiFinalResponse({ success: true, message: "Password Updated Successfully" }));
        if (!ifExist) return NextResponse.json(apiFinalResponse({ success: false, message: "Email Not Found" }));
        const hashedPassword = await hash(password, 12)
        const updatePassword = await User.findOneAndUpdate({ email, password: hashedPassword });
        return NextResponse.json(apiFinalResponse({ success: true, message: "Password Updated Successfully" }));

    } catch (error) {
        console.log('Error in forget Password (server) => ', error);
        return NextResponse.json(apiFinalResponse({ success: false, message: "Something Went Wrong Please Retry Later !" }))
    }
}

