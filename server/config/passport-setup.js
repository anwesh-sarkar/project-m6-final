const passport = require("passport");
const RedditStrategy = require("passport-reddit").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const User = require("../models/User");

const {
  MONGO_URI,
  REDDIT_CONSUMER_KEY,
  REDDIT_CONSUMER_SECRET,
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  CLIENT_HOMEPAGE_URL,
  SECRET_KEY,
} = process.env;

// passport.use(
//   new RedditStrategy(
//     {
//       clientID: REDDIT_CONSUMER_KEY,
//       clientSecret: REDDIT_CONSUMER_SECRET,
//       callbackURL: CLIENT_HOMEPAGE_URL,
//     },
//     function(accessToken, refreshToken, profile, done) {
//       console.log(accessToken, " ", refreshToken, " ", profile, " ", done);
//     }
//   )
// );

// passport.use(
//   new TwitterStrategy(
//     {
//       clientID: TWITTER_CONSUMER_KEY,
//       clientSecret: TWITTER_CONSUMER_SECRET,
//       callbackURL: CLIENT_HOMEPAGE_URL,
//     },
//     async (token, tokenSecret, profile, done) => {
//       const currentUser = await User.findOne({
//         twitterId: profile._json.id_str,
//       });
//       if (!currentUser) {
//         const newUser = await new User({
//           name: profile._json.name,
//           profileImgUrl: profile._json.profile_image_url,
//         }).save();
//         if (newUser) {
//           done(null, newUser);
//         }
//       }
//       done(null, currentUser);
//     }
//   )
// );

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: SECRET_KEY,
    },
    (payload, done) => {
      User.findById({ _id: payload.sub }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  )
);

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      user.comparePassword(password, done);
    });
  })
);
