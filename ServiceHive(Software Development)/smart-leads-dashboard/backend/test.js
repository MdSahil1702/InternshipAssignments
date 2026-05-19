const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.sahil.udloy2f.mongodb.net",
  (err, records) => {
    console.log("Error:", err);
    console.log("Records:", records);
  }
);