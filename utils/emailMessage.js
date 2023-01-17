const theme = {
  bg: "#fff", // modal
  bgMain: "#0E8DF0", // top nav & middle btn
  mainText: "#036BE2", // title color
  secondText: "#fff", // top nav % middle text
};
const title = process.env.APP_NAME;

const forgotPassword = ({ resetLink }) => {
  return `
  <body style="
    font-family:poppins, sans-serif, arial;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: ${theme.bg};
    background-position: center;" 
    
    marginheight="0" 
    topmargin="0" 
    marginwidth="0"  leftmargin="0">
    <!--100% body table-->
    <div style="height: 80px"></div>
    <div>
      <table style="
      background-color: #FFF3F3; max-width: 670px; margin: 0 auto" width="100%" border="0"
            align="center" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style="
                      max-width: 670px;
                      background: #FEFEFF;
                      text-align: center;
                      border: solid 3px #EFEFEA;
                      border-radius: 10px;
                    ">
                    <tr>
              <td 
              style="text-align: left; 
                background: ${theme.bgMain}; 
                  color: ${theme.secondText};
                  padding-left:35px">
                <h2>${title} App</h2>
              </td>
            </tr>
                  <tr>
                    <td style="height: 40px">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="padding: 0 35px">
                      <h1 style="
                            color: ${theme.mainText};
                            font-weight: 600;
                            margin: 0;
                            font-size: 32px;
                            font-family: 'Rubik', sans-serif;
                          ">
                        Password Reset
                      </h1>
            <br style="margin-top: 10px" />
                      <p style="
                            color: #202124;
                            font-size: 15px;
                            line-height: 24px;
                            margin: 0;
                            text-align: left;
                          ">
                        We received a request to reset the password of this email. Click the button below to set your new password.
                      </p>
    
    
                      <a 
                        href=${resetLink}
                        style="
                          background: ${theme.bgMain};
                          text-decoration: none !important;
                          font-weight: 500;
                          letter-spacing: 1.5px;
                          margin: 15px 0px;
                          color: #fff;
                          font-size: 15px;
                          padding: 10px 24px;
                          display: inline-block;
                          border-radius: 2px;
                        ">Reset my password
                      </a>
                      <br />
                      <p style="
                        color: #202124;
                        font-size: 15px;
                        line-height: 24px;
                        margin: 0;
                        text-align: left;
                      ">
                      If you don't want to reset your password, you can safely ignore this email and your password won't reset.
                    </p>
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="height: 40px">&nbsp;</td>
                  </tr>
                  
                </table>
              </td>
            </tr>
            
          </table>
          <div>
          <p style="
            font-size: 14px;
            text-align: center;
            color: black;">
          &copy; 2022 ${title} app. All rights reserved. 
          </p>
          </div>
    </div>
  <div style="height: 80px"></div>
  
  </body>
  `;
};

const verifyEmail = (firstName, oldEmail, newEmail, otpCode) => {
  const message = `
  <body style="
    font-family:poppins, sans-serif, arial;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: ${theme.bg};
    background-position: center;" 
    
    marginheight="0" 
    topmargin="0" 
    marginwidth="0"  leftmargin="0">
    <!--100% body table-->
    <div style="height: 80px"></div>
    <div>
      <table style="
      background-color: #FFF3F3; max-width: 670px; margin: 0 auto" width="100%" border="0"
            align="center" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style="
                      max-width: 670px;
                      background: #FEFEFF;
                      text-align: center;
                      border: solid 3px #EFEFEA;
                      border-radius: 10px;
                    ">
                    <tr>
              <td 
              style="text-align: left; 
                background: ${theme.bgMain}; 
                  color: ${theme.secondText};
                  padding-left:35px">
                <h2>${title} App</h2>
              </td>
            </tr>
                  <tr>
                    <td style="height: 40px">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="padding: 0 35px">
                      <h1 style="
                            color: ${theme.mainText};
                            font-weight: 600;
                            margin: 0;
                            font-size: 32px;
                            font-family: 'Rubik', sans-serif;
                          ">
                        Password Reset
                      </h1>
            <br style="margin-top: 10px" />
                      <p style="
                            color: #202124;
                            font-size: 15px;
                            line-height: 24px;
                            margin: 0;
                            text-align: left;
                          ">
                          Hi ${firstName},<br>
                          You have requested to change email address on your ${title} Account from
                          ${oldEmail} to ${newEmail}. <br>
                          Please confirm within an hour to complete the change.
                      </p>
    
                      <p style="
                      background: ${theme.bgMain};
                      text-decoration: none !important;
                      font-weight: 500;
                      letter-spacing: 1.5px;
                      margin: 15px 0px;
                      color: ${theme.secondText};
                      font-size: 15px;
                      padding: 10px 24px;
                      display: inline-block;
                      border-radius: 2px;
                    ">${otpCode}</p>
                      <br />
                      <p style="
                        color: #202124;
                        font-size: 15px;
                        line-height: 24px;
                        margin: 0;
                        text-align: left;
                      ">
                      If this is not you, Disregard this email.
                    </p>
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="height: 40px">&nbsp;</td>
                  </tr>
                  
                </table>
              </td>
            </tr>
            
          </table>
          <div>
          <p style="
            font-size: 14px;
            text-align: center;
            color: black;">
          &copy; 2022 ${title} app. All rights reserved. 
          </p>
          </div>
    </div>
  <div style="height: 80px"></div>
  
  </body>
  `;
  return message;
};

module.exports = { forgotPassword, verifyEmail };
