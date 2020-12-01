const mongoose = require('mongoose');
const Building = require('./buildingsModel');

const housesSchema = new mongoose.Schema({
    flatType: {
        type: Number,
        required: [true, 'A house must have a flat type']
    },
    price: {
        type: Number,
        required: [true, 'A house must have a price']
    },
    priceUnit: {
        type: String,
        enum: ['Cr', 'Lakh'],
        default: 'Lakh'
    },
    priceSameUnit: {
        type: Number
    },
    sqftArea: {
        type: Number,
        required: [true, 'A house must have a area description in sqft']
    },
    image: {
        type: String,
        //required: [true, 'A house must have a image']
    },
    bathrooms: {
        type: Number,
        required: [true, 'A house must have a image']
    },
    balconies: {
        type: Number,
        required: [true, 'A house must have a image']
    },
    status: {
        type: String
    },
    usp: {
        type: String
    },
    building: {
        type: mongoose.Schema.ObjectId,
        ref: "Building",
        required: [true, 'A house must have a image']
    }
});


housesSchema.statics.calBuildingStats = async function(buildingId) {
    
    const stats = await this.aggregate([
        {
            $match: { building : { $eq: buildingId } }
        },
        {
            $group: {
                _id : '$building',
                numHouses: { $sum: 1 },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' },
                propertiesSqft: { $push: '$sqftArea' },
                housePrices: { $push: '$priceSameUnit' }                
            }
        }
    ]);
    // console.log(stats);  
        await stats.forEach( async el => {
            const building = await Building.findByIdAndUpdate(el._id, {
                sqftAreasAvailable: el.propertiesSqft,
                allPrices: el.housePrices,
                priceSameUnit: el.housePrices
            }, {new: true});  
        });   
        // const checkBuilding = await Building.findById(buildingId);
        // console.log(checkBuilding);
        // console.log("done");
};

housesSchema.statics.calBuildingFlatTypeStats = async function(buildingId) {
    
    const stats = await this.aggregate([
        {
            $match: { building : { $eq: buildingId } }
        },
        {
            $group: {
                _id : '$flatType',          
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);
    var properties = [];
        await stats.forEach( async el => {
            properties.push(el._id)
            
            
        });   
        // console.log(properties);
        const building = await Building.findByIdAndUpdate(buildingId, {
                propertiesAvailable: properties,
        }, {new: true});   
};

housesSchema.pre('save', async function(next) {
    this.priceSameUnit = this.price;
    if(this.priceUnit === "Lakh") {
        this.priceSameUnit = this.price/100;
    }
    next();
});

housesSchema.post('save', async function() {
    // console.log(this);
    await this.constructor.calBuildingStats(this.building);
    await this.constructor.calBuildingFlatTypeStats(this.building);
});

housesSchema.pre('findOneAndUpdate', async function(next) {
    const docToUpdatePre = await this.model.findOne(this.getQuery());
    this._update.priceSameUnit = this._update.price;
    if( this._update.priceUnit === "Lakh") {
        this._update.priceSameUnit =  this._update.price/100;
    }
    // console.log(this._update.priceSameUnit);

    next();
});

housesSchema.post('findOneAndUpdate', async function() {
    const docToUpdate = await this.model.findOne(this.getQuery());
    await docToUpdate.constructor.calBuildingStats(docToUpdate.building);
    await docToUpdate.constructor.calBuildingFlatTypeStats(docToUpdate.building);
}); // The document that `findOneAndUpdate()` will modify
//   });.post('updateOne', async function() {
//     console.log("Update Log");
//     await this.constructor.calBuildingStats(this.building);
//     await this.constructor.calBuildingFlatTypeStats(this.building);
// });
let buildingDeleted;
housesSchema.pre('findOneAndDelete', async function() {
    const docToDelete = await this.model.findOne(this.getQuery());
    buildingDeleted = docToDelete;
    // await docToDelete.constructor.calBuildingStats(docToDelete.building);
    // await docToDelete.constructor.calBuildingFlatTypeStats(docToDelete.building);
}); 
housesSchema.post('findOneAndDelete', async function() {
    // console.log(buildingDeleted);
    await buildingDeleted.constructor.calBuildingStats(buildingDeleted.building);
    await buildingDeleted.constructor.calBuildingFlatTypeStats(buildingDeleted.building);
}); 

housesSchema.pre(/^find/, function(next) {
    // this.populate({
    //     path: 'building',
    //     select: 'name'    
    // });

    next();
});

const House = new mongoose.model('House', housesSchema);

module.exports = House;