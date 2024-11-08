// Initialize the filter state
let filterActive = false;

// Fetch data from the API and log it to the console
fetch('https://ergast.com/api/f1/2011/5/laps/1.json')
  .then(response => response.json())
  .then(data => {
    if (data && data.MRData && data.MRData.RaceTable && data.MRData.RaceTable.Races.length > 0) {
      const raceData = data.MRData.RaceTable.Races[0];
      if (raceData.Laps && raceData.Laps.length > 0) {
        const lapData = raceData.Laps[0].Timings;
        const convertedData = lapData.map(d => ({
          driverId: d.driverId,
          position: +d.position, // Position as a number
          timeInSeconds: convertTimeToSeconds(d.time), // Time converted to seconds
        }));
        createVisualization(convertedData);
      }
    }
  })
  .catch(error => console.error('Error fetching data:', error));

// Function to convert time in "mm:ss.sss" to seconds
function convertTimeToSeconds(time) {
  const [minutes, seconds] = time.split(':');
  const [sec, ms] = seconds.split('.');
  return +minutes * 60 + +sec + (+ms / 1000);
}

// Function to create the D3 visualization
function createVisualization(data) {
  const width = 800, height = 400;

  const x = d3.scaleLinear()
      .domain([1, d3.max(data, d => d.position)])
      .range([50, width - 50]);

  const y = d3.scaleLinear()
      .domain([d3.min(data, d => d.timeInSeconds), d3.max(data, d => d.timeInSeconds)])
      .range([height - 50, 50]);

  const color = d3.scaleOrdinal()
      .domain(data.map(d => d.driverId))
      .range(d3.schemeCategory10);

  const svg = d3.select("#chart").append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("background", "#f0f0f0");

  const circles = svg.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", d => x(d.position))
      .attr("cy", d => y(d.timeInSeconds))
      .attr("r", 5)
      .attr("fill", d => getFillColor(d.position));

  svg.append("g")
      .attr("transform", `translate(0,${height - 50})`)
      .call(d3.axisBottom(x).ticks(d3.max(data, d => d.position)));

  svg.append("g")
      .attr("transform", `translate(50, 0)`)
      .call(d3.axisLeft(y));

  // Add event listener for the button
  document.getElementById("filterButton").addEventListener("click", () => {
    filterActive = !filterActive;
    circles.attr("fill", d => getFillColor(d.position));
  });
}

// Function to get the fill color based on filter state and position
function getFillColor(position) {
  if (filterActive) {
    // Filter mode on: positions 1, 2, and 4 to a specific color, others to black
    return [1, 2, 4].includes(position) ? "#fbcd5d" : "black";
  } else {
    // Normal color mode
    return d3.schemeCategory10[position % 10];
  }
}
