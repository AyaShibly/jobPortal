const axios = require("axios");

axios.get("http://localhost:5000/").then(res => {
  console.log("✅ Health check PASSED:", res.data);
}).catch(err => {
  console.log("❌ Health check FAILED:", err.message);
});