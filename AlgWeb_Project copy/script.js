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