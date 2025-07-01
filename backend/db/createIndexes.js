const mongoose = require('mongoose');
require('dotenv').config();

const createIndexes = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/glencity-camping');
    console.log('Connected to MongoDB');

    // Get the Booking collection
    const bookingCollection = mongoose.connection.db.collection('bookings');

    // Create indexes for optimal booking query performance
    await bookingCollection.createIndex({ accommodation: 1 });
    console.log('Created index on accommodation field');

    await bookingCollection.createIndex({ startDate: 1, endDate: 1 });
    console.log('Created compound index on startDate and endDate');

    await bookingCollection.createIndex({ user: 1, createdAt: -1 });
    console.log('Created compound index on user and createdAt');

    await bookingCollection.createIndex({ 
      accommodation: 1, 
      startDate: 1, 
      endDate: 1 
    });
    console.log('Created compound index for availability checking');

    console.log('All indexes created successfully!');
    
  } catch (error) {
    console.error('Error creating indexes:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the script if called directly
if (require.main === module) {
  createIndexes();
}

module.exports = createIndexes;
