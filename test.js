const axios = require("axios");

async function testAPI() {
  try {
    // 1. CREATE JOB
    console.log("\n📝 Creating a job...");
    const createRes = await axios.post("http://localhost:5000/api/jobs", {
      title: "Senior Backend Developer",
      company: "Amazon",
      location: "Remote",
      salary: "15 LPA",
      description: "Build scalable cloud solutions"
    });
    console.log("✅ Job Created:", JSON.stringify(createRes.data, null, 2));
    const jobId = createRes.data._id;

    // 2. GET ALL JOBS
    console.log("\n📋 Fetching all jobs...");
    const getRes = await axios.get("http://localhost:5000/api/jobs");
    console.log("✅ Total Jobs:", getRes.data.length);

    // 3. UPDATE JOB
    console.log("\n✏️ Updating job salary...");
    const updateRes = await axios.put(`http://localhost:5000/api/jobs/${jobId}`, {
      salary: "18 LPA"
    });
    console.log("✅ Job Updated:", JSON.stringify(updateRes.data, null, 2));

    // 4. DELETE JOB
    console.log("\n🗑️ Deleting job...");
    const deleteRes = await axios.delete(`http://localhost:5000/api/jobs/${jobId}`);
    console.log("✅ Job Deleted:", JSON.stringify(deleteRes.data, null, 2));
    
    console.log("\n🎉 ALL TESTS PASSED!");

  } catch (error) {
    console.error("❌ Error Detail:", {
      message: error.message,
      statusCode: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
  }
}

testAPI();
