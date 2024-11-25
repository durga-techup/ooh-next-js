import CryptoJS from "crypto-js";

export default function PayloadEncryption(payload) {
    if (process.env.NEXT_PUBLIC_Development_MODE=="production") {
        const payloadString = JSON.stringify(payload); // Convert payload to JSON string
        const encryptedData = CryptoJS.AES.encrypt(payloadString, process.env.NEXT_PUBLIC_ENCRYPT_SECRET_KEY).toString(); // Encrypt the payload
        return JSON.stringify(encryptedData);
    } else {
        return JSON.stringify( payload);

    }

}



export const responseDecrypt = (encryptedData) => {
    // Decrypt the payload with the same key
    if (process.env.NEXT_PUBLIC_Development_MODE=="production") {
        const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.NEXT_PUBLIC_ENCRYPT_SECRET_KEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8); // Convert to a UTF-8 string
        return JSON.parse(decryptedData); // Parse the decrypted JSON string back into an object
    } else {
        return  encryptedData
    }



}