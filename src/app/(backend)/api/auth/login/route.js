import connectDB from '@/DB/connectDB';
// import User from '@/model/User';
import Joi from 'joi';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import User from '../../../model/User';
import CryptoJS from 'crypto-js';
import { apiFinalResponse } from '../../../../../backend.utils/apiResponse';
import { payloadDecrypt } from '../../../../../backend.utils/encryption';

import * as Twilio from 'twilio';
// const accountSid = NEXT_PUBLIC_accountSid
// const authToken = NEXT_PUBLIC_authToken
// const client = Twilio(accountSid, authToken);

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});



export async function POST(req) {
    await connectDB();
    // const { email, password } = await req.json();
    const encryptedData = await req.json();
    const decryptedPayload = await payloadDecrypt(encryptedData)
    console.log(decryptedPayload)
    const { email, password } = (decryptedPayload)
    const { error } = schema.validate({ email, password });

    if (error) return NextResponse.json(apiFinalResponse({ success: false, message: error.details[0].message.replace(/['"]+/g, '') }));
    // const sendSMS = () => {
    //     client.messages
    //         .create({
    //             to: '+919424359132',
    //             from: '+15015047117',
    //             body: 'Hi I am from Next JS app',
    //         })
    //         .then((data) => {
    //             // Access details about the last request
    //             console.log("data",data)
    //             // console.log(client.lastRequest.method);
    //             // console.log(client.lastRequest.url);
    //             // console.log(client.lastRequest.auth);
    //             // console.log(client.lastRequest.params);
    //             // console.log(client.lastRequest.headers);
    //             // console.log(client.lastRequest.data);

    //             // Access details about the last response
    //             // console.log(client.httpClient.lastResponse.statusCode);
    //             // console.log(client.httpClient.lastResponse.body);
    //         });

    // }

    try {
        // sendSMS()
        const checkUser = await User.findOne({ email, isVerifiedEmail: true });
        if (!checkUser) return NextResponse.json(apiFinalResponse({ success: false, message: "Account not Found" }));
        const isMatch = await compare(password, checkUser.password);
        if (!isMatch) return NextResponse.json(apiFinalResponse({ success: false, message: "Incorrect Password" }));
        const token = jwt.sign({ id: checkUser._id, email: checkUser.email, role: checkUser?.role }, process.env.NEXT_PUBLIC_JWT_SECRET ?? 'default_secret_dumbScret', { expiresIn: '1d' });
        const finalData = { token, user: { email: checkUser.email, name: checkUser.name, _id: checkUser._id, role: checkUser?.role } }
        return NextResponse.json(apiFinalResponse({ success: true, message: "Login Successfull", finalData }))

    } catch (error) {
        console.log('Error in register (server) => ', error);
        return NextResponse.json(apiFinalResponse({ success: false, message: "Something Went Wrong Please Retry Later !" }))
    }
}
