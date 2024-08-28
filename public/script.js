function fetchData(endpoint) {
  const url = 'http://localhost:3000' + endpoint;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          `Network response was not ok for the ${endpoint}: ` + res.statusText
        );
      }
      return res.json();
    })
    .then((data) => {
      document.getElementById('result').textContent = JSON.stringify(
        data,
        null,
        2
      );
    })
    .catch((err) => {
      console.error('There has been a problem with your fetch operation:', err);
      document.getElementById('result').textContent = `Error: ${err.message}`;
    });
}

function fetchHistoricalData(endpoint) {
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;

  if (!startDate || !endDate) {
    alert('Please enter both start and end dates.');
    return;
  }

  const timeDiff = Math.abs(new Date(endDate) - new Date(startDate));
  const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  if (diffDays > 5) {
    alert('The timeframe must be less than 6 days.');
    return;
  }

  const fullEndpoint = `${endpoint}?start_date=${startDate}&end_date=${endDate}`;

  fetchData(fullEndpoint);
}
