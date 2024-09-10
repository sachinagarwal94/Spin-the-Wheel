let wheel = document.querySelector('.wheel');
let spinBtn = document.querySelector('.spinBtn');
let currentRotation = 0; // Tracks the current rotation value
let spinData = []; // Stores each spin's result

// Function to start the spin
spinBtn.onclick = function() {
    let randomRotation = Math.ceil(Math.random() * 3600); // Random value for full rotation
    currentRotation += randomRotation; // Accumulate the rotation for continuous spinning effect
    wheel.style.transform = `rotate(${currentRotation}deg)`; // Apply the rotation

    // After 5 seconds (the CSS transition duration), calculate the prize
    setTimeout(() => {
        // Calculate the angle the wheel stopped at (0-360 degrees)
        let stoppedAngle = currentRotation % 360;
        // There are 8 sections, each covering 45 degrees
        let prizeIndex = Math.floor(stoppedAngle / 45);
        let prizes = [100, 1, 50, 0, 1000, 10, 5, 20]; // Array of prizes
        let wonPrize = prizes[prizeIndex]; // Get the prize corresponding to the section

        // Prompt the user for their name to associate with the prize
        let customerName = prompt("Enter your name:");
        if (customerName) {
            // Store the result in the spinData array
            let result = {
                name: customerName,
                prize: wonPrize,
                date: new Date().toLocaleString()
            };
            spinData.push(result);
            alert(`${customerName}, you won ${wonPrize}!`);
        }
    }, 5000); // Match this with the CSS transition duration (5s)
};

// Function to export data as CSV
function exportData() {
    let csvContent = "data:text/csv;charset=utf-8,Name,Prize,Date\n";
    spinData.forEach(row => {
        let rowData = `${row.name},${row.prize},${row.date}`;
        csvContent += rowData + "\n";
    });

    // Create a link and trigger download
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "spin_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Add an export button
let exportBtn = document.createElement("button");
exportBtn.textContent = "Export Data";
exportBtn.style.marginTop = "20px";
document.querySelector('.container').appendChild(exportBtn);

// Attach the export function to the button
exportBtn.onclick = exportData;
