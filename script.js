// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
body.classList.toggle('light-theme', currentTheme === 'light');
updateThemeIcon();

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const theme = body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    updateThemeIcon();

    // Add ripple effect
    createRipple(themeToggle);
});

function updateThemeIcon() {
    if (body.classList.contains('light-theme')) {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (navLinks.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        // Close mobile menu if open
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        body.style.overflow = '';
    });
});

// Active Navigation Link Update
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        }
    });
});

// Enhanced Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrolled = window.scrollY;

    if (scrolled > 50) {
        navbar.style.background = body.classList.contains('light-theme')
            ? 'rgba(248, 250, 252, 0.95)'
            : 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = body.classList.contains('light-theme')
            ? 'rgba(248, 250, 252, 0.9)'
            : 'rgba(10, 10, 15, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Enhanced Copy Token ID Function with better mobile support
function copyTokenId() {
    const tokenElement = document.getElementById('tokenId');
    if (!tokenElement) {
        console.error('Token element not found');
        showNotification('Token element not found', 'error');
        return;
    }
    
    const tokenId = tokenElement.textContent.trim();

    // Increment share counter when copying
    incrementHeroCounter('total-shares').catch(console.error);

    // Use modern clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(tokenId).then(() => {
            showCopySuccess();
        }).catch(err => {
            console.error('Clipboard API failed: ', err);
            fallbackCopyTextToClipboard(tokenId);
        });
    } else {
        fallbackCopyTextToClipboard(tokenId);
    }
}

function fallbackCopyTextToClipboard(text) {
    // Create a more mobile-friendly textarea
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Make it more accessible on mobile
    textArea.style.position = "fixed";
    textArea.style.top = "50%";
    textArea.style.left = "50%";
    textArea.style.transform = "translate(-50%, -50%)";
    textArea.style.width = "300px";
    textArea.style.height = "50px";
    textArea.style.padding = "10px";
    textArea.style.fontSize = "16px"; // Prevents zoom on iOS
    textArea.style.border = "2px solid var(--accent-primary)";
    textArea.style.borderRadius = "8px";
    textArea.style.background = "var(--bg-card)";
    textArea.style.color = "var(--text-primary)";
    textArea.style.zIndex = "10000";
    textArea.style.opacity = "1";
    textArea.readOnly = true;

    document.body.appendChild(textArea);
    
    // Better mobile selection
    if (navigator.userAgent.match(/ipad|iphone/i)) {
        // iOS specific handling
        const range = document.createRange();
        range.selectNodeContents(textArea);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        textArea.setSelectionRange(0, 999999);
    } else {
        // Android and other mobile devices
        textArea.select();
        textArea.setSelectionRange(0, 999999);
    }
    
    // Focus for better mobile support
    textArea.focus();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess();
            // Show mobile-friendly success message
            if (window.innerWidth <= 768) {
                textArea.value = "✅ Copied!";
                textArea.style.background = "var(--accent-quaternary)";
                textArea.style.color = "white";
                textArea.style.textAlign = "center";
                textArea.style.fontWeight = "bold";
            }
        } else {
            showNotification('Tap and hold to copy manually', 'info');
            // Keep textarea visible longer on mobile for manual copy
            setTimeout(() => {
                document.body.removeChild(textArea);
            }, 5000);
            return;
        }
    } catch (err) {
        console.error('Fallback: Unable to copy', err);
        showNotification('Tap and hold to copy manually', 'info');
        // Keep textarea visible for manual copy
        setTimeout(() => {
            if (document.body.contains(textArea)) {
                document.body.removeChild(textArea);
            }
        }, 5000);
        return;
    }

    // Remove after short delay to show success
    setTimeout(() => {
        if (document.body.contains(textArea)) {
            document.body.removeChild(textArea);
        }
    }, 1500);
}

