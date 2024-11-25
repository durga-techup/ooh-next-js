import CryptoJS from "crypto-js";

export const payloadDecrypt = async (encryptedData) => {
        // Decrypt the payload with the same key
        if (process.env.NEXT_PUBLIC_Development_MODE=="production") {

            const bytes =  CryptoJS.AES.decrypt(encryptedData, process.env.NEXT_PUBLIC_ENCRYPT_SECRET_KEY);
            const decryptedData =  bytes.toString(CryptoJS.enc.Utf8); // Convert to a UTF-8 string
            return JSON.parse(decryptedData); // Parse the decrypted JSON string back into an object
        }else{
            return  encryptedData // Parse the decrypted JSON string back into an object

        }
      
}

export const responseEncrypt = (reponseData) => {
    if (process.env.NEXT_PUBLIC_Development_MODE=="production") {

        const responseString = JSON.stringify(reponseData); // Convert payload to JSON string
        const encryptedData = CryptoJS.AES.encrypt(responseString, process.env.NEXT_PUBLIC_ENCRYPT_SECRET_KEY).toString(); // Encrypt the payload
        return encryptedData;

    }else{
     return   reponseData
    }
   
}


