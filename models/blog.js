const mongose = require('mongoose');

const {Schema} = mongose;

const blogSchema = new Schema({

            title: {
                type: String, 
                requrired: true
            },
            content: {
                type: String,
                required: true
            },
            photoPath: {
                type: String,
            },
            author: {
                type: Schema.Types.ObjectId,
                ref: 'user', // Assuming you have a User model
                required: true
            },
            status: {
                type: String,
                enum: ['published', 'draft', 'pending'],
                default: 'draft'
            },
            meta: {
            description: {
                type: String,
                trim: true
            },
            seoTitle: {
                type: String,
                trim: true
            }
            },
            customFields: {
            type: Map,
            of: Schema.Types.Mixed
            }
        },

            {timestamps: true}


);
const Blog = new mongose.model('cms_blogs', blogSchema);
module.exports = Blog; 