const mongoose = require ('mongoose')
const Schema = mongoose.Schema


let ledgerSchema = new Schema ({
distributor : {type : String, enum : ["MS Brothers", "Aarz Sales", "SH Agency", 
    "Rabbani Jaipur", "Sri Mukat Krishna", "Babbar Medical", "Jalees & CO", "Daryabadi Dawakhana", "Hira Enterprises", "Afzal & Brothers"],required :true},
    date : {type: Date, required : true},
invoice : {type : String},
type : { type : String, enum : ["Earned", "Redeemed"], required : true},
points : {type : Number, required : true},
lapsed: { type: Boolean, default: false }

});
const Ledger = mongoose.model ('Ledger', ledgerSchema)
module.exports = Ledger;    