require('dotenv').config();
const express = require ("express")
const mongoose = require ("mongoose")
let Ledger = require ('./db')
const path = require('path');

async function main() {
        try {
          await mongoose.connect(process.env.MONGO_URI);
          console.log("Connected to MongoDB");
      
          app.listen(3000, () => {
            console.log("Server is running on port 3000");
          });
      
        } catch (error) {
          console.error("Error connecting to MongoDB:", error);
        }
      }
    
      main();
const cors = require ("cors")

const app = express (); 
app.use (cors());
app.use (express.json());
app.use(express.static(path.join(__dirname, 'public')));



app.get('/view-ledgers/:distributor', async (req,res)=> {
const distributor = req.params.distributor
try {
const entries = await Ledger.find({distributor}).sort({date:1});

let balance = 0;
let ledger = entries.map (entry => {
    let earned=0
    let redeemed= 0
    if (entry.type==="Earned") {
        earned = entry.points
    }
    else if (entry.type === "Redeemed") {
        redeemed = entry.points;
      }

    balance += (earned-redeemed);

    return {
        date: entry.date,
        invoice: entry.invoice,
        earned,
        redeemed,
        balance
    }
})

res.json (ledger)

}
catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
}
})

app.post ('/add-points', async (req,res)=> {
let {distributor, date, invoice} = req.body;
let type = "Earned";
let points = Number(req.body.points);
try {
    const ledgerEntry = await Ledger.create({
        distributor, date, invoice, type, points 
    })

    res.json ({
        success : 'Entry Sucessful at Backend!'
    })
} 
catch {
    res.json ({
        error : "Entry was not posted"
    })
}
})

app.post ('/redeem-points', async (req,res) => {
    let {distributor, date, invoice} = req.body;
let type = "Redeemed"
let points = Number(req.body.points);
    try {
        const ledgerEntry = await Ledger.create({
            distributor, date, invoice, type, points 
        })
    
        res.json ({
            success : 'Entry Sucessful at Backend!'
        })
    } 
    catch {
        res.json ({
            error : "Entry was not posted"
        })
    }
})


