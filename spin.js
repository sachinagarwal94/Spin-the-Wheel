// Spin the wheel logic
const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spin-btn");
const exportButton = document.getElementById("export-btn");
const prizes = ["Bonus ₹10,000", "Discount 10%", "Free Coffee", "Trimmer at ₹899", "₹400 off on Fashion", "Polo Perfume"];

let currentRotation = 0; // Track the current rotation angle

// Function to spin the wheel
spinButton.addEventListener("click", () => {
  const randomSpins = Math.floor(Math.random() * 3600) + 1800; // Random number of spins between 5 and 10 full rotations
  const prizeIndex = Math.floor(Math.random() * prizes.length); // Random prize index

  const prizeAngle = prizeIndex * (360 / prizes.length); // Calculate the angle of the prize
  const totalRotation = currentRotation + randomSpins + prizeAngle; // Total rotation includes current rotation and prize angle
  
  wheel.style.transform = `rotate(${totalRotation}deg)`; // Set the rotation on the wheel

  currentRotation = totalRotation % 360; // Update currentRotation for the next spin

  setTimeout(() => {
    alert(`You won: ${prizes[prizeIndex]}`);
    recordSpin(prizes[prizeIndex]);
  }, 4000); // Give enough time for the spin to complete (4s as per CSS transition)
});

// Function to record each spin
function recordSpin(wonPrize) {
  const customer = prompt("Enter Customer Name:");
  const date = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
  
  const spinData = {
    customer: customer,
    prize: wonPrize,
    date: date
  };

  // Retrieve existing spins from localStorage
  const spins = JSON.parse(localStorage.getItem('spins')) || [];
  
  // Add the new spin data
  spins.push(spinData);
  
  // Save back to localStorage
  localStorage.setItem('spins', JSON.stringify(spins));
}

// Export data as CSV
exportButton.addEventListener("click", () => {
  const spins = JSON.parse(localStorage.getItem('spins')) || [];

  if (spins.length === 0) {
    alert("No data to export!");
    return;
  }

  let csvContent = "Customer Name,Prize,Date\n";
  spins.forEach(spin => {
    csvContent += `${spin.customer},${spin.prize},${spin.date}\n`;
  });

  // Create a downloadable CSV file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "spins_data.csv");
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
