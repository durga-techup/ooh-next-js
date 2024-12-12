import connectDB from '@/DB/connectDB';
// import User from '@/model/User';
import Joi from 'joi';
import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import User from '../../../model/User';
import { payloadDecrypt, responseEncrypt } from '../../../../../backend.utils/encryption';
import { apiFinalResponse } from '../../../../../backend.utils/apiResponse';
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import cron from 'node-cron';
import mongoose from 'mongoose';

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().required(),
    mobNo: Joi.string()
});

// atvs mtoo xnnf bpbz


const transporter = nodemailer.createTransport({
    // service: 'gmail',
    // user: "smtp.gmail.com",
    // port: 465,
    // secure: true,
    // auth: {
    //     user: "diurgeshselkari@gmail.com", // Your Gmail address
    //     pass: "atvs mtoo xnnf bpbz", // Your Gmail password
    // },

    host: 'localhost',  // MailCatcher runs on localhost
    port: 1025,         // MailCatcher's SMTP port
    secure: false,      // MailCatcher does not support SSL
    tls: {
        rejectUnauthorized: false,  // Ignore certificate errors (not necessary for MailCatcher)
    },
});

// cron.schedule("*/1 * * * *", async function () {
//     try {
//     const res=    await User.deleteMany({
//             isVerifiedEmail: false,
//             email_verification_token_expires: { $lte: Date.now() },
//         })
//         console.log(res)
//     } catch (error) {
//         console.log(error)

//     }

// });

// const startTransaction = async (req, res, next) => {
//     const session = await mongoose.startSession();  // Start a session
//     session.startTransaction();  // Begin the transaction

//     // Attach session to the request object
//     req.session = session;

//     // After the response finishes, either commit or rollback the transaction
//     res.on('finish', async () => {
//       if (res.statusCode >= 400) {
//         await session.abortTransaction();  // Rollback on failure
//       } else {
//         await session.commitTransaction();  // Commit on success
//       }
//       session.endSession();  // Close the session
//     });

//     next();
//   };

export async function POST(req, res) {
    await connectDB();
    const encryptedData = await req.json();
    const decryptedPayload = await payloadDecrypt(encryptedData)
    const { email, password, name, mobNo } = decryptedPayload
    // console.log("decryptedPayload",await decryptedPayload)
    const { error } = schema.validate({ email, password, name, mobNo });
    let payload = {
        email, password, name, mobNo,
        mobile_verification_otp: "",
        mobile_verification_otp_expires: Date.now(),
        isVerifiedMobile: false
    }
    console.log("decryptedPayload", payload)

    if (error) {
        return NextResponse.json(apiFinalResponse({ success: false, message: error.details[0].message.replace(/['"]+/g, '') }))
    };
    const hashedPassword = await hash(password, 12)
    payload["password"] = hashedPassword
    const email_verification_token = crypto.randomBytes(32).toString('hex');
    const email_verification_token_expires = Date.now() + 3600000; // Token expires in 1 hour
    const verificationUrl = `${process.env.NEXT_PUBLIC_FRONTEND_BASEURL}/verify-email/${email_verification_token}`;
    const mailOptions = {
        from: "diurgeshselkari@gmail.com",
        to: "diurgeshselkari@gmail.com",
        subject: 'Email Verification',
        html: `<h2>Welcome to Our Platform</h2><p>Click the link below to verify your email:</p><p><a href="${verificationUrl}">${verificationUrl}</a></p>`,
    };
    const session = await User.startSession();
    session.startTransaction();
    try {
        await User.deleteMany({
            isVerifiedEmail: false,
            email_verification_token_expires: { $lte: Date.now() },
        })
        const user = await User.findOne({ email });
        if (user) {
            if (user?.isVerifiedEmail) {
                throw new Error("User Already Exist");
            } else {
                let updateUser = await User.findOneAndUpdate({ email }, { ...payload, email_verification_token, email_verification_token_expires, role: 'user' }, { session });
                // updateUser = await User.findOneAndUpdate({ email }, { email: "tessd", name, password: hashedPassword, email_verification_token, email_verification_token_expires, role: 'user' },{session});
                await session.commitTransaction();
                session.endSession();
                await transporter.sendMail(mailOptions);
                // await session.abortTransaction();
                // session.endSession();
                if (updateUser) return NextResponse.json(apiFinalResponse({ success: false, message: "We have sent a verification link on provided email address, please Verify your email.0" }));
            }
        }
        else {
            const createUser = await User.create({ ...payload, email_verification_token, email_verification_token_expires, role: 'user' }, { session });
            await session.commitTransaction();
            session.endSession();
            await transporter.sendMail(mailOptions);
            if (createUser) return NextResponse.json(apiFinalResponse({ success: true, message: "We have sent a verification link on provided email address, please Verify your email." }));
        }
    } catch (error) {
        console.log('Error in register (server) => ', error);
        await session.abortTransaction();
        session.endSession();
        return NextResponse.json(apiFinalResponse({ success: false, message: error.message }))
    }



}

