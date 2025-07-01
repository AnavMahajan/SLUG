
// Token data for analysis
const tokenData = [
    { token: "Token A", janPrice: 0.001802, currentPrice: 0.001790, change: -0.67, status: "Slight Loss" },
    { token: "Token B", janPrice: 0.004914, currentPrice: 0.003348, change: -31.87, status: "Medium Loss" },
    { token: "Token C", janPrice: 0.0002568, currentPrice: 0.00009054, change: -64.74, status: "Heavy Loss" },
    { token: "Token D", janPrice: 0.00248, currentPrice: 0.0000507, change: -97.96, status: "Massive Loss" },
    { token: "Token E", janPrice: 0.000038, currentPrice: 0.0000204, change: -46.32, status: "Medium Loss" },
    { token: "Token F", janPrice: 0.0006759, currentPrice: 0.0000866, change: -87.19, status: "Heavy Loss" },
    { token: "Token G", janPrice: 0.00008072, currentPrice: 0.0000368, change: -54.41, status: "Heavy Loss" },
    { token: "Token H", janPrice: 0.00042, currentPrice: 0.00004, change: -90.48, status: "Heavy Loss" },
    { token: "Token I", janPrice: 0.00017, currentPrice: 0.00008, change: -52.94, status: "Heavy Loss" },
    { token: "Token J", janPrice: 0.000232, currentPrice: 0.00007977, change: -65.62, status: "Heavy Loss" },
    { token: "Token K", janPrice: 0.0004736, currentPrice: 0.0000579, change: -87.77, status: "Heavy Loss" },
    { token: "Token L", janPrice: 0.00006934, currentPrice: 0.00005434, change: -21.63, status: "Small Loss" },
    { token: "Token M", janPrice: 0.0000921, currentPrice: 0.00004913, change: -46.66, status: "Medium Loss" },
    { token: "Token N", janPrice: 0.00006971, currentPrice: 0.00002896, change: -58.46, status: "Heavy Loss" },
    { token: "Token O", janPrice: 0.0001967, currentPrice: 0.0002823, change: 43.52, status: "Profitable" },
    { token: "SLUG", janPrice: 0.00005743, currentPrice: 0.0001538, change: 167.78, status: "Top Performer" }
];

// DOM elements
let chart = null;
let currentChartType = 'bar';

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDisclaimer();
    initializeTheme();
    initializeAnimations();
    initializeCounters();
    initializeChart();
    initializeTable();
    initializeEventListeners();
    initializeScrollAnimations();
    initializeComingSoonModal();
});

// Disclaimer modal functionality
function initializeDisclaimer() {
    const modal = document.getElementById('disclaimerModal');
    const acceptBtn = document.getElementById('acceptDisclaimer');
    
    // Check if user has already accepted disclaimer
    const disclaimerAccepted = localStorage.getItem('disclaimerAccepted');
    
    if (!disclaimerAccepted) {
        // Show modal on page load
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        modal.classList.add('hidden');
    }
    
    // Handle accept button
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('disclaimerAccepted', 'true');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        
        // Add fade out animation
        modal.style.animation = 'modalSlideOut 0.3s ease-in forwards';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });
    
    // Prevent closing by clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            // Don't close - require explicit acceptance
            acceptBtn.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                acceptBtn.style.animation = '';
            }, 500);
        }
    });
}

// Theme functionality
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    
    // Check for saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    
    // Ensure dark mode is set on first load
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'dark');
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        
        // Update chart colors if chart exists
        if (chart) {
            updateChartTheme();
        }
    });
}

// Counter animation
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000;
    const start = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = target * easeOutQuart(progress);
        element.textContent = target > 100 ? current.toFixed(2) : Math.floor(current);
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

// Chart functionality
function initializeChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    createChart(ctx, 'bar');
}

