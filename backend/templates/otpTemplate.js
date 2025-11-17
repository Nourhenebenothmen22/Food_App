module.exports = (otp, title = "Your Verification Code") => `
  <div style="font-family: Arial; padding:20px;">
    <h2>${title}</h2>
    <p>Your OTP code:</p>
    <h1 style="background:#222; color:#fff; display:inline-block; padding:10px 20px; border-radius:5px;">
      ${otp}
    </h1>
    <p>This code expires in <b>5 minutes</b>.</p>
  </div>
`;
