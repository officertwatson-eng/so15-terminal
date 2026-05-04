// ============== DATA ==============
let currentUser = null;
let deployments = [];
let bookings = [];
let intelReports = [];
let documents = [];

const vehicles = [
  {id:1, name:"2020 Mitsubishi L200", spawn:"DRONE3", plate:"WX70 FXS", callsign:"DRONE1", division:"C-UAS", features:"Unmarked", status:"In Service"},
  {id:2, name:"2020 Mitsubishi L200", spawn:"DRONE3", plate:"WX70 FXS", callsign:"DRONE2", division:"C-UAS", features:"Unmarked", status:"In Service"},
  {id:3, name:"2013 Mercedes Sprinter Box", spawn:"CBRN1", plate:"BX13 DUJ", callsign:"GUARDIAN-20", division:"CBRN", features:"Marked", status:"Caution", notes:"ELS can cause game crash"},
  {id:4, name:"2023 Mercedes Sprinter", spawn:"CBRN2", plate:"BX73 CBU", callsign:"GUARDIAN-80", division:"CBRN", features:"Marked", status:"In Service"},
  {id:5, name:"2020 Mercedes Sprinter", spawn:"CBRN3", plate:"YA70 RXO", callsign:"GUARDIAN-81", division:"CBRN", features:"Unmarked", status:"In Service"},
  {id:6, name:"2015 Land Rover Discovery", spawn:"EXPO1", plate:"BX65 DOJ", callsign:"EXPO1", division:"EXPO", features:"Marked", status:"In Service", notes:"EOD driver required"},
  {id:7, name:"2022 Land Rover Discovery", spawn:"EXPO2", plate:"WJ72 JTO", callsign:"EXPO2", division:"EXPO", features:"Marked", status:"In Service", notes:"EOD driver required"},
  {id:8, name:"2023 Land Rover Discovery", spawn:"EXPO2", plate:"AE23 XKW", callsign:"EXPO3", division:"EXPO", features:"Marked", status:"In Service", notes:"EOD driver required"}
];

// ============== AUTH ==============
function login(email) {
  currentUser = { email, name: email.split('@')[0].toUpperCase() };
  document.getElementById('user-display').textContent = `👤 ${currentUser.name}`;
  renderSidebar();
  showPage('dashboard');
}

function logout() {
  if (confirm("Log out?")) location.reload();
}

// ============== SIDEBAR ==============
function renderSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = `
    <button onclick="showPage('dashboard')" class="w-full text-left px-4 py-3 hover:bg-gray-800 rounded-lg flex items-center gap-3"><i class="fas fa-home"></i> Dashboard</button>
    <button onclick="showPage('roster')" class="w-full text-left px-4 py-3 hover:bg-gray-800 rounded-lg flex items-center gap-3"><i class="fas fa-users"></i> Roster</button>
    <button onclick="showPage('vehicles')" class="w-full text-left px-4 py-3 hover:bg-gray-800 rounded-lg flex items-center gap-3"><i class="fas fa-car"></i> Vehicle Pool</button>
    <button onclick="showPage('deployment')" class="w-full text-left px-4 py-3 hover:bg-gray-800 rounded-lg flex items-center gap-3"><i class="fas fa-clipboard-list"></i> Deployment Log</button>
    <button onclick="showPage('active')" class="w-full text-left px-4 py-3 hover:bg-gray-800 rounded-lg flex items-center gap-3"><i class="fas fa-bolt"></i> Active Units</button>
    <button onclick="showPage('intel')" class="w-full text-left px-4 py-3 hover:bg-gray-800 rounded-lg flex items-center gap-3"><i class="fas fa-file-alt"></i> Intel Reports</button>
    <button onclick="showPage('documents')" class="w-full text-left px-4 py-3 hover:bg-gray-800 rounded-lg flex items-center gap-3"><i class="fas fa-folder-open"></i> Documents</button>
    <button onclick="showPage('profile')" class="w-full text-left px-4 py-3 hover:bg-gray-800 rounded-lg flex items-center gap-3"><i class="fas fa-user-cog"></i> Profile</button>
  `;
}

// ============== PAGES ==============
function showPage(page) {
  const main = document.getElementById('main-content');
  
  if (page === 'dashboard') {
    main.innerHTML = `
      <h1 class="text-4xl font-bold">Welcome, ${currentUser.name}</h1>
      <p class="text-gray-400 mt-2">SO15 Counter Terrorism Command - BASE44</p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
        <div class="bg-gray-900 p-6 rounded-2xl"><p class="text-red-400">Active Bookings</p><p class="text-5xl font-bold">${bookings.length}</p></div>
        <div class="bg-gray-900 p-6 rounded-2xl"><p class="text-red-400">Deployments</p><p class="text-5xl font-bold">${deployments.length}</p></div>
        <div class="bg-gray-900 p-6 rounded-2xl"><p class="text-red-400">Intel Reports</p><p class="text-5xl font-bold">${intelReports.length}</p></div>
        <div class="bg-gray-900 p-6 rounded-2xl"><p class="text-red-400">Vehicles Ready</p><p class="text-5xl font-bold">${vehicles.length - bookings.length}</p></div>
      </div>`;
  } 
  else if (page === 'roster') {
    // Full roster table with your vehicles (same as previous version)
    let html = `<h1 class="text-3xl font-bold mb-6">Roster</h1><h2 class="text-red-400 mb-4">Vehicles</h2>`;
    html += `<div class="overflow-x-auto"><table class="w-full"><thead><tr class="bg-black"><th class="p-4">Name</th><th>Spawn</th><th>Plate</th><th>Callsign</th><th>Division</th><th>Features</th><th>Status</th><th>Notes</th></tr></thead><tbody>`;
    vehicles.forEach(v => {
      html += `<tr class="border-t border-gray-700 hover:bg-gray-900"><td class="p-4">${v.name}</td><td>${v.spawn}</td><td>${v.plate}</td><td>${v.callsign}</td><td>${v.division}</td><td>${v.features}</td><td class="${v.status==='Caution'?'text-yellow-400':'text-green-400'}">${v.status}</td><td>${v.notes||''}</td></tr>`;
    });
    html += `</tbody></table></div>`;
    main.innerHTML = html;
  } 
  else if (page === 'vehicles') {
    main.innerHTML = `<h1 class="text-3xl font-bold mb-6">Vehicle Pool</h1><p class="text-gray-400">Vehicle booking system coming in next update...</p>`;
  } 
  else {
    main.innerHTML = `<h1 class="text-3xl"> ${page.charAt(0).toUpperCase() + page.slice(1)} </h1><p class="text-gray-500 mt-10">This page is ready for further development.</p>`;
  }
}

// Boot the app
window.onload = () => {
  const email = prompt("Enter your email to access BASE44:", "officer@base44.uk");
  login(email || "demo@base44.uk");
};