// Fetch car data and create the D3 visualization
const fetchCarData = async () => {
    try {
        const response = await fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas/171/modelos');
        const data = await response.json();
        console.log(data);
        const carData = data.modelos;

        const svg = d3.select(".Items");
        const margin = { top: 20, right: 30, bottom: 50, left: 150 };
        const width = svg.attr("width") - margin.left - margin.right;
        const height = svg.attr("height") - margin.top - margin.bottom;

        const g = svg.append("g")
            .attr("transform", `translate(100, 50)`);

        // Define scales
        const x = d3.scaleLinear()
            .range([0, width])
            .domain([0, d3.max(carData, d => d.codigo)])  // Ensure x scale uses the max 'codigo' value
            .clamp(true);  // This ensures the scale doesn't go below 0

        const y = d3.scaleBand()
            .range([0, height])
            .padding(0.1)
            .domain(carData.map(d => d.nome));

        // Add the x-axis
        g.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("d")));

        // Add the y-axis
        g.append("g")
            .call(d3.axisLeft(y));

        // Tooltip setup
        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("position", "relative")
            .style("background-color", "white")
            .style("border", "1px solid black")
            .style("padding", "8px")
            .style("display", "none")
            .style("pointer-events", "none")
            .style("font-family", "Pangchan")
            .style("font-size", "12px");

        // Add bars
        g.selectAll(".bar")
            .data(carData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", 0)
            .attr("y", d => y(d.nome))
            .attr("width", d => Math.max(0, x(d.codigo)))  // Ensure width is not negative
            .attr("height", y.bandwidth())
            .on("mouseover", (event, d) => {
                tooltip.style("display", "block")
                    .html(`<strong>Model:</strong> ${d.nome}<br><strong>Code:</strong> ${d.codigo}`)
                    .style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY - 20}px`);
                d3.select(event.currentTarget).attr("fill", "orange");
            })
            .on("mousemove", (event) => {
                tooltip.style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY - 20}px`);
            })
            .on("mouseout", (event) => {
                tooltip.style("display", "none");
                d3.select(event.currentTarget).attr("fill", "steelblue");
            });

        // Add the "Price Range" label
        svg.append("text")
            .attr("x", width / 2 + 100)
            .attr("y", 30)
            .attr("text-anchor", "middle")
            .attr("font-size", "16px")
            .attr("font-weight", "bold")
            .text("Price Range");

        // Placeholder for images next to bars (optional)
        /*g.selectAll(".car-image")
            .data(carData)
            .enter().append("image")
            .attr("xlink:href", d => `../Images/${d.nome}.jpeg`)
            .attr("x", -50)
            .attr("y", d => y(d.nome) + (y.bandwidth() / 2) - 20)
            .attr("class", "car-image");*/

        // Add car names to the bars (optional)
        /*g.selectAll(".label")
            .data(carData)
            .enter().append("text")
            .attr("x", d => x(d.codigo) + 5)
            .attr("y", d => y(d.nome) + y.bandwidth() / 2)
            .attr("dy", ".35em")
            .text(d => d.nome);*/

    } catch (error) {
        console.error("Error fetching car data:", error);
    }
};

fetchCarData();