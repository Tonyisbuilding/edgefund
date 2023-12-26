const sendAnswer =  (name, question1,question2,question3,question4) =>{
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          "
        >
          <div style="text-align: center;  background: linear-gradient(to bottom, #3182ce, #63b3ed); padding: 5rem;">
            <h3 style="font-family: 'Courier New', Courier, monospace; color: white; font-size: 1.2rem;">
              Response To Question From ${name}
            </h3>
            <ul style="list-style: none; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; color: white;">
              <li>Question 1: <span style="margin-left: 2rem;">${question1}</span> </li>
              <li>Question 2: <span style="margin-left: 2rem;">${question2}</span> </li>
              <li>Question 3: <span style="margin-left: 2rem;">${question3}</span> </li>
              <li>Question 4: <span style="margin-left: 2rem;">${question4}</span> </li>
            </ul>
          </div>
        </div>
      </body>
    </html>
    `
};

module.exports = sendAnswer;