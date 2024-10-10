import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';
import { findOrCreateUserToAuthGoogle } from '../services/authService';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `http://localhost:${process.env.PORT}/api-user/google/callback`,
    },
    async (accessToken: string, refreshToken: string, profile: any, done: any) => {
      try {
        const user = await findOrCreateUserToAuthGoogle(profile);
        done(null, user.user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);


// serialize the user for the session (store user ID)
passport.serializeUser((user,done) => {
    done(null, user.id)
})

// Deserialize the user by their ID from the session
passport.deserializeUser(async(id,done) => {
    try {
        const user = await User.findById(id); // Fetch user by ID
        done(null,user); // pass the user to the next middleware
    } catch (error) {
        done(error,false)
    }
})