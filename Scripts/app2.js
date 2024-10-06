fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas/171/modelos')
    .then(response => response.json())
    .then(data => {
        const numCircles = data.modelos.length;

        // Adjust the radius dynamically based on the number of circles
        const baseRadius = 250;
        const spacingFactor = 1.2;  // Adjust this for more space between circles
        const adjustedRadius = (baseRadius + (numCircles * 2)) * spacingFactor;

        const centerX = 400;
        const centerY = 300;
        const circleSize = 30;

        const carData = data.modelos.map((car, i) => {
            const angle = (i / numCircles) * 2 * Math.PI;
            return {
                name: car.nome,
                x: centerX + adjustedRadius * Math.cos(angle),
                y: centerY + adjustedRadius * Math.sin(angle),
                radius: circleSize,
                index: i
            };
        });

        createChart(carData);
    })
    .catch(error => console.error("Error fetching data:", error));

function createChart(data) {
    const width = 800;
    const height = 600;

    // Set an initial transform that fits the whole view
    let currentTransform = [width / 2, height / 2, height];
    let zoomedIn = false;  // Track if currently zoomed in

    const svg = d3.select("#chicken")
        .attr("viewBox", [0, 0, width, height]);

    const g = svg.append("g");

    // Create circles for each car
    const circles = g.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", d => d.radius)
        .attr("fill", "#fbcd5d");

    // Add text labels for each circle, display the first two words of the name
    g.selectAll("text")
        .data(data)
        .join("text")
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .attr("font-size", "5rem")  // Adjust the font size as needed
        .attr("font-family", "Arial")  // Set the desired font family
        .attr("fill", "black")
        .text(d => {
            // Extract the first two words of the name
            const words = d.name.split(" ");
            return words.slice(0, 2).join(" ");  // Join the first two words
        });

    // Tooltip for hover information
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background", "#f9f9f9")
        .style("padding", "5px")
        .style("border", "1px solid #ddd")
        .style("border-radius", "5px")
        .style("visibility", "hidden")
        .style("font-size", "12px");

    // Add hover event listeners to show the car information
    circles.on("mouseover", (event, d) => {
        tooltip.html(`<strong>Car Model:</strong> ${d.name}`)
            .style("visibility", "visible")
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY + 10}px`);
    })
    .on("mousemove", (event) => {
        tooltip.style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY + 10}px`);
    })
    .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
    });

    // Zoom in function on click
    function zoom(d) {
        if (!zoomedIn) {
            const minScale = 1;
            const zoomMultiplier = 2.5;  // Adjust this value to control zoom level (lower = less zoom)
            const scaleFactor = Math.max(d.radius * zoomMultiplier, minScale);  // Use the multiplier for less zoom
            const i = d3.interpolateZoom(currentTransform, [d.x, d.y, scaleFactor]);

            g.transition()
                .duration(i.duration)
                .attrTween("transform", () => t => transform(currentTransform = i(t)));

            zoomedIn = true;  // Mark as zoomed in
        } else {
            zoomOut();  // If already zoomed in, zoom out on click
        }
    }

    // Zoom out function to reset the view
    function zoomOut() {
        const i = d3.interpolateZoom(currentTransform, [width / 2, height / 2, height]);

        g.transition()
            .duration(i.duration)
            .attrTween("transform", () => t => transform(currentTransform = i(t)));

        zoomedIn = false;  // Mark as zoomed out
    }

    // Function to calculate the transform string for zooming
    function transform([x, y, r]) {
        return `
          translate(${width / 2}, ${height / 2})
          scale(${height / r})
          translate(${-x}, ${-y})
        `;
    }

    // Add click event listeners to trigger the zoom in and zoom out
    circles.on("click", (event, d) => zoom(d));  // Zoom in/out on click

    return svg.node();
}







