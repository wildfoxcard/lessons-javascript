# Passport - Net Ninja

from youtube playlist:

https://www.youtube.com/watch?v=sakQbeRjgwg&list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x

### notes from videos

#### video 1

Introduction into OAuth.

#### video 2

This video is about a deeper analysis into OAuth.

<img src="doc-images/oauth-big-picture.png" />

#### video 3

This video is about setting up an express app

The folder created was oauth-playlist

```bash
npm init
```

```bash
npm install ejs express --save
```

```bash
npm i nodemon -g
```

#### video 4

This video is about setting up auth routes in application

new routes:
/auth/login
/auth/logout
/auth/google

#### video 5

This video is about setting up passport

```bash
npm i passport passport-google-oauth20
```

A basic outline of the passport-setup file was created

```javascript
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

passport.use(
  new GoogleStrategy({
    //options for the google strat
  }),
  () => {
    //passport callback function
  }
);
```

#### video 6

This video is about setting up the google strategy.

important link:
https://console.developers.google.com/

```javascript
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

passport.use(
  new GoogleStrategy({
    //options for the google strat
    clientID: "******",
    clientSecret: "******"
  }),
  () => {
    //passport callback function
  }
);
```

#### video 7

This video is about storing the keys in a file that isn't commited to github. I am following along, but I recommend using a .env file in the future.