import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app.js';
import { Booking } from '../models/bookingModel.js';

let mongoServer;

describe('Booking Controller', () => {
  // Set up an in-memory MongoDB server before running tests
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  // Clean up the database after each test
  afterEach(async () => {
    await Booking.deleteMany({});
  });

  // Disconnect and stop the in-memory MongoDB server after all tests
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe('POST /api/bookings', () => {
    it('should create a new booking', async () => {
      const newBooking = {
        email: 'test@example.com',
        roomID: 'room123',
        destinationID: 'dest123',
        hotelID: 'hotel123',
        numberOfNights: 3,
        startDate: '2024-07-01',
        endDate: '2024-07-04',
        adults: 2,
        children: 0,
        messageToHotel: 'No special requests',
        roomType: 'Deluxe',
        price: 150.0,
        salutation: 'Mr.',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '1234567890',
        stripePaymentID: 'payment123',
        billingAddressOne: '123 Main St',
        billingAddressTwo: 'Apt 4',
        billingAddressPostalCode: '12345',
      };

      const response = await request(app)
        .post('/api/bookings')
        .send(newBooking);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.email).toBe(newBooking.email);
    });

    it('should return 400 for missing required fields', async () => {
      const newBooking = {
        roomID: 'room123',
        destinationID: 'dest123',
      };

      const response = await request(app)
        .post('/api/bookings')
        .send(newBooking);

      expect(response.statusCode).toBe(400);
    });
  });

  describe('GET /api/bookings', () => {
    it('should return all bookings', async () => {
      const booking1 = new Booking({
        email: 'test1@example.com',
        roomID: 'room123',
        destinationID: 'dest123',
        hotelID: 'hotel123',
        numberOfNights: 3,
        startDate: '2024-07-01',
        endDate: '2024-07-04',
        adults: 2,
        children: 0,
        messageToHotel: 'No special requests',
        roomType: 'Deluxe',
        price: 150.0,
        salutation: 'Mr.',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '1234567890',
        stripePaymentID: 'payment123',
        billingAddressOne: '123 Main St',
        billingAddressTwo: 'Apt 4',
        billingAddressPostalCode: '12345',
      });
      const booking2 = new Booking({
        email: 'test2@example.com',
        roomID: 'room123',
        destinationID: 'dest123',
        hotelID: 'hotel123',
        numberOfNights: 3,
        startDate: '2024-07-01',
        endDate: '2024-07-04',
        adults: 2,
        children: 0,
        messageToHotel: 'No special requests',
        roomType: 'Deluxe',
        price: 150.0,
        salutation: 'Mr.',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '1234567890',
        stripePaymentID: 'payment123',
        billingAddressOne: '123 Main St',
        billingAddressTwo: 'Apt 4',
        billingAddressPostalCode: '12345',
      });
      await booking1.save();
      await booking2.save();

      const response = await request(app).get('/api/bookings');

      expect(response.statusCode).toBe(200);
      expect(response.body.count).toBe(2);
      expect(response.body.data.length).toBe(2);
    });

    it('should return an empty list if no bookings exist', async () => {
      const response = await request(app).get('/api/bookings');

      expect(response.statusCode).toBe(200);
      expect(response.body.count).toBe(0);
      expect(response.body.data.length).toBe(0);
    });
  });

  describe('GET /api/bookings/:id', () => {
    it('should return a single booking by ID', async () => {
      const booking = new Booking({
        email: 'test@example.com',
        roomID: 'room123',
        destinationID: 'dest123',
        hotelID: 'hotel123',
        numberOfNights: 3,
        startDate: '2024-07-01',
        endDate: '2024-07-04',
        adults: 2,
        children: 0,
        messageToHotel: 'No special requests',
        roomType: 'Deluxe',
        price: 150.0,
        salutation: 'Mr.',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '1234567890',
        stripePaymentID: 'payment123',
        billingAddressOne: '123 Main St',
        billingAddressTwo: 'Apt 4',
        billingAddressPostalCode: '12345',
      });
      await booking.save();

      const response = await request(app).get(`/api/bookings/${booking._id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.email).toBe(booking.email);
    });

    it('should return 404 if booking is not found', async () => {
      const response = await request(app).get('/api/bookings/60f71b8f4d1f4a1d3c8b4567');

      expect(response.statusCode).toBe(404);
    });
  });

  describe('PUT /api/bookings/:id', () => {
    it('should update a booking by ID', async () => {
      const booking = new Booking({
        email: 'test@example.com',
        roomID: 'room123',
        destinationID: 'dest123',
        hotelID: 'hotel123',
        numberOfNights: 3,
        startDate: '2024-07-01',
        endDate: '2024-07-04',
        adults: 2,
        children: 0,
        messageToHotel: 'No special requests',
        roomType: 'Deluxe',
        price: 150.0,
        salutation: 'Mr.',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '1234567890',
        stripePaymentID: 'payment123',
        billingAddressOne: '123 Main St',
        billingAddressTwo: 'Apt 4',
        billingAddressPostalCode: '12345',
      });
      await booking.save();

      const updatedData = { email: 'updated@example.com' };
      const response = await request(app)
        .put(`/api/bookings/${booking._id}`)
        .send(updatedData);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Booking updated successfully');

      const updatedBooking = await Booking.findById(booking._id);
      expect(updatedBooking.email).toBe(updatedData.email);
    });

    it('should return 404 if booking is not found', async () => {
      const response = await request(app)
        .put('/api/bookings/60f71b8f4d1f4a1d3c8b4567')
        .send({ email: 'updated@example.com' });

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Booking not found');
    });
  });

  describe('DELETE /api/bookings/:id', () => {
    it('should delete a booking by ID', async () => {
      const booking = new Booking({
        email: 'test@example.com',
        roomID: 'room123',
        destinationID: 'dest123',
        hotelID: 'hotel123',
        numberOfNights: 3,
        startDate: '2024-07-01',
        endDate: '2024-07-04',
        adults: 2,
        children: 0,
        messageToHotel: 'No special requests',
        roomType: 'Deluxe',
        price: 150.0,
        salutation: 'Mr.',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '1234567890',
        stripePaymentID: 'payment123',
        billingAddressOne: '123 Main St',
        billingAddressTwo: 'Apt 4',
        billingAddressPostalCode: '12345',
      });
      await booking.save();

      const response = await request(app).delete(`/api/bookings/${booking._id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Booking deleted successfully');

      const deletedBooking = await Booking.findById(booking._id);
      expect(deletedBooking).toBeNull();
    });

    it('should return 404 if booking is not found', async () => {
      const response = await request(app).delete('/api/bookings/60f71b8f4d1f4a1d3c8b4567');

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Booking not found');
    });
  });
});
