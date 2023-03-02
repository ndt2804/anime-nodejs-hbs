const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Anime = new Schema ({
    name:{ type: String, required: true} ,
    description:{type: String} ,
    image:{type: String} ,
    slug: {type: String, slug: 'name', unique: true},
    videoID: {type: String, required: true},
    episodes: [{ type: Schema.Types.ObjectId, ref: 'episodes' }],
    }, 
{
    timestamps: true,
});


module.exports = mongoose.model('Anime', Anime);


