const express = require('express');
const router = express.Router();
const Accommodation = require('../models/Accommodation');

/**
 * @swagger
 * tags:
 *   name: Accommodations
 *   description: Accommodation management endpoints
 */

/**
 * @swagger
 * /api/accommodations:
 *   get:
 *     summary: Get all accommodations
 *     tags: [Accommodations]
 *     responses:
 *       200:
 *         description: List of all accommodations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Accommodation'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// @route   GET api/accommodations
// @desc    Get all accommodations
// @access  Public
router.get('/', async (req, res) => {
  try {
    const accommodations = await Accommodation.find();
    res.json(accommodations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/accommodations/:id
// @desc    Get accommodation by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) {
      return res.status(404).json({ msg: 'Accommodation not found' });
    }
    res.json(accommodation);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Accommodation not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/accommodations
// @desc    Create an accommodation
// @access  Public
router.post('/', async (req, res) => {
  try {
    const newAccommodation = new Accommodation(req.body);
    const accommodation = await newAccommodation.save();
    res.json(accommodation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
