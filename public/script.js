function fetchData(endpoint) {
  fetch(`http://localhost:3000/${endpoint}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          `Network response was not ok for the ${endpoint}` +
            response.statusText
        );
      }
      return res.json();
    })
    .catch((err) => {
      console.error('There has been a problem with your fetch operation:', err);
    });
}
