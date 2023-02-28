module.exports = {
    multiMongooseToObj: function(mongooseArr) {
        return mongooseArr.map(mongoose => mongoose.toObject());
    },
    mongooseToObj : function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
};
