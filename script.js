// Load JSON data
d3.json("data.json").then(function(data) {
    // Convert flat array into NxN matrix
    const n = 3; // Grid size (NxN)
    const matrix = [];
    for (let i = 0; i < n; i++) {
      matrix.push(data.values.slice(i * n, (i + 1) * n));
    }
    console.log("Matrix:", matrix);
    create3DBars(matrix);
  });
  
  function create3DBars(matrix) {
    const scene = document.querySelector('a-scene');
    const barWidth = 1;
    const spacing = 1.2;
  
    // Find max value for color scaling
    const maxValue = Math.max(...matrix.flat());
  
    // Color scale: blue (low) -> yellow -> red (high)
    const colorScale = d3.scaleLinear()
      .domain([0, maxValue * 0.5, maxValue])
      .range(['#4287f5', '#f5e642', '#f54242']);
  
    // Loop through matrix
    matrix.forEach((row, i) => {
      row.forEach((value, j) => {
        // Create a bar
        const bar = document.createElement('a-box');
        bar.setAttribute('position', {
          x: i * spacing - (matrix.length * spacing / 2),
          y: value / 2, // Center height
          z: j * spacing - (matrix[0].length * spacing / 2)
        });
        bar.setAttribute('width', barWidth);
        bar.setAttribute('height', value);
        bar.setAttribute('depth', barWidth);
        bar.setAttribute('color', colorScale(value)); // Dynamic color
        scene.appendChild(bar);
  
        // Optional: Add label (value as text)
        const label = document.createElement('a-text');
        label.setAttribute('value', value.toString());
        label.setAttribute('position', {
          x: i * spacing - (matrix.length * spacing / 2),
          y: value + 0.5,
          z: j * spacing - (matrix[0].length * spacing / 2)
        });
        label.setAttribute('color', 'black');
        label.setAttribute('align', 'center');
        scene.appendChild(label);
      });
    });
  }