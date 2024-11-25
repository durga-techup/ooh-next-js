import { privateApi } from "../apiService"
import PayloadEncryption, { responseDecrypt } from "../payloadEncryption"


export const verifiyemailApi = async (payload) => {
    const encryptedData = PayloadEncryption(payload)
    try {
        const apiResponse = await privateApi.post("/api/auth/verify-email", encryptedData)
        return responseDecrypt(apiResponse)
    } catch (error) {
        return responseDecrypt(error)
    }

}