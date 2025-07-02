const axios = require('axios');
const fs = require('fs');
const path = require('path');

const accommodations = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/data/accommodations.json'), 'utf-8'));

const seedAccommodations = async () => {
  try {
    for (const accommodation of accommodations) {
      await axios.post('http://localhost:5000/api/accommodations', accommodation);
      console.log(`Added accommodation: ${accommodation.name}`);
    }
    console.log('All accommodations have been added.');
  } catch (error) {
    console.error('Error seeding accommodations:', error.message);
  }
};

seedAccommodations();