function createChart(ctx, type) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#f1f5f9' : '#1a202c';
    const gridColor = isDark ? '#334155' : '#e2e8f0';
    
    if (chart) {
        chart.destroy();
    }
    
    const data = prepareChartData(type);
    const chartConfig = {
        type: type === 'scatter' ? 'scatter' : (type === 'distribution' ? 'bar' : 'bar'),
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: isDark ? '#1e293b' : '#ffffff',
                    titleColor: textColor,
                    bodyColor: textColor,
                    borderColor: gridColor,
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            if (type === 'scatter') {
                                const token = tokenData[context.dataIndex];
                                return `${token.token}: ${token.change.toFixed(2)}%`;
                            } else if (type === 'distribution') {
                                return `${context.parsed.y} tokens`;
                            } else {
                                const token = tokenData[context.dataIndex];
                                return `${token.token}: ${token.change.toFixed(2)}%`;
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: type === 'distribution',
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: textColor,
                        callback: function(value) {
                            return type === 'distribution' ? value : value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: textColor,
                        maxRotation: type === 'distribution' ? 45 : 45
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            }
        }
    };
    
    // Specific configuration for scatter plot
    if (type === 'scatter') {
        chartConfig.options.scales.x.type = 'linear';
        chartConfig.options.scales.x.position = 'bottom';
        chartConfig.options.scales.x.title = {
            display: true,
            text: 'Token Index',
            color: textColor
        };
        chartConfig.options.scales.y.title = {
            display: true,
            text: 'Performance %',
            color: textColor
        };
    }
    
    chart = new Chart(ctx, chartConfig);
}

function prepareChartData(type) {
    if (type === 'distribution') {
        return createDistributionData();
    }
    
    if (type === 'scatter') {
        return createScatterData();
    }
    
    const labels = tokenData.map(token => token.token === 'SLUG' ? 'SLUG ⭐' : 'Anonymous');
    const data = tokenData.map(token => token.change);
    const colors = tokenData.map(token => getTokenColor(token.change, token.token === 'SLUG'));
    
    return {
        labels: labels,
        datasets: [{
            label: 'Performance %',
            data: data,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 2,
            borderRadius: 4,
        }]
    };
}

function createScatterData() {
    const scatterData = tokenData.map((token, index) => ({
        x: index + 1,
        y: token.change
    }));
    
    const colors = tokenData.map(token => getTokenColor(token.change, token.token === 'SLUG'));
    
    return {
        datasets: [{
            label: 'Token Performance',
            data: scatterData,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 2,
            pointRadius: 8,
            pointHoverRadius: 12,
        }]
    };
}

function createDistributionData() {
    const ranges = [
        { label: 'Massive Loss (< -75%)', min: -100, max: -75, count: 0 },
        { label: 'Heavy Loss (-75% to -50%)', min: -75, max: -50, count: 0 },
        { label: 'Medium Loss (-50% to -25%)', min: -50, max: -25, count: 0 },
        { label: 'Slight Loss (-25% to 0%)', min: -25, max: 0, count: 0 },
        { label: 'Profitable (> 0%)', min: 0, max: 200, count: 0 }
    ];
    
    tokenData.forEach(token => {
        if (token.change <= -75) {
            ranges[0].count++;
        } else if (token.change <= -50) {
            ranges[1].count++;
        } else if (token.change <= -25) {
            ranges[2].count++;
        } else if (token.change <= 0) {
            ranges[3].count++;
        } else {
            ranges[4].count++;
        }
    });
    
    return {
        labels: ranges.map(r => r.label),
        datasets: [{
            label: 'Token Count',
            data: ranges.map(r => r.count),
            backgroundColor: [
                '#dc2626', // Massive Loss
                '#ef4444', // Heavy Loss
                '#f97316', // Medium Loss
                '#f59e0b', // Slight Loss
                '#22c55e'  // Profitable
            ],
            borderColor: [
                '#dc2626',
                '#ef4444',
                '#f97316',
                '#f59e0b',
                '#22c55e'
            ],
            borderWidth: 2,
            borderRadius: 4,
        }]
    };
}

