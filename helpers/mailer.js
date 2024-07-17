const nodemailer = require("nodemailer");
const {google} = require('googleapis');

const {OAuth2} = google.auth
const oauth_link = "https://developers.google.com/oauthplayground"
const {EMAIL, MAILING_ID, MAILING_SECRET, MAILING_REFRESH} = process.env

const auth = new OAuth2(
    MAILING_ID,
    MAILING_SECRET,
    MAILING_REFRESH,
    oauth_link
)

exports.sendVarifiedEmail = (email,name,url)=>{
   auth.setCredentials({
    refresh_token : MAILING_REFRESH
   })
   const accessToken = auth.getAccessToken()
   const stmp = nodemailer.createTransport(
    {
        service : "gmail",
        auth: {
          type: "OAuth2",
          user: EMAIL,
          clientId: MAILING_ID,
          clientSecret: MAILING_SECRET,
          refreshToken: MAILING_REFRESH,
          accessToken: accessToken,
        }
    }
   )
   const mailOptions = {
     from : EMAIL,
     to : email,
     subject : "Chat Barta varification",
     html : `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Email Verification</title><style>body,html{margin:0;padding:0;font-family:Arial,sans-serif;line-height:1.6;background-color:#f7f7f7}.email-container{max-width:600px;margin:0 auto;padding:20px;background-color:#fff;border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,.1)}.logo{text-align:center;margin-bottom:20px}h1{color:#007bff;text-align:center;margin-bottom:20px}p{color:#555;margin-bottom:20px;text-align:center}.btn{display:inline-block;padding:10px 20px;background-color:#007bff;color:#fff;text-decoration:none;border-radius:4px;text-align:center;margin-left:225px;transition:background-color .3s ease}.btn:hover{background-color:#0056b3}.footer{text-align:center;margin-top:20px;color:#888;font-size:12px}</style></head><body><div class="email-container"><div class="logo"><h1>Chat Barta</h1></div><h1>Email Verification</h1><p>Thank you ${name} for signing up! Please verify your email address to activate your account.</p><p>Click the button below to verify your email:</p><a href=${url} class="btn">Verify Email</a><p>If you did not create an account, please disregard this email.</p><p class="footer">This email was sent from Chat Barta. If you have any questions, please<a href="https://theabrardev.netlify.app">contact us</a>.</p></div></body></html>`
   }
   stmp.sendMail(mailOptions, (err,res)=>{
         if(err) return err;
         return res;
   })

}


exports.sentResetPasswordCode = (email,name,code)=>{
  auth.setCredentials({
   refresh_token : MAILING_REFRESH
  })
  const accessToken = auth.getAccessToken()
  const stmp = nodemailer.createTransport(
   {
       service : "gmail",
       auth: {
         type: "OAuth2",
         user: EMAIL,
         clientId: MAILING_ID,
         clientSecret: MAILING_SECRET,
         refreshToken: MAILING_REFRESH,
         accessToken: accessToken,
       }
   }
  )
  const mailOptions = {
    from : EMAIL,
    to : email,
    subject : "Chat Barta Reset Password",
    html : `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Email Verification</title><style>body,html{margin:0;padding:0;font-family:Arial,sans-serif;line-height:1.6;background-color:#f7f7f7}.email-container{max-width:600px;margin:0 auto;padding:20px;background-color:#fff;border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,.1)}.logo{text-align:center;margin-bottom:20px}h1{color:#007bff;text-align:center;margin-bottom:20px}p{color:#555;margin-bottom:20px;text-align:center}.btn{display:inline-block;padding:10px 20px;color:#000;font-size:60px;text-align:center;margin-left:225px;}.footer{text-align:center;margin-top:20px;color:#888;font-size:12px}</style></head><body><div class="email-container"><div class="logo"><h1>Chat Barta</h1></div><h1>Reset Password</h1><p>Thank you ${name} for signing up! Please verify your password to activate your account.</p><p>Your Code is Here</p><a class="btn">${code}</a><p>If you did not create New Password, please disregard this email.</p><p class="footer">This email was sent from Chat Barta. If you have any questions, please<a href="https://theabrardev.netlify.app">contact us</a>.</p></div></body></html>
    </html>`
  }
  stmp.sendMail(mailOptions, (err,res)=>{
        if(err) return err;
        return res;
  })

}