

// NFT Data from the Python script results
const nftData = [
    {serial: 101, owner: "0.0.8499794", rarity: "Epic", reward: 25000},
    {serial: 102, owner: "0.0.5102323", rarity: "Rare", reward: 50000},
    {serial: 103, owner: "0.0.9143481", rarity: "Epic", reward: 25000},
    {serial: 104, owner: "0.0.1353334", rarity: "Common", reward: 10000},
    {serial: 105, owner: "0.0.8576477", rarity: "Uncommon", reward: 10000},
    {serial: 106, owner: "0.0.8413241", rarity: "Uncommon", reward: 10000},
    {serial: 107, owner: "0.0.4607653", rarity: "Legendary", reward: 100000},
    {serial: 108, owner: "0.0.9143481", rarity: "Epic", reward: 25000},
    {serial: 109, owner: "0.0.6076565", rarity: "Rare", reward: 50000},
    {serial: 110, owner: "0.0.3851685", rarity: "Common", reward: 10000},
    {serial: 111, owner: "0.0.8575949", rarity: "Common", reward: 10000},
    {serial: 112, owner: "0.0.4624432", rarity: "Epic", reward: 25000},
    {serial: 113, owner: "0.0.1453226", rarity: "Uncommon", reward: 10000},
    {serial: 114, owner: "0.0.1097530", rarity: "Epic", reward: 25000},
    {serial: 115, owner: "0.0.8499794", rarity: "Legendary", reward: 100000},
    {serial: 116, owner: "0.0.1097530", rarity: "Rare", reward: 50000},
    {serial: 117, owner: "0.0.7997377", rarity: "Uncommon", reward: 10000},
    {serial: 118, owner: "0.0.4143687", rarity: "Uncommon", reward: 10000},
    {serial: 119, owner: "0.0.1097530", rarity: "Epic", reward: 25000},
    {serial: 120, owner: "0.0.7998789", rarity: "Uncommon", reward: 10000},
    {serial: 121, owner: "0.0.4324445", rarity: "Uncommon", reward: 10000},
    {serial: 122, owner: "0.0.8182572", rarity: "Rare", reward: 50000},
    {serial: 123, owner: "0.0.8413241", rarity: "Rare", reward: 50000},
    {serial: 124, owner: "0.0.1470278", rarity: "Epic", reward: 25000},
    {serial: 125, owner: "0.0.7908415", rarity: "Legendary", reward: 100000},
    {serial: 126, owner: "0.0.9143481", rarity: "Epic", reward: 25000},
    {serial: 127, owner: "0.0.3851685", rarity: "Rare", reward: 50000},
    {serial: 128, owner: "0.0.2031766", rarity: "Common", reward: 10000},
    {serial: 129, owner: "0.0.6076565", rarity: "Epic", reward: 25000},
    {serial: 130, owner: "0.0.4324445", rarity: "Common", reward: 10000},
    {serial: 131, owner: "0.0.8499794", rarity: "Common", reward: 10000},
    {serial: 132, owner: "0.0.8499794", rarity: "Rare", reward: 50000},
    {serial: 133, owner: "0.0.1097530", rarity: "Uncommon", reward: 10000},
    {serial: 134, owner: "0.0.9143481", rarity: "Uncommon", reward: 10000},
    {serial: 135, owner: "0.0.1470278", rarity: "Common", reward: 10000},
    {serial: 136, owner: "0.0.2031766", rarity: "Rare", reward: 50000},
    {serial: 137, owner: "0.0.4624432", rarity: "Uncommon", reward: 10000},
    {serial: 138, owner: "0.0.9143481", rarity: "Legendary", reward: 100000},
    {serial: 139, owner: "0.0.7908415", rarity: "Common", reward: 10000},
    {serial: 140, owner: "0.0.9143481", rarity: "Uncommon", reward: 10000},
    {serial: 141, owner: "0.0.2158065", rarity: "Epic", reward: 25000},
    {serial: 142, owner: "0.0.1453226", rarity: "Epic", reward: 25000},
    {serial: 143, owner: "0.0.9143481", rarity: "Common", reward: 10000},
    {serial: 144, owner: "0.0.3851685", rarity: "Common", reward: 10000},
    {serial: 145, owner: "0.0.2167934", rarity: "Epic", reward: 25000},
    {serial: 146, owner: "0.0.4607653", rarity: "Epic", reward: 25000},
    {serial: 147, owner: "0.0.2031766", rarity: "Uncommon", reward: 10000},
    {serial: 148, owner: "0.0.8499794", rarity: "Common", reward: 10000},
    {serial: 149, owner: "0.0.8499794", rarity: "Rare", reward: 50000},
    {serial: 150, owner: "0.0.9143481", rarity: "Rare", reward: 50000},
    {serial: 151, owner: "0.0.8499794", rarity: "Rare", reward: 50000},
    {serial: 152, owner: "0.0.3851685", rarity: "Epic", reward: 25000},
    {serial: 153, owner: "0.0.4624432", rarity: "Epic", reward: 25000},
    {serial: 154, owner: "0.0.7687902", rarity: "Epic", reward: 25000},
    {serial: 155, owner: "0.0.1470278", rarity: "Common", reward: 10000},
    {serial: 156, owner: "0.0.9143481", rarity: "Epic", reward: 25000},
    {serial: 157, owner: "0.0.4607653", rarity: "Rare", reward: 50000},
    {serial: 158, owner: "0.0.1097530", rarity: "Epic", reward: 25000},
    {serial: 159, owner: "0.0.2167934", rarity: "Rare", reward: 50000},
    {serial: 160, owner: "0.0.1453226", rarity: "Legendary", reward: 100000},
    {serial: 161, owner: "0.0.9143481", rarity: "Rare", reward: 50000},
    {serial: 162, owner: "0.0.8499794", rarity: "Uncommon", reward: 10000},
    {serial: 163, owner: "0.0.7908415", rarity: "Uncommon", reward: 10000},
    {serial: 164, owner: "0.0.2167934", rarity: "Legendary", reward: 100000},
    {serial: 165, owner: "0.0.8413241", rarity: "Rare", reward: 50000}
];