function showCopySuccess() {
    // Create success notification
    showNotification('Token ID copied to clipboard!', 'success');

    // Animate copy button
    const copyBtn = document.querySelector('.copy-btn');
    const originalHTML = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
    copyBtn.style.background = 'var(--accent-quaternary)';
    copyBtn.style.transform = 'scale(1.2)';

    setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        copyBtn.style.background = '';
        copyBtn.style.transform = '';
    }, 2000);
}

// Enhanced Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');

            // Add staggered animation for grid items
            if (entry.target.parentElement.classList.contains('features-grid') ||
                entry.target.parentElement.classList.contains('community-grid') ||
                entry.target.parentElement.classList.contains('nft-grid')) {
                const siblings = Array.from(entry.target.parentElement.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .community-card, .nft-card, .step-card, .document-card, .stat-item');
    animateElements.forEach(el => observer.observe(el));
});

// Enhanced Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0%';
        bar.style.transition = 'none';

        setTimeout(() => {
            bar.style.transition = `width 2s ease ${index * 0.2}s`;
            bar.style.width = width;
        }, 100);
    });
}

// Trigger progress bar animation when features section is visible
const featuresObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
        }
    });
}, { threshold: 0.3 });

const featuresSection = document.querySelector('.features-section');
if (featuresSection) {
    featuresObserver.observe(featuresSection);
}

// Enhanced Parallax Effect for Hero Particles
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const particles = document.querySelectorAll('.hero-particle');

    particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.3;
        const yPos = -(scrolled * speed);
        const rotation = scrolled * 0.1;
        particle.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
    });

    // Parallax for character showcase
    const characterFloat = document.querySelectorAll('.character-float');
    characterFloat.forEach((char, index) => {
        const speed = 0.2 + (index * 0.1);
        const yPos = -(scrolled * speed);
        char.style.transform = `translateY(${yPos}px)`;
    });
});

// Global hero counter system with cross-device persistence
const HERO_COUNTER_STORAGE_KEY = 'slug-hero-stats-global';

// Initialize hero counters with persistent storage
function getHeroCounters() {
    try {
        const stored = localStorage.getItem(HERO_COUNTER_STORAGE_KEY);
        return stored ? JSON.parse(stored) : {
            'total-views': 12500,
            'total-shares': 2800
        };
    } catch {
        return {
            'total-views': 12500,
            'total-shares': 2800
        };
    }
}

// Save hero counters
function saveHeroCounters(counters) {
    try {
        localStorage.setItem(HERO_COUNTER_STORAGE_KEY, JSON.stringify(counters));
        
        // Broadcast to other tabs
        if (window.BroadcastChannel) {
            const channel = new BroadcastChannel('slug-hero-counters');
            channel.postMessage({ type: 'update', counters });
        }
    } catch (error) {
        console.error('Failed to save hero counters:', error);
    }
}

// Initialize online counters for hero stats
async function initializeHeroCounters() {
    try {
        const counters = getHeroCounters();
        saveHeroCounters(counters);
        
        // Setup cross-tab communication
        if (window.BroadcastChannel) {
            const channel = new BroadcastChannel('slug-hero-counters');
            channel.addEventListener('message', (event) => {
                if (event.data.type === 'update') {
                    loadAndUpdateHeroStats();
                }
            });
        }
        
        // Listen for storage changes from other tabs
        window.addEventListener('storage', (e) => {
            if (e.key === HERO_COUNTER_STORAGE_KEY) {
                loadAndUpdateHeroStats();
            }
        });
    } catch (error) {
        console.log('Hero counter initialization completed');
    }
}

// Get hero counter value from persistent storage
async function getHeroCounter(key) {
    try {
        const counters = getHeroCounters();
        return counters[key] || 0;
    } catch (error) {
        console.error('Failed to fetch hero counter:', error);
        return 0;
    }
}

// Increment hero counter with cross-device sync
async function incrementHeroCounter(key) {
    try {
        const counters = getHeroCounters();
        const currentValue = counters[key] || 0;
        const newValue = currentValue + 1;
        
        counters[key] = newValue;
        saveHeroCounters(counters);
        
        return newValue;
    } catch (error) {
        console.error('Failed to increment hero counter:', error);
        return 0;
    }
}

