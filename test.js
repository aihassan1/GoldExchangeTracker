function fetchData(endpoint) {
  const apiBaseUrl = '/api'; // Prefix for API routes
  const fullEndpoint = `${apiBaseUrl}${endpoint}`;

  fetch(fullEndpoint)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('result').textContent = JSON.stringify(
        data,
        null,
        2
      );
    })
    .catch((error) => {
      document.getElementById('result').textContent = `Error: ${error.message}`;
    });
}

function fetchHistoricalData(endpoint) {
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;

  if (!startDate || !endDate) {
    alert('Please enter both start and end dates.');
    return;
  }

  if (!isValidDateFormat(startDate) || !isValidDateFormat(endDate)) {
    alert('Please enter dates in the format YYYY-MM-DD.');
    return;
  }

  const timeDiff = Math.abs(new Date(endDate) - new Date(startDate));
  const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  if (diffDays > 5) {
    alert('The timeframe must be less than 6 days.');
    return;
  }

  const apiBaseUrl = '/api'; // Prefix for API routes
  const fullEndpoint = `${apiBaseUrl}${endpoint}?start_date=${startDate}&end_date=${endDate}`;

  fetch(fullEndpoint)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('result').textContent = JSON.stringify(
        data,
        null,
        2
      );
    })
    .catch((error) => {
      document.getElementById('result').textContent = `Error: ${error.message}`;
    });
}

function isValidDateFormat(dateString) {
  // Regular expression to match YYYY-MM-DD format
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}
function logStartDate() {
  const startDate = document.getElementById('start-date').value;
  console.log(`${startDate}`);
}
