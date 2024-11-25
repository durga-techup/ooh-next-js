// pages/api/_middleware.js
// import logger from './backend.utils/logger';
export const config = {
  runtime: 'experimental-edge', // Ensure this route runs in the Edge runtime
};

import { NextResponse } from 'next/server';

import winston from 'winston';

//   function privateMiddleware(req) {
//   // You can check for headers, query params, etc.
//   const token = req.headers.get('Authorization');
  
//   if (!token || token !== 'Bearer your-secret-token') {
//     return new NextResponse('Unauthorized', { status: 401 });
//   }
//   // Continue to the API route if authorized
//   return NextResponse.next();
// }

 function publicMiddleware(req) {
  // You can check for headers, query params, etc.
  // const token = req.headers.get('Authorization');
  
  // if (!token || token !== 'Bearer your-secret-token') {
  //   return new NextResponse('Unauthorized', { status: 401 });
  // }
  // Continue to the API route if authorized
  return NextResponse.next();
}

// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.combine(
//     winston.format.colorize(),
//     winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//     winston.format.printf(
//       ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
//     )
//   ),
//   // transports: [
//   //   new winston.transports.Console(),
//   //   // new winston.transports.File({ filename: 'logs/app.log' })
//   // ],
  
// });

// function logRequest(request) {
//   // console.log('Logging request:', request.url);
//   // logger.log('info', 'test message %s', 'my string');

//   return NextResponse.next();
// }

export function middleware(request) {
  // Public routes
  console.log(request.nextUrl.pathname)
  if (request.nextUrl.pathname === '/api/auth/login' || request.nextUrl.pathname === '/api/auth/register') {
    return publicMiddleware(request); // Apply public middleware
  }
  // Private routes
  // if (request.nextUrl.pathname === '/api/users' || request.nextUrl.pathname === '/api/dashboard/profile') {
  //   return logRequest(request); // Apply private middleware
  // }

  // Default: continue with the request
  return NextResponse.next();
}


// export function middleware(req) {
//   // You can check for headers, query params, etc.
//   const token = req.headers.get('Authorization');
  
//   if (!token || token !== 'Bearer your-secret-token') {
//     return new NextResponse('Unauthorized', { status: 401 });
//   }
//   // Continue to the API route if authorized
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/'],  // Apply this middleware to API routes starting with '/api/protected'
// };

// export const config = [
//   {
//     matcher: ['/api/auth/:path*'], // Apply publicMiddleware to login/signup
//     handler: privateMiddleware,
//   },
//   {
//     matcher: ['/api/dashboard/:path*'], // Apply privateMiddleware to dashboard/profile
//     handler: privateMiddleware,
//   },
// ];


// import connectDB from '@/DB/connectDB';
// import dynamic from 'next/dynamic';

// // Dynamically import mongoose to ensure it's only available on the server-side
// const mongoose = dynamic(() => import('mongoose'), { ssr: false });


// export async function middleware (req, res, next) {

//  try {
//   //  await connectDB();
   
//    // Start a session
//    const session = await mongoose.startSession();
//    session.startTransaction();
 
//    try {
//      // Attach the session to the request object for access in the route handler
//      req.session = session;
 
//      // Call the next middleware/route handler
//      await NextResponse.next();
 
//      // Commit the transaction if all operations succeeded
//      await session.commitTransaction();
//    } catch (error) {
//      // If something goes wrong, abort the transaction
//      console.error('Transaction failed:', error);
//      await session.abortTransaction();
 
//      // Send a generic error response to the client
//      return NextResponse.status(500).json({
//        success: false,
//        message: 'Internal server error occurred during transaction.',
//      });
//    } finally {
//      // End the session (whether the transaction was successful or failed)
//      session.endSession();
//    }
//  } catch (error) {
//   return NextResponse.json({
//     success: false,
//     message: error.message,
//   });
//  }
// };
