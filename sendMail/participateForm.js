// const nodemailer = require("nodemailer");

// const sendParticipateEmail = async (data) => {
//   const {
//     name,
//     street,
//     zipcode,
//     city,
//     country,
//     nationality,
//     phone,
//     mail,
//     iban,
//     onBehalfOf,
//     tin,
//     idType,
//     idNumber,
//     dateOfBirth,
//     initialDeposit,
//   } = data;

//   const html = `
//    <!DOCTYPE html>
//     <html lang="en">
//       <head>
//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>Participation Request</title>
//       </head>
//       <body>
//         <div style="padding: 2rem; font-family: Arial, sans-serif; background-color: #f0f8ff;">
//           <h2 style="color: #2980b9;">🙋 Participation Request</h2>
//           <ul>
//             <li><strong>Name:</strong> ${name}</li>
//             <li><strong>City:</strong> ${city}</li>
//             <li><strong>Country:</strong> ${country}</li>
//             <li><strong>Nationality:</strong> ${nationality}</li>
//             <li><strong>Street:</strong> ${street}</li>
//             <li><strong>Zip code:</strong> ${zipcode}</li>
//             <li><strong>Phone Number:</strong> ${phone}</li>
//             <li><strong>Date Of Birth:</strong> ${dateOfBirth}</li>
//             <li><strong>iban:</strong> ${iban}</li>
//             <li><strong>On Behalf Of:</strong> ${onBehalfOf}</li>
//             <li><strong>tin:</strong> ${tin}</li>
//             <li><strong>idType:</strong> ${idType}</li>
//             <li><strong>idNumber:</strong> ${idNumber}</li>
//             <li><strong>initialDeposit:</strong> ${initialDeposit}</li>
//             <li><strong>Email:</strong> ${mail}</li>
//           </ul>
//         </div>
//       </body>
//     </html>
//   `;

//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: "salaudeenoluwapelumi98@gmail.com",
//         pass: "xqesplvduzdmmrsl",
//       },
//       tls: {
//         rejectUnauthorized: false,
//       },
//     });

//     const mailOptions = {
//       from: "salaudeenoluwapelumi98@gmail.com",
//       to: ["salaudeenoluwapelumi98@gmail.com"],
//       subject: `📩 Query Submission from ${name}`,
//       html,
//     };

//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.error("Error sending query email:", error.message);
//     throw new Error("Email failed to send.");
//   }
// };

// module.exports = sendParticipateEmail;

const nodemailer = require("nodemailer");

const sendParticipateEmail = async (data) => {
  const {
    name,
    street,
    zipcode,
    city,
    country,
    nationality,
    phone,
    mail,
    iban,
    onBehalfOf,
    tin,
    idType,
    idNumber,
    dateOfBirth,
    initialDeposit,
  } = data;

  const html = `
   <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Participation Request</title>
      </head>
      <body>
        <div style="padding: 2rem; font-family: Arial, sans-serif; background-color: #f0f8ff;">
          <h2 style="color: #2980b9;">🙋 Participation Request</h2>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>City:</strong> ${city}</li>
            <li><strong>Country:</strong> ${country}</li>
            <li><strong>Nationality:</strong> ${nationality}</li>
            <li><strong>Street:</strong> ${street}</li>
            <li><strong>Zip code:</strong> ${zipcode}</li>
            <li><strong>Phone Number:</strong> ${phone}</li>
            <li><strong>Date Of Birth:</strong> ${dateOfBirth}</li>
            <li><strong>iban:</strong> ${iban}</li>
            <li><strong>On Behalf Of:</strong> ${onBehalfOf}</li>
            <li><strong>tin:</strong> ${tin}</li>
            <li><strong>idType:</strong> ${idType}</li>
            <li><strong>idNumber:</strong> ${idNumber}</li>
            <li><strong>initialDeposit:</strong> ${initialDeposit}</li>
            <li><strong>Email:</strong> ${mail}</li>
          </ul>
        </div>
      </body>
    </html>
  `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "anthonyadewuyi01@gmail.com",
        pass: "eulcysakrwjpfvwv",
        // user: "salaudeenoluwapelumi98@gmail.com",
        // pass: "xqesplvduzdmmrsl",
      },
      tls: {
        rejectUnauthorized: false,
      },
  });

  const mailOptions = {
    from: `anthonyadewuyi01@gmail.com`,
    to: ["salaudeenoluwapelumi98@gmail.com", "info@edgenext.nl"],
    subject: `📩 Query Submission from ${name}`,
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendParticipateEmail;
