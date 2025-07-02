const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth'); // For fetching user data
const { config } = require('../config/environment');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and registration endpoints
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - lastName
 *               - phone
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's first name
 *               lastName:
 *                 type: string
 *                 description: User's last name
 *               phone:
 *                 type: string
 *                 description: User's phone number
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: User's password (minimum 6 characters)
 *               role:
 *                 type: string
 *                 enum: [guest, admin]
 *                 default: guest
 *                 description: User's role
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       400:
 *         description: User already exists or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  const { username, name, lastName, phone, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      username,
      name,
      lastName,
      phone,
      email,
      password,
      role,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn },
      (err, token) => {
        if (err) throw err;
        
        // Set httpOnly cookie instead of sending token in response
        res.cookie('auth_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // HTTPS in production
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });
        
        res.json({ 
          success: true, 
          message: 'Registration successful',
          user: {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            role: user.role
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate user and get token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *           example:
 *             email: "user@example.com"
 *             password: "password123"
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn },
      (err, token) => {
        if (err) throw err;
        
        // Set httpOnly cookie instead of sending token in response
        res.cookie('auth_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // HTTPS in production
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });
        
        res.json({ 
          success: true, 
          message: 'Login successful',
          user: {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            role: user.role
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @swagger
 * /api/auth:
 *   get:
 *     summary: Get logged in user information
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User's unique identifier
 *                 name:
 *                   type: string
 *                   description: User's first name
 *                 lastName:
 *                   type: string
 *                   description: User's last name
 *                 phone:
 *                   type: string
 *                   description: User's phone number
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: User's email address
 *                 role:
 *                   type: string
 *                   description: User's role (guest or admin)
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Date when user was created
 *       401:
 *         description: No token provided or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        // req.user is set by the auth middleware
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user and clear authentication cookie
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

// @route   POST api/auth/logout
// @desc    Logout user and clear cookie
// @access  Public
router.post('/logout', (req, res) => {
  res.clearCookie('auth_token');
  res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;