function getTokenColor(change, isSLUG) {
    if (isSLUG) return '#10b981';
    if (change > 0) return '#22c55e';
    if (change > -25) return '#f59e0b';
    if (change > -50) return '#f97316';
    if (change > -75) return '#ef4444';
    return '#dc2626';
}

function updateChartTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#f1f5f9' : '#1a202c';
    const gridColor = isDark ? '#334155' : '#e2e8f0';
    
    chart.options.scales.y.grid.color = gridColor;
    chart.options.scales.x.grid.color = gridColor;
    chart.options.scales.y.ticks.color = textColor;
    chart.options.scales.x.ticks.color = textColor;
    chart.options.plugins.tooltip.backgroundColor = isDark ? '#1e293b' : '#ffffff';
    chart.options.plugins.tooltip.titleColor = textColor;
    chart.options.plugins.tooltip.bodyColor = textColor;
    chart.options.plugins.tooltip.borderColor = gridColor;
    
    chart.update('none');
}

// Table functionality
function initializeTable() {
    const tableBody = document.getElementById('tableBody');
    renderTable(tokenData);
}

function renderTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    
    data.forEach(token => {
        const row = document.createElement('tr');
        if (token.token === 'SLUG') {
            row.classList.add('slug-row');
        }
        
        row.innerHTML = `
            <td><strong>${token.token}</strong></td>
            <td>$${token.janPrice.toFixed(8)}</td>
            <td>$${token.currentPrice.toFixed(8)}</td>
            <td style="color: ${token.change > 0 ? '#22c55e' : '#ef4444'}; font-weight: 600;">
                ${token.change > 0 ? '+' : ''}${token.change.toFixed(2)}%
            </td>
            <td><span class="status-badge status-${getStatusClass(token.status)}">${token.status}</span></td>
            <td class="trend-indicator">${token.change > 0 ? '📈' : '📉'}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

function getStatusClass(status) {
    const statusMap = {
        'Top Performer': 'profit',
        'Profitable': 'profit',
        'Slight Loss': 'slight-loss',
        'Small Loss': 'slight-loss',
        'Medium Loss': 'medium-loss',
        'Heavy Loss': 'heavy-loss',
        'Massive Loss': 'massive-loss'
    };
    return statusMap[status] || 'slight-loss';
}

// Event listeners
function initializeEventListeners() {
    // Chart type buttons
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const chartType = e.target.getAttribute('data-chart');
            currentChartType = chartType;
            
            const ctx = document.getElementById('performanceChart').getContext('2d');
            createChart(ctx, chartType);
        });
    });
    
    // Table filtering
    const statusFilter = document.getElementById('statusFilter');
    const searchInput = document.getElementById('searchInput');
    
    statusFilter.addEventListener('change', filterTable);
    searchInput.addEventListener('input', filterTable);
    
    // Table sorting
    document.querySelectorAll('th[data-sort]').forEach(th => {
        th.addEventListener('click', () => sortTable(th.getAttribute('data-sort')));
    });
    
    // CTA button
    document.querySelector('.cta-button').addEventListener('click', () => {
        alert('🚀 SLUG tracking feature coming soon in v2.0!');
    });
}

function filterTable() {
    const statusFilter = document.getElementById('statusFilter').value;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    let filteredData = tokenData;
    
    // Apply status filter
    if (statusFilter !== 'all') {
        filteredData = filteredData.filter(token => {
            switch(statusFilter) {
                case 'profit':
                    return token.change > 0;
                case 'loss':
                    return token.change < 0;
                case 'heavy':
                    return token.change < -50;
                default:
                    return true;
            }
        });
    }
    
    // Apply search filter
    if (searchTerm) {
        filteredData = filteredData.filter(token =>
            token.token.toLowerCase().includes(searchTerm) ||
            token.status.toLowerCase().includes(searchTerm)
        );
    }
    
    renderTable(filteredData);
}

function sortTable(column) {
    const sortedData = [...tokenData].sort((a, b) => {
        switch(column) {
            case 'token':
                return a.token.localeCompare(b.token);
            case 'jan-price':
                return b.janPrice - a.janPrice;
            case 'current-price':
                return b.currentPrice - a.currentPrice;
            case 'change':
                return b.change - a.change;
            case 'status':
                return a.status.localeCompare(b.status);
            default:
                return 0;
        }
    });
    
    renderTable(sortedData);
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements
    document.querySelectorAll('.stat-card, .analysis-card, .insight-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// General animations
function initializeAnimations() {
    // Add slide-up animation to main sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
        section.classList.add('animate-slide-up');
    });
}

// Utility functions
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 8,
        maximumFractionDigits: 8
    }).format(value);
}

function formatPercentage(value) {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
}

// Calculator functionality
function calculateGains() {
    const oldPrice = parseFloat(document.getElementById('oldPrice').value);
    const newPrice = parseFloat(document.getElementById('newPrice').value);
    const investment = parseFloat(document.getElementById('investment').value);
    
    if (!oldPrice || !newPrice || !investment) {
        alert('Please fill in all fields');
        return;
    }
    
    const percentageChange = ((newPrice - oldPrice) / oldPrice) * 100;
    const totalGain = investment * (percentageChange / 100);
    const finalValue = investment + totalGain;
    
    document.getElementById('percentageChange').textContent = 
        `${percentageChange > 0 ? '+' : ''}${percentageChange.toFixed(2)}%`;
    document.getElementById('totalGain').textContent = 
        `${totalGain > 0 ? '+' : ''}$${totalGain.toFixed(2)}`;
    document.getElementById('finalValue').textContent = 
        `$${finalValue.toFixed(2)}`;
    
    const resultsElement = document.getElementById('calculatorResults');
    resultsElement.classList.add('show');
    
    // Apply colors based on gain/loss
    const changeElement = document.getElementById('percentageChange');
    const gainElement = document.getElementById('totalGain');
    const valueElement = document.getElementById('finalValue');
    
    if (percentageChange > 0) {
        changeElement.style.color = '#22c55e';
        gainElement.style.color = '#22c55e';
        valueElement.style.color = '#22c55e';
    } else {
        changeElement.style.color = '#ef4444';
        gainElement.style.color = '#ef4444';
        valueElement.style.color = '#ef4444';
    }
}

// Smooth scrolling for navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add some easter eggs
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyG') {
        document.body.style.animation = 'glitch 0.3s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 300);
    }
    
    // SLUG easter egg
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyS') {
        const slugElements = document.querySelectorAll('.slug-highlight');
        slugElements.forEach(el => {
            el.style.animation = 'slugGlow 0.5s ease-in-out';
            setTimeout(() => {
                el.style.animation = 'slugGlow 2s ease-in-out infinite alternate';
            }, 500);
        });
    }
});

// Coming Soon Modal functionality
function showComingSoonModal() {
    const modal = document.getElementById('comingSoonModal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function initializeComingSoonModal() {
    const modal = document.getElementById('comingSoonModal');
    const closeBtn = document.getElementById('closeComingSoon');
    
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
}

// Add glitch effect CSS and modal animations
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0%, 100% { transform: translateX(0); }
        10% { transform: translateX(-2px) skew(-1deg); }
        20% { transform: translateX(2px) skew(1deg); }
        30% { transform: translateX(-1px) skew(-1deg); }
        40% { transform: translateX(1px) skew(1deg); }
        50% { transform: translateX(-1px) skew(-1deg); }
        60% { transform: translateX(1px) skew(1deg); }
        70% { transform: translateX(-2px) skew(-1deg); }
        80% { transform: translateX(2px) skew(1deg); }
        90% { transform: translateX(-1px) skew(-1deg); }
    }
    
    @keyframes modalSlideOut {
        from {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        to {
            opacity: 0;
            transform: translateY(-30px) scale(0.95);
        }
    }
`;
document.head.appendChild(style);
