fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas/171/modelos')
    .then(response => response.json())
    .then(data => {
        const numCircles = data.modelos.length;
        const radius = 250;  
        const centerX = 400;  
        const centerY = 300;  
        const circleSize = 30;  

        const carData = data.modelos.map((car, i) => {
            const angle = (i / numCircles) * 2 * Math.PI;  
            return {
                name: car.nome,
                x: centerX + radius * Math.cos(angle),  
                y: centerY + radius * Math.sin(angle),  
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

    // Updated to set an initial transform that fits the whole view
    let currentTransform = [width / 2, height / 2, height];  

    const svg = d3.select("#chicken")
        .attr("viewBox", [0, 0, width, height]);

    const g = svg.append("g");

    // Create circles for each car
    g.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", d => d.radius)  // Use constant radius
        .attr("fill", "#fbcd5d");

    // Add text labels for each circle
    g.selectAll("text")
        .data(data)
        .join("text")
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("dy", ".35em")  
        .attr("text-anchor", "middle")  
        .attr("font-size", "3px")
        .attr("font-family", "Satoshi")
        .attr("fill", "black")
        .text(d => d.name);

    // Zoom transition function (continuous animation)
    function transition() {
        const d = data[Math.floor(Math.random() * data.length)];
        // Ensure the zoom level does not go below a minimum scale
        const minScale = 1; // Minimum scale to ensure visibility
        const scaleFactor = Math.max(d.radius * 2, minScale);
        const i = d3.interpolateZoom(currentTransform, [d.x, d.y, scaleFactor]);

        g.transition()
            .delay(250)
            .duration(i.duration)
            .attrTween("transform", () => t => transform(currentTransform = i(t)))
            .on("end", transition);  // Continue the transition in a loop
    }

    // Function to calculate the transform string for zooming
    function transform([x, y, r]) {
        return `
          translate(${width / 2}, ${height / 2})
          scale(${height / r})
          translate(${-x}, ${-y})
        `;
    }

    return svg.call(transition).node();  // Start the transition immediately
}




    
