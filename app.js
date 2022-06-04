const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title> Enter message </title> <head>");
    res.write(
      "<body><form action='/message' method='POST'> <input type='text' name='message'> <button type='submit'> Send </button> </form> </body>"
    );
    res.write("</html>");
    return res.end();
  }

  if ((req.url = "/message")) {
    const body = [];
    req.on("data", (chunk) => {
      console.log("chunk", chunk);
      body.push(chunk);
    });

    req.on("end", (chunk) => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      console.log(message);
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title> My first app </title> <head>");
  res.write("<body>Hello from my nodejs!!!</body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
