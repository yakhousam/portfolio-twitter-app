import { connect } from 'mongoose';

connect(process.env.DB_URI, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('mongoose is connected to: ', process.env.DB_URI);
});
