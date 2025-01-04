let visualizationInProgress = null; // Track the current visualization process

function clearVisualization() {
    if (visualizationInProgress) {
        clearTimeout(visualizationInProgress);
        visualizationInProgress = null; // Reset the variable
    }
    const canvas = document.getElementById('visualizer');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
}

// Function to visualize Bubble Sort algorithm
function visualizeBubbleSort(array) {
    clearVisualization(); // Clear any previous visualization
    const canvas = document.getElementById('visualizer');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const barWidth = width / array.length;
    
    // Function to draw the array as bars
    function drawArray(arr, current = -1, next = -1) {
        ctx.clearRect(0, 0, width, height); // Clear the canvas
        for (let i = 0; i < arr.length; i++) {
            const barHeight = arr[i] * 5; // Scale up the height for visibility
            if (i === current) {
                ctx.fillStyle = 'red'; // Highlight the current element in red
            } else if (i === next) {
                ctx.fillStyle = 'yellow'; // Highlight the next element (for swap) in yellow
            } else {
                ctx.fillStyle = 'darkblue'; // Default color for non-highlighted bars
            }
            ctx.fillRect(i * barWidth, height - barHeight, barWidth, barHeight); // Draw the bar
        }
    }
    // Bubble Sort algorithm with visualization
    let i = 0;
    let j = 0;
    function bubbleSortStep() {
        if (i < array.length) {
            if (j < array.length - i - 1) {
                drawArray(array, j, j + 1); // Highlight the current and next elements
                if (array[j] > array[j + 1]) {
                    // Swap the elements
                    [array[j], array[j + 1]] = [array[j + 1], array[j]]; // Swap elements
                }
                j++;
            } else {
                j = 0;
                i++;
            }
            visualizationInProgress = setTimeout(bubbleSortStep, 45); // Update step
        } else {
            clearVisualization(); // Clear the canvas after sorting is done
            
        }
    }
    bubbleSortStep(); // Start the algorithm
}

function visualizeBinarySearch(array, keyTarget) {
    clearVisualization(); // Clear any previous visualization
    const canvas = document.getElementById('visualizer');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const barWidth = width / array.length;

    function drawArray(arr, mid, high, low){
        ctx.clearRect(0, 0, width, height); // Clear the canvas
        for (let i = 0; i < arr.length; i++) {
            const barHeight = arr[i] * 5; // Scale up the height for visibility
            if(i == mid){
                ctx.fillStyle = 'red'; // Highlight the middle element
            } else if(i == low){
                ctx.fillStyle = 'yellow'; // Highlight the low point
            } else if(i == high){
                ctx.fillStyle = 'green'; // Highlight the high point
            }
            else {
                ctx.fillStyle = 'darkblue'; // Default color for non-highlighted bars
            }
            ctx.fillRect(i * barWidth, height - barHeight, barWidth, barHeight); // Draw the bar
        }
    }
    // Binary search algorithm with visualization
    low = 0;
    high = array.length - 1;

    function binarySearchStep(){
        if(low <= high){
            const mid = Math.floor((low + high) / 2); 
            drawArray(array, mid, high, low);

            if (array[mid] === keyTarget) {
                // Target found, highlight the mid element in red (already done)
                clearVisualization(); // End visualization when target is found
            } else if (array[mid] < keyTarget) {
                // Target value is higher than mid value
                low = mid + 1; // Narrow down to the right half
            } else {
                // Target value is lower than mid value
                high = mid - 1; // Narrow down the left half
            }

            // Continue the search after a delay
            visualizationInProgress = setTimeout(binarySearchStep, 500); 
        } else {
            clearVisualization(); // Clear the canvas after sorting is done
        }
    }
    binarySearchStep(); // Start the binary search
}

// Function to update content when Sorting Algorithm is clicked
document.getElementById('sorting').addEventListener('click', function(event) {
    event.preventDefault();
    clearVisualization(); // Stop any ongoing visualization
    
    // Initialize an array with random values for visualization
    const array = [];
    for (let i = 0; i < 50; i++) {
        array.push(Math.floor(Math.random() * 80) + 1); // Random values between 1 and 80
    }
    
    // Call the visualization function for Bubble Sort
    visualizeBubbleSort(array);
});

