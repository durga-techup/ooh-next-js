import { responseEncrypt } from "./encryption"


export const apiFinalResponse = (responseData) => {
    return responseEncrypt(responseData)
}