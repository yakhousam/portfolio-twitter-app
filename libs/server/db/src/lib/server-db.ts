import { connect } from 'mongoose';

const dev = process.env.NODE_ENV !== 'production';
const URI = dev ? 'mongodb://localhost/twitterapp' : process.env.URI;

connect(URI, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('mongoose is connected to: ', URI);
});
