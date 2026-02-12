const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

// Test data
const timestamp = Date.now();
const testUser = {
  username: `testuser_${timestamp}`,
  email: `test_${timestamp}@example.com`,
  password: 'password123'
};

async function testAuthentication() {
  try {
    console.log('🧪 Testing Authentication & Authorization\n');
    
    // 1. Test Register
    console.log('1️⃣ Testing REGISTER endpoint...');
    const registerRes = await axios.post(`${API_URL}/auth/register`, testUser);
    console.log('✅ Registration successful');
    console.log('Response:', JSON.stringify(registerRes.data, null, 2));
    const token = registerRes.data.token;
    console.log('Token received:', token.substring(0, 20) + '...\n');
    
    // 2. Test Login
    console.log('2️⃣ Testing LOGIN endpoint...');
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ Login successful');
    console.log('Response:', JSON.stringify(loginRes.data, null, 2));
    const loginToken = loginRes.data.token;
    console.log('Token received:', loginToken.substring(0, 20) + '...\n');
    
    // 3. Test Authorization with Job endpoints
    console.log('3️⃣ Testing AUTHORIZATION (Protected Job endpoints)...');
    
    // Without token - should fail
    console.log('   a) Testing WITHOUT token...');
    try {
      await axios.get(`${API_URL}/jobs`);
      console.log('⚠️  Job endpoint accessible without token (Authorization may not be enforced)');
    } catch (err) {
      console.log('✅ Correctly rejected request without token:', err.response?.status);
    }
    
    // With token - should succeed
    console.log('   b) Testing WITH valid token...');
    const jobRes = await axios.get(`${API_URL}/jobs`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Successful request with token');
    console.log('Jobs:', JSON.stringify(jobRes.data, null, 2));
    
    // Invalid token - should fail
    console.log('   c) Testing WITH invalid token...');
    try {
      await axios.get(`${API_URL}/jobs`, {
        headers: {
          'Authorization': 'Bearer invalid_token_12345'
        }
      });
      console.log('⚠️  Accepted invalid token');
    } catch (err) {
      console.log('✅ Correctly rejected invalid token:', err.response?.status, err.response?.data?.error);
    }
    
    console.log('\n✨ Authentication & Authorization tests completed!');
    
  } catch (error) {
    console.error('❌ Error during testing:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Error data:', error.response.data);
      if (error.response.data.error) {
        console.error('Error message:', error.response.data.error);
      }
    } else if (error.request) {
      console.error('No response from server');
      console.error(error.message);
    } else {
      console.error(error.message);
    }
  }
}

testAuthentication();
