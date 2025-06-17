 //redeem script

   let redeemPoints= async (event) => {
      event.preventDefault();
      let distributor=document.getElementById("distributor").value;
      let date = document.getElementById("date").value
      let invoice=document.getElementById("invoice").value
      let points= document.getElementById("points").value;
  
      await axios.post ('/redeem-points', {
        distributor,
        date,
        invoice,
        points
      })
      .then (()=>{
        document.getElementById('responseMsg').innerText = "Points redeemed Successfully!";

       
        document.getElementById('pointsForm').reset();
        console.log("Success")
    })
    .catch (()=>{
      alert("Some error occurred!")
    })
  
    }
 

//add script
let addPoints= async (event) => {

    event.preventDefault();
    let distributor=document.getElementById("distributor").value;
    let date = document.getElementById("date").value
    let invoice=document.getElementById("invoice").value
    let points= document.getElementById("points").value;

    await axios.post ('/add-points', {
      distributor,
      date,
      invoice,
      points
    })
    .then (()=>{
      document.getElementById('responseMsg').innerText = "Points added Successfully!";

     
      document.getElementById('pointsForm').reset();
      console.log("Success")
  })
  .catch (()=>{
    alert("Some error occurred!")
  })

  }