// Rarity icons mapping
const rarityIcons = {
    "Legendary": "fas fa-crown",
    "Rare": "fas fa-star",
    "Epic": "fas fa-bolt",
    "Uncommon": "fas fa-diamond",
    "Common": "fas fa-circle"
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    loadNFTCollection();
    initializeFilters();
    animateOnScroll();
    loadRewardsTable();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Scroll to section
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Load NFT collection
function loadNFTCollection() {
    const nftGrid = document.getElementById('nftGrid');
    nftGrid.innerHTML = '';
    
    nftData.forEach(nft => {
        const nftCard = createNFTCard(nft);
        nftGrid.appendChild(nftCard);
    });
}

// Create NFT card element
function createNFTCard(nft) {
    const card = document.createElement('div');
    card.className = `nft-card ${nft.rarity.toLowerCase()}`;
    card.setAttribute('data-rarity', nft.rarity.toLowerCase());
    
    const iconClass = rarityIcons[nft.rarity];
    
    card.innerHTML = `
        <div class="nft-image">
            <i class="${iconClass}"></i>
        </div>
        <div class="nft-info">
            <div class="nft-serial">Serial #${nft.serial}</div>
            <div class="nft-rarity">${nft.rarity}</div>
            <div class="nft-owner">Owner: ${nft.owner}</div>
            <div class="nft-reward">${nft.reward.toLocaleString()} $SLUG</div>
        </div>
    `;
    
    return card;
}

// Initialize filter functionality
function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter NFTs
            const filter = this.getAttribute('data-filter');
            filterNFTs(filter);
        });
    });
}

// Filter NFTs by rarity
function filterNFTs(filter) {
    const nftCards = document.querySelectorAll('.nft-card');
    
    nftCards.forEach(card => {
        if (filter === 'all') {
            card.style.display = 'block';
        } else {
            const cardRarity = card.getAttribute('data-rarity');
            card.style.display = cardRarity === filter ? 'block' : 'none';
        }
    });
}

// Animate elements on scroll
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe elements
    const elementsToAnimate = document.querySelectorAll('.rarity-card, .owner-card, .nft-card');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Number counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Initialize counter animations when hero section is visible
const heroSection = document.querySelector('.hero');
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = document.querySelectorAll('.stat-value');
            statValues.forEach((element, index) => {
                const targets = [2060000, 65, 5];
                animateCounter(element, targets[index]);
            });
            heroObserver.unobserve(entry.target);
        }
    });
});

heroObserver.observe(heroSection);

// Search functionality (bonus feature)
function searchNFTs(searchTerm) {
    const nftCards = document.querySelectorAll('.nft-card');
    
    nftCards.forEach(card => {
        const serial = card.querySelector('.nft-serial').textContent;
        const owner = card.querySelector('.nft-owner').textContent;
        const rarity = card.querySelector('.nft-rarity').textContent;
        
        const isMatch = serial.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       rarity.toLowerCase().includes(searchTerm.toLowerCase());
        
        card.style.display = isMatch ? 'block' : 'none';
    });
}