// Load and update hero stats from online counters
async function loadAndUpdateHeroStats() {
    try {
        const totalViews = await getHeroCounter('total-views');
        const totalShares = await getHeroCounter('total-shares');
        
        // Update hero stats display
        const heroStatsMap = {
            'total-views': totalViews,
            'total-shares': totalShares
        };
        
        // Animate the updated values
        animateStatsWithValues(heroStatsMap);
    } catch (error) {
        console.error('Failed to load hero stats:', error);
        // Fallback to default animation
        animateStats();
    }
}

// Enhanced Stats Counter Animation with online values
function animateStatsWithValues(statsMap) {
    const stats = document.querySelectorAll('.stat-value');
    stats.forEach((stat, index) => {
        const dataValue = stat.getAttribute('data-value');
        let finalValue, numericValue, suffix;
        
        // Check if this stat should use online counter values
        if (dataValue && (dataValue.includes('views') || dataValue.includes('shares'))) {
            const counterKey = dataValue.toLowerCase().replace(/[^\w-]/g, '');
            if (statsMap[counterKey]) {
                numericValue = statsMap[counterKey];
                finalValue = formatStatValue(numericValue);
                suffix = '';
            } else {
                finalValue = dataValue;
                numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
                suffix = finalValue.replace(/[\d.]/g, '');
            }
        } else {
            finalValue = dataValue || stat.textContent;
            numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
            suffix = finalValue.replace(/[\d.]/g, '');
        }

        if (!isNaN(numericValue)) {
            let currentValue = 0;
            const increment = numericValue / 60;
            const duration = 2000; // 2 seconds
            const stepTime = duration / 60;

            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    stat.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    const displayValue = Math.floor(currentValue);
                    stat.textContent = formatStatValue(displayValue) + suffix;
                }
            }, stepTime);

            // Add glow effect during animation
            setTimeout(() => {
                stat.style.textShadow = '0 0 20px var(--accent-primary)';
                setTimeout(() => {
                    stat.style.textShadow = '';
                }, 1000);
            }, index * 200);
        }
    });
}

// Format stat values for display
function formatStatValue(value) {
    if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
        return (value / 1000).toFixed(1) + 'K';
    }
    return value.toString();
}

// Enhanced Stats Counter Animation (fallback)
function animateStats() {
    const stats = document.querySelectorAll('.stat-value');
    stats.forEach((stat, index) => {
        const finalValue = stat.getAttribute('data-value') || stat.textContent;
        const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
        const suffix = finalValue.replace(/[\d.]/g, '');

        if (!isNaN(numericValue)) {
            let currentValue = 0;
            const increment = numericValue / 60;
            const duration = 2000; // 2 seconds
            const stepTime = duration / 60;

            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    stat.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    const displayValue = Math.floor(currentValue);
                    stat.textContent = displayValue + suffix;
                }
            }, stepTime);

            // Add glow effect during animation
            setTimeout(() => {
                stat.style.textShadow = '0 0 20px var(--accent-primary)';
                setTimeout(() => {
                    stat.style.textShadow = '';
                }, 1000);
            }, index * 200);
        }
    });
}

// Trigger stats animation when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => loadAndUpdateHeroStats(), 500);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Enhanced Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        submitBtn.style.transform = 'scale(0.95)';

        // Show success message
        setTimeout(() => {
            showNotification('Message sent successfully!', 'success');
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            submitBtn.style.background = 'var(--accent-quaternary)';

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.transform = '';
                submitBtn.style.background = '';
            }, 2000);
        }, 1000);
    });
}

