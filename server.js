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

const auth = require('basic-auth');

const USERNAME = process.env.APP_USER || 'admin';
const PASSWORD = process.env.APP_PASS || 'secret';

// Middleware to protect all routes
app.use((req, res, next) => {
  const user = auth(req);

  if (!user || user.name !== USERNAME || user.pass !== PASSWORD) {
    res.set('WWW-Authenticate', 'Basic realm="Restricted Area"');
    return res.status(401).send('Access denied');
  }

  next();
});



app.use(express.static(path.join(__dirname, 'public')));



app.get('/view-ledgers/:distributor', async (req, res) => {
    const distributor = req.params.distributor;
  
    try {
      const entries = await Ledger.find({
        distributor,
        lapsed: false
      }).sort({ date: 1 });
  
      let balance = 0;
  
      const ledger = entries.map(entry => {
        let earned = 0;
        let redeemed = 0;
  
        if (entry.type === "Earned") {
          earned = entry.points;
        } else if (entry.type === "Redeemed") {
          redeemed = entry.points;
        }
  
        const balanceChange = earned - redeemed;
        balance += balanceChange;
  
        const today = new Date();
        const expiryDate = new Date(entry.date);
        expiryDate.setDate(expiryDate.getDate() + 30);
  
        const timeToExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
        const willExpireSoon = timeToExpiry <= 7 && timeToExpiry > 0;
  
        return {
          id: entry._id,
          date: entry.date,
          invoice: entry.invoice,
          earned,
          redeemed,
          balance,
          balanceChange,
          expiryDate,
          willExpireSoon,
          type: entry.type
        };
      });
  
      res.json(ledger);
    } catch (error) {
      console.error("Error fetching ledger:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });
  




app.post('/lapse-points/:id', async (req, res) => {
    try {
      await Ledger.findByIdAndDelete(req.params.id);
      res.json({ success: 'Entry lapsed successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Lapse failed' });
    }
  });
  

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


