const axios = require("axios");

async function test() {
  try {
    const res = await axios.post("http://localhost:3000/api/progress", {
      questId: 1,
      code: "test"
    });
    console.log("POST SUCCESS:", res.data);
    
    const getRes = await axios.get("http://localhost:3000/api/progress");
    console.log("GET SUCCESS:", getRes.data);
  } catch (err) {
    console.log("ERROR:", err.response ? err.response.data : err.message);
  }
}

test();
