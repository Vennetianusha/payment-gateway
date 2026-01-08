function login() {
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");

  document.getElementById("apiKey").innerText = "key_test_abc123";
  document.getElementById("apiSecret").innerText = "secret_test_xyz789";

  loadTransactions();
}

function loadTransactions() {
  fetch("http://localhost:8000/api/v1/payments", {
    headers: {
      "X-Api-Key": "key_test_abc123",
      "X-Api-Secret": "secret_test_xyz789"
    }
  })
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById("transactions");
      data.forEach(tx => {
        table.innerHTML += `
          <tr>
            <td>${tx.id}</td>
            <td>${tx.order_id}</td>
            <td>${tx.amount}</td>
            <td>${tx.status}</td>
          </tr>`;
      });
    });
}
