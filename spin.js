// Spin the wheel logic
const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spin-btn");
const exportButton = document.getElementById("export-btn");
const prizes = ["Bonus ₹10,000", "Discount 10%", "Free Coffee", "Trimmer at ₹899", "₹400 off on Fashion", "Polo Perfume"];

// Function to spin the wheel
spinButton.addEventListener("click", () => {
  const angle = Math.floor(Math.random() * 360); // Random angle
  wheel.style.transform = `rotate(${angle}deg)`;
  
  const prizeIndex = Math.floor(angle / (360 / prizes.length)); // Determine which prize
  const wonPrize = prizes[prizeIndex];
  
  setTimeout(() => {
    alert(`You won: ${wonPrize}`);
    recordSpin(wonPrize);
  }, 3000); // Give some time for the spin animation
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