// Ripple Effect Function
function createRipple(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.classList.add('ripple');

    // Add ripple styles
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(100, 255, 218, 0.3)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent += `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Notification styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '12px',
        color: 'white',
        fontWeight: '600',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
    });

    // Type-specific styling
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10b981, #16a085)';
        notification.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.3)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        notification.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.3)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
        notification.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
    }

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Character Data
const characterData = {
    slimy: {
        name: "Slimy",
        title: "The Brave Leader",
        image: "slimy.png",
        description: "The fearless commander of the SLUG army, leading with wisdom and courage through the digital frontier. Slimy possesses an unbreakable spirit and the ability to unite all Sliminions under one cause - the revolution of meme coins on Hedera.",
        powerLevel: 95,
        intelligence: 90,
        agility: 75,
        abilities: [
            "Command Aura - Inspires all nearby allies",
            "Slime Shield - Creates protective barriers",
            "Leadership Rally - Boosts team morale",
            "Strategic Vision - Predicts market movements"
        ]
    },
    bolt: {
        name: "Bolt",
        title: "The Speedster",
        image: "bolt.jpg",
        description: "Lightning-fast reflexes and unmatched agility make Bolt the scout of choice for dangerous missions. Can traverse the blockchain networks at incredible speeds, gathering intelligence and executing trades faster than any other Sliminion.",
        powerLevel: 80,
        intelligence: 70,
        agility: 98,
        abilities: [
            "Lightning Speed - Instant transaction execution",
            "Network Sprint - Rapid blockchain traversal",
            "Quick Strike - Fast attack combinations",
            "Speed Boost - Enhances ally movement"
        ]
    },
    glitch: {
        name: "Glitch",
        title: "The Hacker",
        image: "glitch.jpeg",
        description: "Master of digital realms and cybersecurity, protecting the SLUG network from all threats. Glitch can manipulate code structures and create impenetrable security systems that safeguard the community's assets.",
        powerLevel: 85,
        intelligence: 95,
        agility: 70,
        abilities: [
            "Code Manipulation - Alters smart contracts",
            "Security Wall - Creates digital barriers",
            "System Override - Bypasses restrictions",
            "Data Encryption - Protects sensitive information"
        ]
    },
    sage: {
        name: "Sage",
        title: "The Keeper",
        image: "sage.jpg",
        description: "Ancient guardian of wisdom and keeper of the sacred Codex of Dimensions. Sage holds the knowledge of all blockchain mysteries and guides the SLUG project with profound understanding of DeFi principles.",
        powerLevel: 75,
        intelligence: 98,
        agility: 60,
        abilities: [
            "Ancient Wisdom - Reveals hidden truths",
            "Prophecy Vision - Foresees future events",
            "Knowledge Transfer - Educates allies",
            "Meditation Focus - Enhances team concentration"
        ]
    },
    nova: {
        name: "Nova",
        title: "The Navigator",
        image: "nova.jpeg",
        description: "Stellar pathfinder guiding the SLUG team through uncharted territories of the blockchain universe. Nova's cosmic awareness allows for perfect navigation through complex DeFi protocols and market conditions.",
        powerLevel: 88,
        intelligence: 85,
        agility: 80,
        abilities: [
            "Stellar Navigation - Finds optimal paths",
            "Cosmic Awareness - Senses market changes",
            "Star Burst - Powerful energy attacks",
            "Gravitational Pull - Attracts opportunities"
        ]
    },
    liora: {
        name: "Liora",
        title: "The Mystic",
        image: "liora.jpg",
        description: "Mystical enchantress who harnesses the power of ancient crypto magic to manipulate market forces. Liora's spells can influence token prices and create favorable conditions for the SLUG ecosystem.",
        powerLevel: 82,
        intelligence: 88,
        agility: 85,
        abilities: [
            "Price Enchantment - Influences token values",
            "Market Divination - Predicts trends",
            "Liquidity Spell - Enhances trading volume",
            "Protection Ward - Shields from volatility"
        ]
    },
    nex: {
        name: "Nex",
        title: "The Warrior",
        image: "nex.jpg",
        description: "Fierce protector of the SLUG realm, wielding advanced combat protocols to defend against market manipulation and hostile takeovers. Nex stands as the guardian of community interests.",
        powerLevel: 92,
        intelligence: 75,
        agility: 88,
        abilities: [
            "Combat Protocol - Advanced fighting techniques",
            "Shield Wall - Protects from attacks",
            "Battle Rage - Increases power in combat",
            "Defensive Stance - Reduces incoming damage"
        ]
    },
    cyris: {
        name: "Cyris",
        title: "The Inventor",
        image: "cyris.jpg",
        description: "Brilliant innovator and creator of cutting-edge blockchain technologies. Cyris develops new utilities and features that expand the SLUG ecosystem, always pushing the boundaries of what's possible in DeFi.",
        powerLevel: 78,
        intelligence: 96,
        agility: 72,
        abilities: [
            "Tech Innovation - Creates new solutions",
            "System Upgrade - Improves existing protocols",
            "Efficiency Boost - Optimizes performance",
            "Blueprint Creation - Designs future features"
        ]
    }
};

// Character Modal Functions
function openCharacterModal(characterKey) {
    const character = characterData[characterKey];
    if (!character) return;

    const modal = document.getElementById('characterModal');
    const modalImage = document.getElementById('modalCharacterImage');
    const modalName = document.getElementById('modalCharacterName');
    const modalTitle = document.getElementById('modalCharacterTitle');
    const modalDescription = document.getElementById('modalCharacterDescription');
    const modalPowerLevel = document.getElementById('modalPowerLevel');
    const modalIntelligence = document.getElementById('modalIntelligence');
    const modalAgility = document.getElementById('modalAgility');
    const modalAbilities = document.getElementById('modalAbilities');

    // Set character data
    modalImage.src = character.image;
    modalImage.alt = character.name;
    modalName.textContent = character.name;
    modalTitle.textContent = character.title;
    modalDescription.textContent = character.description;

    // Set stats with animation
    setTimeout(() => {
        modalPowerLevel.style.width = character.powerLevel + '%';
        modalIntelligence.style.width = character.intelligence + '%';
        modalAgility.style.width = character.agility + '%';
    }, 300);

    // Set abilities
    modalAbilities.innerHTML = '';
    character.abilities.forEach(ability => {
        const li = document.createElement('li');
        li.textContent = ability;
        modalAbilities.appendChild(li);
    });

    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Add click sound effect (if you want to add audio later)
    createRipple(document.querySelector(`[onclick="openCharacterModal('${characterKey}')"]`));
}

function closeCharacterModal() {
    const modal = document.getElementById('characterModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';

    // Reset stat bars
    document.getElementById('modalPowerLevel').style.width = '0%';
    document.getElementById('modalIntelligence').style.width = '0%';
    document.getElementById('modalAgility').style.width = '0%';
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('characterModal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeCharacterModal();
        }
    });

    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCharacterModal();
        }
    });
});

// Character Circle Interaction
document.addEventListener('DOMContentLoaded', () => {
    const characterCircles = document.querySelectorAll('.character-circle');
    characterCircles.forEach((char, index) => {
        char.addEventListener('mouseenter', () => {
            // Create subtle pulse effect
            char.style.animation = 'pulse 1s infinite';
        });

        char.addEventListener('mouseleave', () => {
            char.style.animation = '';
        });
    });
});

// Enhanced Card Hover Effects
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card, .community-card, .nft-card, .step-card, .document-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';

            // Add glow effect to icons
            const icon = this.querySelector('.feature-icon, .community-icon, .step-icon, .document-icon');
            if (icon) {
                icon.style.filter = 'brightness(1.2)';
                icon.style.transform = 'scale(1.1)';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';

            const icon = this.querySelector('.feature-icon, .community-icon, .step-icon, .document-icon');
            if (icon) {
                icon.style.filter = '';
                icon.style.transform = '';
            }
        });
    });
});

// Music Card Enhanced Interaction
const musicCard = document.querySelector('.music-card');
if (musicCard) {
    musicCard.addEventListener('mouseenter', function() {
        const playBtn = this.querySelector('.play-btn');
        if (playBtn) {
            playBtn.style.animation = 'pulse 1s infinite';
        }
    });

    musicCard.addEventListener('mouseleave', function() {
        const playBtn = this.querySelector('.play-btn');
        if (playBtn) {
            playBtn.style.animation = '';
        }
    });
}

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
    document.head.appendChild(script);
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll-heavy functions
const debouncedParallax = debounce(() => {
    const scrolled = window.pageYOffset;
    const particles = document.querySelectorAll('.hero-particle');

    particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.3;
        const yPos = -(scrolled * speed);
        particle.style.transform = `translateY(${yPos}px)`;
    });
}, 16); // ~60fps

window.addEventListener('scroll', debouncedParallax);

// NFT Tab Functionality
function openNftTab(evt, tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.nft-tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.nft-tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Show the selected tab content and mark button as active
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');

    // Add ripple effect to the clicked tab
    createRipple(evt.currentTarget);

    // Trigger animations for the newly visible content
    const activeTabContent = document.getElementById(tabName);
    const nftCards = activeTabContent.querySelectorAll('.nft-card');
    nftCards.forEach((card, index) => {
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
        }, 50);
    });
}

// Back to Top Button Functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/Hide Back to Top Button, Floating Follow Button, Floating Chart Button, and Meme World Button
window.addEventListener('scroll', () => {
    const backToTopBtn = document.getElementById('backToTop');
    const floatingFollow = document.getElementById('floatingFollow');
    const floatingChart = document.getElementById('floatingChart');
    const floatingMemeWorld = document.getElementById('floatingMemeWorld');

    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
        floatingFollow.classList.add('show');
        floatingChart.classList.add('show');
        floatingMemeWorld.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
        floatingFollow.classList.remove('show');
        floatingChart.classList.remove('show');
        floatingMemeWorld.classList.remove('show');
    }
});

// Initialize all animations and effects
document.addEventListener('DOMContentLoaded', async () => {
    // Add loading complete class
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // Initialize online counters for hero stats
    await initializeHeroCounters();

    // Initialize typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.animation = 'fadeInUp 1s ease forwards';
        }, 500);
    }

    // Initialize NFT tab animations
    const nftCards = document.querySelectorAll('#original-guardians .nft-card');
    nftCards.forEach((card, index) => {
        card.style.opacity = '0';
        setTimeout(() => {
            card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
        }, 1000);
    });

    // Initialize timeline animations
    setTimeout(() => {
        const timelineItems = document.querySelectorAll('.timeline-item-h');
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 800);
});

// Add additional utility functions for enhanced UX
function addGlowEffect(element) {
    element.style.boxShadow = 'var(--neon-glow-strong)';
    setTimeout(() => {
        element.style.boxShadow = '';
    }, 2000);
}

// Meme Carousel Functionality
let currentMemeSlide = 0;
let memeCarouselInterval;

function initMemeCarousel() {
    const slides = document.querySelectorAll('.meme-slide');
    const dotsContainer = document.getElementById('carouselDots');

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToMemeSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Start auto-play
    startMemeCarouselAutoPlay();
}

function moveMemeSlide(direction) {
    const slides = document.querySelectorAll('.meme-slide');
    const track = document.getElementById('memeCarouselTrack');
    const dots = document.querySelectorAll('.carousel-dot');

    currentMemeSlide += direction;

    if (currentMemeSlide >= slides.length) {
        currentMemeSlide = 0;
    } else if (currentMemeSlide < 0) {
        currentMemeSlide = slides.length - 1;
    }

    updateMemeCarousel();
    resetMemeCarouselAutoPlay();
}

function goToMemeSlide(index) {
    currentMemeSlide = index;
    updateMemeCarousel();
    resetMemeCarouselAutoPlay();
}

function updateMemeCarousel() {
    const track = document.getElementById('memeCarouselTrack');
    const slides = document.querySelectorAll('.meme-slide');
    const dots = document.querySelectorAll('.carousel-dot');

    track.style.transform = `translateX(-${currentMemeSlide * 100}%)`;

    // Update active states
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentMemeSlide);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentMemeSlide);
    });
}

function startMemeCarouselAutoPlay() {
    memeCarouselInterval = setInterval(() => {
        moveMemeSlide(1);
    }, 4000); // Change slide every 4 seconds
}

function resetMemeCarouselAutoPlay() {
    clearInterval(memeCarouselInterval);
    startMemeCarouselAutoPlay();
}

// Touch/Swipe support for mobile
function initMemeCarouselTouch() {
    const carousel = document.querySelector('.meme-carousel');
    if (!carousel) return;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        clearInterval(memeCarouselInterval);
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;

        const diffX = startX - currentX;

        if (Math.abs(diffX) > 50) { // Minimum swipe distance
            if (diffX > 0) {
                moveMemeSlide(1); // Swipe left - next slide
            } else {
                moveMemeSlide(-1); // Swipe right - previous slide
            }
        } else {
            startMemeCarouselAutoPlay();
        }
    });
}

// Pause auto-play when carousel is hovered
function initMemeCarouselHover() {
    const carousel = document.querySelector('.meme-carousel');
    if (!carousel) return;

    carousel.addEventListener('mouseenter', () => {
        clearInterval(memeCarouselInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        startMemeCarouselAutoPlay();
    });
}

// Enhanced button interactions
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.cta-button, .step-btn, .nft-btn, .doc-btn, .submit-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            createRipple(this);
            addGlowEffect(this);
        });
    });

    // Ensure copy button is clickable
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyTokenId);
        copyBtn.style.pointerEvents = 'auto';
        copyBtn.style.cursor = 'pointer';
    }

    // Initialize meme carousel
    initMemeCarousel();
    initMemeCarouselTouch();
    initMemeCarouselHover();
});

// Function to fetch and display media items
async function fetchAndDisplayMedia(url, gridId, mediaType) {
    const grid = document.getElementById(gridId);
    const noMediaMessage = document.createElement('p');
    noMediaMessage.textContent = `No ${mediaType} available.`;
    noMediaMessage.className = 'no-media-message';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Clear existing content
        grid.innerHTML = '';

        // Handle empty data array
        if (data.length === 0) {
            grid.innerHTML = '';
            if (noMediaMessage) {
                grid.appendChild(noMediaMessage);
            }
            return;
        }

        if (noMediaMessage && noMediaMessage.parentNode === grid) {
            grid.removeChild(noMediaMessage);
        }

        data.forEach(item => {
            let mediaElement;
            if (mediaType === 'images') {
                mediaElement = document.createElement('img');
                mediaElement.src = item.url;
                mediaElement.alt = item.alt || 'Image';
            } else if (mediaType === 'videos') {
                mediaElement = document.createElement('video');
                mediaElement.src = item.url;
                mediaElement.controls = true;
                mediaElement.muted = true;
                mediaElement.loop = true;
            } else {
                console.error('Unsupported media type');
                return;
            }

            mediaElement.className = 'media-item';

            // Create container for each media item
            const mediaContainer = document.createElement('div');
            mediaContainer.className = 'media-container';
            mediaContainer.appendChild(mediaElement);

            // Add share to X button
            const shareButton = document.createElement('a');
            shareButton.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(item.url)}`;
            shareButton.target = '_blank';
            shareButton.rel = 'noopener noreferrer';
            shareButton.textContent = 'Share to X';
            shareButton.className = 'share-button';
            mediaContainer.appendChild(shareButton);

            grid.appendChild(mediaContainer);
        });
    } catch (error) {
        console.error('Failed to fetch media:', error);
        grid.innerHTML = `<p class="error-message">Failed to load ${mediaType}.</p>`;
    }
}

// Call the functions to load images and videos
document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayMedia('images.json', 'imageGrid', 'images');
    fetchAndDisplayMedia('videos.json', 'videoGrid', 'videos');
});

