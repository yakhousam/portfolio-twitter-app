import { connect } from 'mongoose';

const DB_URI = process.env.DB_URI;

connect(DB_URI, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('mongoose is connected to: ', DB_URI);
});
