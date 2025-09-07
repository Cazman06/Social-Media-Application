const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user');
const { connectToMongoDB } = require('./db');
const { Strategy: OIDCStrategy } = require('passport-openidconnect');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const baseUrl = process.env.SERVER_URL || 'http://localhost:5000';

const issuer =  'https://www.linkedin.com/oauth';
const authorizationURL = 'https://www.linkedin.com/oauth/v2/authorization';
const tokenURL = 'https://www.linkedin.com/oauth/v2/accessToken';
const userInfoURL = 'https://api.linkedin.com/v2/me';

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${baseUrl}/auth/google/callback`,
    passReqToCallback: true
  },
  async function(req, accessToken, refreshToken, profile, done) {
    try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            user = await User.create({
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value,
                accessToken,
                refreshToken
            })
        } else {
            user.accessToken = accessToken;
            user.refreshToken = refreshToken;
            await user.save();
        }
        return done(null, user);
    } catch (error) {
        console.error('error:', error);
        return done(error, null);
    } 
  }
));


passport.use('linkedin', new OIDCStrategy({
    issuer: issuer,
    authorizationURL: authorizationURL,
    tokenURL: tokenURL,
    userInfoURL: userInfoURL,
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: `${baseUrl}/auth/linkedin/callback`,
    scope: ['openid', 'profile', 'email'],
    passReqToCallback: true
  }, async (req, issuer, profile, context, idToken, accessToken, refreshToken, params, done) => {
  try {
    let user = await User.findOne({ linkedinId: profile.id });
    if (!user) {
      user = await User.create({
        linkedinId: profile.id,
        displayName: profile.displayName,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      user.accessToken = accessToken;
      user.refreshToken = refreshToken;
      await user.save();
    }
    done(null, user);
  } catch (error) {
    console.error('error:', error);
    done(error, null);
  }
}));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:3000/home');
  }
);

app.get('/auth/linkedin', passport.authenticate('linkedin', { scope: ['openid', 'profile', 'email'] }));

app.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:3000/home');
  }
);


(async () => {
  await connectToMongoDB();

  app.listen(PORT, () => {
    console.info(`Server running on ${baseUrl}`);
  });
})()