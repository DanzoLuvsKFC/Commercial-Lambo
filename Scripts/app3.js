// Fetch data from the API and log it to the console
fetch('https://ergast.com/api/f1/2011/5/laps/1.json')
  .then(response => response.json())
  .then(data => {
    // Log the entire response to inspect its structure
    console.log("API Response:", data);

    // Displaying specific nested parts for easier viewing
    if (data && data.MRData && data.MRData.RaceTable && data.MRData.RaceTable.Races.length > 0) {
      const raceData = data.MRData.RaceTable.Races[0];
      console.log("Race Data:", raceData);

      if (raceData.Laps && raceData.Laps.length > 0) {
        const lapData = raceData.Laps[0].Timings;
        console.log("Lap Timings:", lapData);

        // Convert lap times from "mm:ss.sss" to seconds
        const convertedData = lapData.map(d => ({
          driverId: d.driverId,
          position: +d.position,  // Position as a number
          timeInSeconds: convertTimeToSeconds(d.time),  // Time converted to seconds
        }));

        // Create the visualization with the processed data
        createVisualization(convertedData);
      } else {
        console.log("No laps found in the race data.");
      }
    } else {
      console.log("Unexpected data structure or empty race data.");
    }
  })
  .catch(error => console.error('Error fetching data:', error));

// Function to convert time in "mm:ss.sss" to seconds
function convertTimeToSeconds(time) {
  const [minutes, seconds] = time.split(':');
  const [sec, ms] = seconds.split('.');
  return +minutes * 60 + +sec + (+ms / 1000); // Convert minutes and seconds to total seconds
}

// Function to create the D3 visualization
function createVisualization(data) {
    const width = 800, height = 400;

    const x = d3.scaleLinear()
        .domain([1, d3.max(data, d => d.position)])  // Lap positions (1, 2, 3, ...)
        .range([50, width - 50]);

    const y = d3.scaleLinear()
        .domain([d3.min(data, d => d.timeInSeconds), d3.max(data, d => d.timeInSeconds)])  // Time in seconds
        .range([height - 50, 50]);

    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.driverId))
        .range(d3.schemeCategory10);

    // Select the chart div and append an SVG
    const svg = d3.select("#chart").append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("background", "#f0f0f0");

    // Draw circles for each lap time data point
    svg.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => x(d.position))  // Use lap position for x
        .attr("cy", d => y(d.timeInSeconds)) // Use time for y position
        .attr("r", 5)
        .attr("fill", d => color(d.driverId));

    // X-axis (lap positions)
    svg.append("g")
        .attr("transform", `translate(0,${height - 50})`)
        .call(d3.axisBottom(x).ticks(d3.max(data, d => d.position)));

    // Y-axis (time in seconds)
    svg.append("g")
        .attr("transform", `translate(50, 0)`)
        .call(d3.axisLeft(y));
}