document.getElementById('binary').addEventListener('click', function(event) {
    event.preventDefault();
    clearVisualization(); // Stop any ongoing visualization

    const array = [];
    for (let i = 0; i < 50; i++) {
        array.push(Math.floor(Math.random() * 80) + 1); // Random values between 1 and 80
    }
    // Sort the array for binary search
    array.sort((a, b) => a - b); // Binary search requires a sorted array

    // Select a random value from the generated array as the target
    const keyTarget = array[Math.floor(Math.random() * array.length)];
    
    visualizeBinarySearch(array, keyTarget);
});

function visualizeGraph(graph, visitedNodes = []) {
    const canvas = document.getElementById('visualizer');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height); // Clear canvas

    const radius = 20; // Node radius
    const nodePositions = {};

    // Calculate positions for graph nodes (circular layout)
    const centerX = width / 2;
    const centerY = height / 2;
    const nodeCount = Object.keys(graph).length;
    const angleStep = (2 * Math.PI) / nodeCount;

    Object.keys(graph).forEach((node, index) => {
        const angle = index * angleStep;
        nodePositions[node] = {
            x: centerX + Math.cos(angle) * 150,
            y: centerY + Math.sin(angle) * 150
        };
    });

    // Draw edges
    ctx.strokeStyle = '#000';
    Object.keys(graph).forEach((node) => {
        const { x: x1, y: y1 } = nodePositions[node];
        graph[node].forEach((neighbor) => {
            const { x: x2, y: y2 } = nodePositions[neighbor];
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        });
    });

    // Draw nodes
    Object.keys(nodePositions).forEach((node) => {
        const { x, y } = nodePositions[node];
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = visitedNodes.includes(node) ? 'green' : 'darkblue'; // Highlight visited nodes
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node, x, y); // Node label
    });
}

// DFS Visualization
function visualizeDFS(graph, startNode) {
    clearVisualization();
    const visitedNodes = [];
    const stack = [startNode];

    function dfsStep() {
        if (stack.length > 0) {
            const currentNode = stack.pop();
            if (!visitedNodes.includes(currentNode)) {
                visitedNodes.push(currentNode);
                stack.push(...graph[currentNode].filter((neighbor) => !visitedNodes.includes(neighbor)));
                visualizeGraph(graph, visitedNodes); // Update graph visualization
                visualizationInProgress = setTimeout(dfsStep, 1000); // Delay for animation
            }
        }
    }

    dfsStep(); // Start DFS
}

// BFS Visualization
function visualizeBFS(graph, startNode) {
    clearVisualization();
    const visitedNodes = [];
    const queue = [startNode];

    function bfsStep() {
        if (queue.length > 0) {
            const currentNode = queue.shift();
            if (!visitedNodes.includes(currentNode)) {
                visitedNodes.push(currentNode);
                queue.push(...graph[currentNode].filter((neighbor) => !visitedNodes.includes(neighbor)));
                visualizeGraph(graph, visitedNodes); // Update graph visualization
                visualizationInProgress = setTimeout(bfsStep, 1000); // Delay for animation
            }
        }
    }

    bfsStep(); // Start BFS
}

// Event listeners for DFS and BFS
document.getElementById('dfs').addEventListener('click', function (event) {
    event.preventDefault();
    clearVisualization();

    // Example graph
    const graph = {
        A: ['B', 'C'],
        B: ['A', 'D', 'E'],
        C: ['A', 'F'],
        D: ['B'],
        E: ['B', 'F'],
        F: ['C', 'E']
    };

    visualizeDFS(graph, 'A'); // Start DFS from node 'A'
});

document.getElementById('bfs').addEventListener('click', function (event) {
    event.preventDefault();
    clearVisualization();

    // Example graph
    const graph = {
        A: ['B', 'C'],
        B: ['A', 'D', 'E'],
        C: ['A', 'F'],
        D: ['B'],
        E: ['B', 'F'],
        F: ['C', 'E']
    };

    visualizeBFS(graph, 'A'); // Start BFS from node 'A'
});
