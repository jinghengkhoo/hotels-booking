import request from 'supertest';
import { randomBytes } from 'crypto';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from './app.js';

const randomString = (length) => randomBytes(length).toString('hex');
const randomBoolean = () => Math.random() < 0.5;
const randomArray = (length) => Array.from({ length }, () => generateRandomInput());

const generateRandomInput = () => {
  const inputTypes = ['string', 'number', 'boolean', 'object', 'array', 'null', 'undefined'];
  const randomType = inputTypes[Math.floor(Math.random() * inputTypes.length)];

  switch (randomType) {
    case 'string':
      return randomString(10);
    case 'number':
      return Math.floor(Math.random() * 10000) - 5000;
    case 'boolean':
      return randomBoolean();
    case 'object':
      return { key: randomString(5), value: generateRandomInput() };
    case 'array':
      return randomArray(5);
    case 'null':
      return null;
    case 'undefined':
      return undefined;
    default:
      return '';
  }
};

const generateRandomBookingData = () => ({
  email: `${randomString(10)}@example.com`,
  roomID: randomString(10),
  destinationID: randomString(10),
  hotelID: randomString(10),
  numberOfNights: Math.floor(Math.random() * 10) + 1,
  startDate: new Date(Date.now() + Math.floor(Math.random() * 10000000000)).toISOString(),
  endDate: new Date(Date.now() + Math.floor(Math.random() * 10000000000) + 100000).toISOString(),
  adults: Math.floor(Math.random() * 5) + 1,
  children: Math.floor(Math.random() * 5),
  messageToHotel: randomString(50),
  roomType: randomString(10),
  price: Math.floor(Math.random() * 10000),
  salutation: randomString(5),
  firstName: randomString(10),
  lastName: randomString(10),
  phoneNumber: randomString(10),
  stripePaymentID: randomString(10),
  billingAddressOne: randomString(20),
  billingAddressTwo: randomString(20),
  billingAddressPostalCode: randomString(10),
});

const generateRandomUserData = () => ({
  email: `${randomString(10)}@example.com`,
  password: randomString(10),
});

const runFuzzTests = async () => {
  const server = await MongoMemoryServer.create();
  const uri = server.getUri();
  await mongoose.connect(uri);

  let cycleCount = 0;

  while (true) {
    try {
      // Test creating a booking
      const bookingData = generateRandomBookingData();
      let response = await request(app).post('/api/bookings').send(bookingData);
      if (![200, 400].includes(response.status)) {
        console.error(`Test failed for createBooking: ${JSON.stringify(bookingData)}`);
        console.log(response);
        break;
      }

      // Get all bookings
      response = await request(app).get('/api/bookings');
      if (response.status !== 200) {
        console.error('Test failed for getAllBookings');
        console.log(response);
        break;
      }

      const bookings = response.body.data;
      if (bookings.length > 0) {
        const bookingId = bookings[0]._id;

        // Get a specific booking
        response = await request(app).get(`/api/bookings/${bookingId}`);
        if (![200, 404].includes(response.status)) {
          console.error(`Test failed for getBooking: ${bookingId}`);
          console.log(response);
          break;
        }

        // Update a booking
        const updateData = { email: randomString(10) + "@example.com" };
        response = await request(app).put(`/api/bookings/${bookingId}`).send(updateData);
        if (![200, 404].includes(response.status)) {
          console.error(`Test failed for updateBooking: ${bookingId}`);
          console.log(response);
          break;
        }

        // Delete a booking
        response = await request(app).delete(`/api/bookings/${bookingId}`);
        if (![200, 404].includes(response.status)) {
          console.error(`Test failed for deleteBooking: ${bookingId}`);
          console.log(response);
          break;
        }
      }

      // Test getDestinations endpoint
      const query = generateRandomInput();
      response = await request(app).get('/api/destinations').query({ query: query });

      if (typeof query === 'string' || typeof query === 'number' || typeof query === 'boolean') {
        if (response.status !== 200) {
          console.error(`Test failed for getDestinations with query: ${query}`);
          console.log(response.body);
          console.log(response.body.message);
          break;
        }
      } else {
        if (query == null || query == undefined) {
          if (response.status !== 400 || response.body.message !== 'Missing query parameter') {
            console.error(`Test failed for getDestinations with undefined query: ${query}`);
            console.log(response.body);
            console.log(response.body.message);
            break;
          }
        } else {
          if (response.status !== 400 || response.body.message !== 'Query parameter must be a string') {
            console.error(`Test failed for getDestinations with invalid query: ${query}`);
            console.log(response.body);
            console.log(response.body.message);
            break;
          }
        }
      }

      // Test user registration
      const userData = generateRandomUserData();
      response = await request(app).post('/api/user/register').send(userData);
      if (![200, 400].includes(response.status)) {
        console.error(`Test failed for registerUser: ${JSON.stringify(userData)}`);
        console.log(response);
        break;
      }

      // Test user login
      response = await request(app).post('/api/user/login').send(userData);
      if (![200, 400].includes(response.status)) {
        console.error(`Test failed for loginUser: ${JSON.stringify(userData)}`);
        console.log(response);
        break;
      }

      const token = response.headers['set-cookie'].find(cookie => cookie.startsWith('token='));
      const refreshToken = response.headers['set-cookie'].find(cookie => cookie.startsWith('refreshToken='));

      if (!token || !refreshToken) {
        console.error('Test failed to retrieve tokens during login');
        console.log(response);
        break;
      }

      // Test getting user profile
      response = await request(app)
        .get('/api/user/profile')
        .set('Cookie', token);
      if (![200, 404].includes(response.status)) {
        console.error('Test failed for getUserProfile');
        console.log(response);
        break;
      }

      // Test updating user profile
      const updateUserData = generateRandomUserData();
      response = await request(app)
        .put(`/api/user/update/${response.body._id}`)
        .set('Cookie', token)
        .send(updateUserData);
      if (![200, 400, 404].includes(response.status)) {
        console.error('Test failed for updateUser');
        console.log(response);
        break;
      }

      // Test refreshing token
      response = await request(app)
        .post('/api/user/refresh-token')
        .set('Cookie', refreshToken);
      if (![200, 401].includes(response.status)) {
        console.error('Test failed for refreshToken');
        console.log(response);
        break;
      }

      // Test logging out user
      response = await request(app).post('/api/user/logout').set('Cookie', token);
      if (response.status !== 200) {
        console.error('Test failed for logoutUser');
        console.log(response);
        break;
      }

      // Test deleting user
      response = await request(app).delete(`/api/user/delete/${userData.email}`).set('Cookie', token);
      if (![200, 404].includes(response.status)) {
        console.error('Test failed for deleteUser');
        console.log(response);
        break;
      }

      cycleCount++;
      console.clear()
      console.log(`Done with test cycle: ${cycleCount}`);
    } catch (error) {
      console.error('Test encountered an error:', error.message);
      break;
    }
  }

  await mongoose.disconnect();
  await server.stop();
};

runFuzzTests();
