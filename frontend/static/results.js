document.addEventListener("DOMContentLoaded", (event) => {
    const data = [
        { category: 'Creativity', rating: 8, color: 'steelblue' },
        { category: 'Complexity', rating: 7, color: 'orange' },
        { category: 'Impact', rating: 9, color: 'green' },
        { category: 'Completeness', rating: 6, color: 'red' }
    ];

    // Set up SVG canvas
    const svgWidth = 600;
    const svgHeight = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3.select("body").append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Set the domains
    const x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.1)
        .domain(data.map(d => d.category));

    const y = d3.scaleLinear()
        .rangeRound([height, 0])
        .domain([0, d3.max(data, d => d.rating)]);
            

    // Add bars
    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.category))
        .attr("y", d => y(d.rating))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.rating))
        .attr("fill", d => d.color); // Set color based on data

    // Add X axis
    g.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Add Y axis
    g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(5));

    // Add Y axis label
    g.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", -10 - margin.left + 10)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("text-anchor", "middle")
        .text("Rating");
});

