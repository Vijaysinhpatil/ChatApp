import { resendClient, sender } from "../config/resend.js"
import { createWelcomeEmailTemplate } from "./emailTempletes.js"

export const sendwelcomeEmail = async(email , name , clientURL) => {

    const { data , error } = await resendClient.emails.send({

        from : `${ sender.name } <${sender.email}>`,
        to : email,
        subject : "Welcome to ChatApp",
        html : createWelcomeEmailTemplate(name , clientURL)
    });

    if(error)
    {
        console.log("Error sending Welcome Email : " , error);
        throw new Error("Failed to send welcome email :")
    }
    console.log("Welcome Email send Successfully" , data);
    
}