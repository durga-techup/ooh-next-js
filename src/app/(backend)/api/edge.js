// pages/api/edge.js
export const config = {
    runtime: 'edge',  // Tells Next.js that this function should run on the edge
  };
  
  export default function handler(request) {
    return new Response('Hello from the edge!', {
      status: 200,
    });
  }
  