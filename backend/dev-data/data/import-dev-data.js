const fs = require('fs');   
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Anime = require('../../models/animeModel');
const User = require('../../models/userModel');
const Review = require('../../models/reviewModel');
const FavouriteAnime = require('../../models/favouriteanimeModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const animes = JSON.parse(
  fs.readFileSync(`${__dirname}/anime.json`, 'utf-8')
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/users.json`, 'utf-8')
);

const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

const favouriteanimes = JSON.parse(
  fs.readFileSync(`${__dirname}/favouriteanime.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    //await User.create(users, { validateBeforeSave: false });
    await Anime.create(animes);
    //await Review.create(reviews);
    //await FavouriteAnime.create(favouriteanimes);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Anime.deleteMany();
    //await User.deleteMany();
    //await Review.deleteMany();
    //await FavouriteAnime.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if(process.argv[2] === '--import'){
  importData();
}else if(process.argv[2] === '--delete'){
    deleteData();
}

console.log(process.argv);