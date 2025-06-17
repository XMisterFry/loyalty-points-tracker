const urlParams = new URLSearchParams(window.location.search);
const distributor = urlParams.get("distributor");

if (distributor) {
  axios.get(`/view-ledgers/${encodeURIComponent(distributor)}`)
    .then((response) => {
      document.getElementById("distName").innerText = distributor;
      const entries = response.data;
      const tbody = document.querySelector("#ledgerTable tbody");

      entries.forEach((entry) => {
        const row = document.createElement("tr");

        const expiryFormatted = entry.expiryDate
          ? new Date(entry.expiryDate).toLocaleDateString()
          : "—";
        let status = "";
        const today = new Date();
        const expiry = new Date(entry.expiryDate);

        if (entry.lapsed) {
          status = "Lapsed";
        } else if (expiry < today) {
          status = "Expired";
        } else if (entry.willExpireSoon) {
          status = "Expiring Soon";
        }

        row.innerHTML = `
          <td>${new Date(entry.date).toLocaleDateString()}</td>
          <td>${entry.invoice}</td>
          <td>${entry.earned}</td>
          <td>${entry.redeemed}</td>
          <td>${entry.balance}</td>
          <td>${expiryFormatted}</td>
          <td>${status}</td>
        `;

        if (entry.willExpireSoon) {
          row.style.backgroundColor = "#FFFF00";
        }
        if (expiry < today) {
          row.style.backgroundColor = "#FF0000";
        }

        // lapse button
        const actionCell = document.createElement("td");

        if (
          (entry.type === "Earned" && entry.willExpireSoon) ||
          expiry < today
        ) {
          const lapseBtn = document.createElement("button");
          lapseBtn.textContent = "Lapse";
          lapseBtn.onclick = async () => {
            if (confirm("Are you sure you want to lapse these points?")) {
              try {
                await axios.post(`/lapse-points/${entry.id}`);
                row.remove();
                location.reload();
              } catch (err) {
                alert("Failed to lapse points");
              }
            }
          };
          actionCell.appendChild(lapseBtn);
        } else {
          actionCell.textContent = "—";
        }

        row.appendChild(actionCell);
        tbody.appendChild(row);
      });
    })
    .catch((err) => {
      console.error("Error loading ledger:", err);
    });
} else {
  document.body.innerHTML = "<p>No distributor selected.</p>";
}

//print table
function printTable() {
  const printContents = document.getElementById("printArea").innerHTML;
  const originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
  location.reload();
}
