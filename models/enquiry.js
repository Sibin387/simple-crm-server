const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    note:String,
    status:{
        type:String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
}, { timestamps: true} );

exports.Enquiry = mongoose.model('Enquiry',EnquirySchema);