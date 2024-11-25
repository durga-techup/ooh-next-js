import { privateApi } from "../apiService"
import PayloadEncryption, { responseDecrypt } from "../payloadEncryption"


export const getAllusersAPI = async (payload) => {
    // const encryptedData = PayloadEncryption(payload)
    try {
        const apiResponse = await privateApi.get("/api/users",{
            params: {
                page: payload?.currentPage,
                limit: payload?.itemsPerPage,
              },
        })
        return responseDecrypt(apiResponse)
    } catch (error) {
        return responseDecrypt(error)
    }

}