// Responsive navigation toggle
function toggleMobileNav() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}
function claimRewards() {
    const claimBtn = document.getElementById('claimBtn');
    const claimSuccess = document.getElementById('claimSuccess');

    // Disable button to prevent multiple clicks
    claimBtn.disabled = true;
    claimBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Processing...`;

    // Simulate reward processing delay (e.g., 2 seconds)
    setTimeout(() => {
        claimSuccess.style.display = 'block';
        claimBtn.style.display = 'none'; // Hide claim button after success
        const resultDiv = document.getElementById('searchResult');
        resultDiv.style.display = 'none';
        claimBtn.innerHTML = `<i class="fas fa-coins"></i> Claim Rewards`; // Reset button text
    }, 2000); // Simulate processing time
}

function searchAccount() {
    const searchInput = document.getElementById('accountSearch');
    const resultDiv = document.getElementById('searchResult');
    const accountId = searchInput.value.trim();
    const claimContainer = document.getElementById('claimContainer');
    const claimBtn = document.getElementById('claimBtn');
    const searchError = document.getElementById('searchError');

    if (!accountId) {
        resultDiv.innerHTML = '<div class="no-results">Please enter an account ID</div>';
        claimContainer.style.display = 'none';
        return;
    }

    const hederaRegex = /^0\.0\.\d+$/;
    if (!hederaRegex.test(accountId)) {
        searchError.style.display = "block";
        resultDiv.innerHTML = '';
        claimContainer.style.display = 'none';
        return;
    }

    searchError.style.display = "none";

    // Filter NFTs for this account
    const userNFTs = nftData.filter(nft => nft.owner === accountId);

    if (userNFTs.length === 0) {
        resultDiv.innerHTML = '<div class="no-results">No NFTs found for this account</div>';
        claimContainer.style.display = 'none';
        return;
    }

    // Calculate statistics
    const totalReward = userNFTs.reduce((sum, nft) => sum + nft.reward, 0);
    const rarityBreakdown = {};

    userNFTs.forEach(nft => {
        if (!rarityBreakdown[nft.rarity]) {
            rarityBreakdown[nft.rarity] = { count: 0, reward: 0 };
        }
        rarityBreakdown[nft.rarity].count++;
        rarityBreakdown[nft.rarity].reward += nft.reward;
    });

    // Generate breakdown HTML
    let breakdownHTML = '';
    Object.keys(rarityBreakdown).forEach(rarity => {
        const data = rarityBreakdown[rarity];
        breakdownHTML += `
            <div class="stat-box">
                <div class="stat-number">${data.count}</div>
                <div class="stat-text">${rarity} NFTs</div>
                <div class="stat-number" style="font-size: 1rem; color: #00ff88;">${data.reward.toLocaleString()} $SLUG</div>
            </div>
        `;
    });

    // Generate NFT list
    let nftListHTML = '';
    userNFTs.forEach(nft => {
        nftListHTML += `
            <div class="nft-mini">
                <div>#${nft.serial}</div>
                <div style="color: ${getRarityColor(nft.rarity)};">${nft.rarity}</div>
                <div style="color: #00ff88;">${nft.reward.toLocaleString()}</div>
            </div>
        `;
    });

    resultDiv.innerHTML = `
        <div class="account-info">
            <h3>${accountId}</h3>
            <div class="account-stats">
                <div class="stat-box">
                    <div class="stat-number">${userNFTs.length}</div>
                    <div class="stat-text">Total NFTs</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number">${totalReward.toLocaleString()}</div>
                    <div class="stat-text">Total $SLUG Rewards</div>
                </div>
                ${breakdownHTML}
            </div>
            <div class="nfts-breakdown">
                <h4 style="color: #00d4ff; margin-bottom: 1rem;">Your NFTs:</h4>
                <div class="nft-list">
                    ${nftListHTML}
                </div>
            </div>
        </div>
    `;

    // Show claim button if eligible (totalReward > 0)
    if (totalReward > 0) {
        claimContainer.style.display = 'block';
        claimBtn.disabled = false;
    } else {
        claimContainer.style.display = 'none';
        claimBtn.disabled = true;
    }
}


function getRarityColor(rarity) {
    const colors = {
        'Legendary': '#ffd700',
        'Rare': '#ff6b9d',
        'Epic': '#9b59b6',
        'Uncommon': '#00d4ff',
        'Common': '#95a5a6'
    };
    return colors[rarity] || '#ffffff';
}

// Generate owner rewards data
function generateOwnerRewards() {
    const ownerMap = {};
    
    nftData.forEach(nft => {
        if (!ownerMap[nft.owner]) {
            ownerMap[nft.owner] = {
                account: nft.owner,
                nfts: [],
                totalReward: 0,
                rarityBreakdown: {}
            };
        }
        
        const owner = ownerMap[nft.owner];
        owner.nfts.push(nft);
        owner.totalReward += nft.reward;
        
        if (!owner.rarityBreakdown[nft.rarity]) {
            owner.rarityBreakdown[nft.rarity] = 0;
        }
        owner.rarityBreakdown[nft.rarity]++;
    });
    
    return Object.values(ownerMap).sort((a, b) => b.totalReward - a.totalReward);
}

// Load rewards table
function loadRewardsTable() {
    const ownerRewards = generateOwnerRewards();
    const tableBody = document.getElementById('tableBody');
    
    tableBody.innerHTML = '';
    
    ownerRewards.forEach((owner, index) => {
        const rank = index + 1;
        
        // Generate breakdown badges
        let breakdownHTML = '';
        Object.keys(owner.rarityBreakdown).forEach(rarity => {
            const count = owner.rarityBreakdown[rarity];
            breakdownHTML += `<span class="rarity-badge rarity-${rarity.toLowerCase()}">${count} ${rarity}</span>`;
        });
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="rank-cell">#${rank}</td>
            <td class="account-cell">${owner.account}</td>
            <td>${owner.nfts.length}</td>
            <td class="reward-cell">${owner.totalReward.toLocaleString()} $SLUG</td>
            <td class="breakdown-cell">${breakdownHTML}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Sort table functionality
let currentSort = { column: 0, ascending: false };

function sortTable(columnIndex) {
    const table = document.getElementById('rewardsTable');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Toggle sort direction if same column
    if (currentSort.column === columnIndex) {
        currentSort.ascending = !currentSort.ascending;
    } else {
        currentSort.column = columnIndex;
        currentSort.ascending = false;
    }
    
    rows.sort((a, b) => {
        let aValue = a.cells[columnIndex].textContent.trim();
        let bValue = b.cells[columnIndex].textContent.trim();
        
        // Handle different data types
        if (columnIndex === 0) { // Rank
            aValue = parseInt(aValue.replace('#', ''));
            bValue = parseInt(bValue.replace('#', ''));
        } else if (columnIndex === 2) { // NFTs count
            aValue = parseInt(aValue);
            bValue = parseInt(bValue);
        } else if (columnIndex === 3) { // Rewards
            aValue = parseInt(aValue.replace(/[^\d]/g, ''));
            bValue = parseInt(bValue.replace(/[^\d]/g, ''));
        }
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return currentSort.ascending ? aValue - bValue : bValue - aValue;
        } else {
            return currentSort.ascending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
    });
    
    // Clear and rebuild table
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    
    // Update sort indicators
    const headers = table.querySelectorAll('th');
    headers.forEach((header, index) => {
        const icon = header.querySelector('i');
        if (index === columnIndex) {
            icon.className = currentSort.ascending ? 'fas fa-sort-up' : 'fas fa-sort-down';
        } else {
            icon.className = 'fas fa-sort';
        }
    });
}

// CSV Download functionality
function downloadCSV() {
    const ownerRewards = generateOwnerRewards();
    
    // CSV headers
    let csvContent = 'Rank,Account ID,NFTs Owned,Total Rewards ($SLUG),Legendary,Rare,Epic,Uncommon,Common,Serial Numbers\n';
    
    // CSV data
    ownerRewards.forEach((owner, index) => {
        const rank = index + 1;
        const legendary = owner.rarityBreakdown['Legendary'] || 0;
        const rare = owner.rarityBreakdown['Rare'] || 0;
        const epic = owner.rarityBreakdown['Epic'] || 0;
        const uncommon = owner.rarityBreakdown['Uncommon'] || 0;
        const common = owner.rarityBreakdown['Common'] || 0;
        const serials = owner.nfts.map(nft => nft.serial).join(';');
        
        csvContent += `${rank},"${owner.account}",${owner.nfts.length},${owner.totalReward},${legendary},${rare},${epic},${uncommon},${common},"${serials}"\n`;
    });
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'nex_nft_rewards.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Handle enter key in search
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('accountSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchAccount();
            }
        });
    }
});

// Export functions for global access
window.scrollToSection = scrollToSection;
window.searchNFTs = searchNFTs;
window.toggleMobileNav = toggleMobileNav;
window.searchAccount = searchAccount;
window.sortTable = sortTable;
window.downloadCSV = downloadCSV;
