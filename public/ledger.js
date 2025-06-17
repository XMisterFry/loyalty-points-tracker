//Ledger Table
   // Get distributor name from query string: ?distributor=MS%20Brothers
   const urlParams = new URLSearchParams(window.location.search);
   const distributor = urlParams.get('distributor');

   if (distributor) {
     axios.get(`/view-ledgers/${encodeURIComponent(distributor)}`)
       .then(response => {
        document.getElementById("distName").innerText=distributor
         const entries = response.data;
         const tbody = document.querySelector('#ledgerTable tbody');
         entries.forEach(entry => {
           const row = document.createElement('tr');
           row.innerHTML = `
             <td>${new Date(entry.date).toLocaleDateString()}</td>
             <td>${entry.invoice}</td>
             <td>${entry.earned}</td>
             <td>${entry.redeemed}</td>
             <td>${entry.balance}</td>
           `;
           tbody.appendChild(row);
         });
       })
       .catch(err => {
         console.error('Error loading ledger:', err);
       });
   } else {
     document.body.innerHTML = "<p>No distributor selected.</p>";
   }