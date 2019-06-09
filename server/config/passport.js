/**
 * @fileOverview Creates the passport auth strategies
 *
 * @author Chima Chukwuemeka
 *
 * @requires NPM:passport-facebook-token
*/

import FacebookTokenStrategy from 'passport-facebook-token';

const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } = process.env;

const facebookAuth = new FacebookTokenStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
}, ((
  accessToken, refreshToken,
  { id, name: { familyName, givenName, middleName }, emails: [{ value }] }, done,
) => {
  const user = {
    name: `${givenName} ${middleName} ${familyName}`,
    email: value || `facebook-${id}`,
  };
  return done(null, user);
}));

export default facebookAuth;
