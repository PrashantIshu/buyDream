const fs = require('fs');
const mongoose = require('mongoose');
const Building = require('../models/buildingsModel');
const User = require('../models/usersModel');
const Amenety = require('../models/amenetiesModel');
const House = require('../models/housesModel');

// console.log(process.env.PHONE);

const DB = 'mongodb+srv://prashant:<password>@cluster0-yfpqt.mongodb.net/property-app?retryWrites=true&w=majority'.replace('<password>', 'prashant21102001');

mongoose.connect(DB , {
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : false,
    useUnifiedTopology: true ,
}).then(() => console.log("DB connection successfull"));

// READ JSON FILE
const buildings = JSON.parse(fs.readFileSync(`./property.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`./users.json`, 'utf-8'));
const ameneties = JSON.parse(fs.readFileSync(`./ameneties.json`, 'utf-8'));
const houses = JSON.parse(fs.readFileSync(`./houses.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
try {
    await Building.create(buildings, { validateBeforeSave: false });
    await User.create(users, { validateBeforeSave: false });
    await Amenety.create(ameneties, { validateBeforeSave: false });
    await House.create(houses, { validateBeforeSave: false });

    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
    try {
        await Building.deleteMany();
        await User.deleteMany();
        await Amenety.deleteMany();
        await House.deleteMany();
        console.log('Data successfully deleted!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};


if (process.argv[2] === '--import') {
    // console.log("test1");
    importData();
    // console.log("test2");
    
} else if (process.argv[2] === '--delete') {
    deleteData();
}
