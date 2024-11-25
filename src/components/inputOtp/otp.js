import { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';

const InputOtp = (props) => {
    const { setOtp, otp } = props
    // console.log("otpotp",otp)
    // const [cotp,csetOTP]=useState(otp)
    // useEffect(()=>{
    //     csetOTP(otp)
    // },[otp])
    return <>
        <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} className='border text-black ' />}
            inputStyle={{ width: "3.0rem",height:"2.5rem" }}
            
            // containerStyle={{ borderWidth: "3px", padding: "1px", borderStyle: "solid", margin: "3px" }}
        />
        
    </>
}

export default InputOtp