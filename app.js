// Get chart canvas element and total/balance elements
const chrt = document.getElementById("myChart");
const totalEl = document.querySelector("#total");
const balanceEl = document.querySelector("#balance");

// Function to extract a specific property from an array of objects
const extractProperty = (data, property) => {
  return data.map((item) => item[property]);
};

// Initial total amount
const totalAmount = 1000;

// Fetch data from JSON file
fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    // Extract data properties for chart
    const days = extractProperty(data, "day");
    const amounts = extractProperty(data, "amount");
    const backgroundColor = extractProperty(data, "backgroundColor");
    const borderColor = extractProperty(data, "borderColor");

    // Calculate total spending amount
    const spendingAmt = amounts.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    // Update total and balance in the UI
    totalEl.textContent = spendingAmt;
    balanceEl.textContent = totalAmount - spendingAmt;

    // Create a new bar chart
    const chartId = new Chart(chrt, {
      type: "bar",
      data: {
        labels: days,
        datasets: [
          {
            label: false,
            data: amounts,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1,
            barThickness: 40,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            display: false,
          },
        },
      },
    });
  });
