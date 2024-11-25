import { privateApi } from "../apiService"
import PayloadEncryption, { responseDecrypt } from "../payloadEncryption"


export const registerApi = async (payload) => {
    const encryptedData = PayloadEncryption(payload)
    try {
        const apiResponse = await privateApi.post("/api/auth/register", encryptedData)
        return responseDecrypt(apiResponse)
    } catch (error) {
        return responseDecrypt(error)
    }

}