import { Router } from "express";
import passport from "passport";
import jwt from 'jsonwebtoken';

const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/auth/login/failed'
}), (req, res) => {
  try {
    // Generate a JWT token
    const token = jwt.sign({ userId: req.user._id }, 'jwtsec', { expiresIn: '1d' });

    // Set the token in a cookie
    res.cookie('token', token, { httpOnly: false });

    // Redirect the user to the desired URL after successful authentication
    res.redirect(process.env.CLIENT_URL);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/login/failed', (req, res) => {
  res.status(401).json({ success: false, message: 'Login failed' });
});

router.get('/logout', (req, res) => {
  try {
    res.clearCookie('token');
    res.redirect(process.env.CLIENT_URL);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
})

export default router;