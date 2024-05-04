document.addEventListener("DOMContentLoaded", (event) => {
    // Function to update the chart with new data
    function updateChart(newData) {
        const svg = d3.select("#graph-container svg");
        const bars = svg.selectAll(".bar")
            .data(newData);

        bars.enter().append("rect")
            .attr("class", "bar")
            .merge(bars)
            .transition()
            .duration(500)
            .attr("x", d => x(d.category))
            .attr("y", d => y(d.rating))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.rating))
            .attr("fill", d => d.color);

        bars.exit().remove();

        // Update the X axis
        svg.select(".x-axis")
            .transition()
            .duration(500)
            .call(d3.axisBottom(x));

        // Update the Y axis
        svg.select(".y-axis")
            .transition()
            .duration(500)
            .call(d3.axisLeft(y));
    }

    // Handle form submission
    const form = document.createElement('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        fetch('http://localhost:9000/evaluate_project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                project_description: 'Project Description',
                source_code_files: ['file1.txt', 'file2.txt'],
                design_image_files: ['image1.png', 'image2.jpg']
            })
        })
        .then(response => response.json())
        .then(data => {
            // Update overall score
            document.getElementById('overall').textContent = `Overall Score: ${data.Overall.Score}`;

            // Update individual categories
            document.getElementById('creativity').textContent = `Creativity Score: ${data.Creativity.Score}`;
            document.getElementById('complexity').textContent = `Complexity Score: ${data.Complexity.Score}`;
            document.getElementById('design').textContent = `Design Score: ${data.Design.Score}`;
            document.getElementById('usefulness').textContent = `Usefulness Score: ${data.Usefulness.Score}`;
            document.getElementById('completeness').textContent = `Completeness Score: ${data.Completeness.Score}`;

            // Add feedback button event listeners
            document.getElementById('feedback-button-creativity').addEventListener('click', () => {
                document.getElementById('modal-content').textContent = data.Creativity.Explanation;
                document.getElementById('modal-container').style.display = 'block';
            });
            // Add similar event listeners for other categories

            // Update the chart
            const newData = [
                { category: 'Creativity', rating: data.Creativity.Score, color: 'steelblue' },
                { category: 'Complexity', rating: data.Complexity.Score, color: 'orange' },
                { category: 'Design', rating: data.Design.Score, color: 'green' },
                { category: 'Usefulness', rating: data.Usefulness.Score, color: 'blue' },
                { category: 'Completeness', rating: data.Completeness.Score, color: 'red' }
            ];
            updateChart(newData);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    document.body.appendChild(form);

    // Modal close button functionality
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('modal-container').style.display = 'none';
    });

    // Set up SVG canvas
    const svgWidth = 600;
    const svgHeight = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3.select("#graph-container").append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Set the domains
    const x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .rangeRound([height, 0]);

    // Add X axis
    g.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height})`);

    // Add Y axis
    g.append("g")
        .attr("class", "y-axis");

    // Add Y axis label
    g.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", -10 - margin.left + 10)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("text-anchor", "middle")
        .text("Rating");

    // Helper function to generate random colors
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
