import jwt from 'jsonwebtoken';

const AuthCheck = async (req) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return false;
  }
  try {
    const decoded = await jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET ?? 'default_secret_dumbScret');
    if (decoded) return decoded?.role
  } catch (error) {
    return false
  }
}

export default AuthCheck;
