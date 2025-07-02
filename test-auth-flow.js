import axios from 'axios';

// Configure axios for testing
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

async function testAuthFlow() {
  try {
    console.log('🧪 Testing Authentication Flow...\n');

    // Test 1: Register a new user
    console.log('📝 Step 1: Registering a test user...');
    const registerData = {
      username: 'testuser',
      name: 'Test',
      lastName: 'User',
      phone: '1234567890',
      email: 'test@example.com',
      password: 'password123'
    };

    try {
      const registerResponse = await axios.post('/api/auth/register', registerData);
      console.log('✅ Registration successful!');
      console.log('User:', registerResponse.data.user);
    } catch (err) {
      if (err.response?.status === 400 && err.response?.data?.msg === 'User already exists') {
        console.log('ℹ️  User already exists, proceeding to login...');
      } else {
        console.log('❌ Registration failed:', err.response?.data?.msg || err.message);
        return;
      }
    }

    // Test 2: Login
    console.log('\n🔐 Step 2: Logging in...');
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };

    const loginResponse = await axios.post('/api/auth/login', loginData);
    console.log('✅ Login successful!');
    console.log('User:', loginResponse.data.user);

    // Test 3: Check authentication status
    console.log('\n🔍 Step 3: Checking authentication status...');
    const authResponse = await axios.get('/api/auth');
    console.log('✅ Auth check successful!');
    console.log('Authenticated user:', authResponse.data);

    // Test 4: Test protected route (get accommodations)
    console.log('\n🏠 Step 4: Testing accommodations endpoint...');
    const accommodationsResponse = await axios.get('/api/accommodations');
    console.log('✅ Accommodations fetched successfully!');
    console.log(`Found ${accommodationsResponse.data.length} accommodations`);

    // Test 5: Attempt to create a booking
    console.log('\n📅 Step 5: Testing booking creation...');
    
    if (accommodationsResponse.data.length > 0) {
      const accommodation = accommodationsResponse.data[0];
      const bookingData = {
        accommodationId: accommodation._id,
        startDate: '2025-07-10',
        endDate: '2025-07-12',
        guestName: 'Test User',
        guestEmail: 'test@example.com',
        totalPrice: accommodation.price * 2
      };

      const bookingResponse = await axios.post('/api/bookings', bookingData);
      console.log('✅ Booking created successfully!');
      console.log('Booking ID:', bookingResponse.data._id);
    } else {
      console.log('⚠️  No accommodations available for booking test');
    }

    console.log('\n🎉 All tests passed! Authentication flow is working correctly.');

  } catch (error) {
    console.log('\n❌ Test failed:');
    console.log('Status:', error.response?.status);
    console.log('Message:', error.response?.data?.msg || error.message);
    console.log('Data:', error.response?.data);
  }
}

testAuthFlow();
