// Sample Data
const sampleJobs = [
    {
        id: 1,
        title: "E-commerce Website Development",
        category: "web-development",
        description: "Need a modern e-commerce website with payment integration, user accounts, and admin panel.",
        budget: 1500,
        duration: "1-3-months",
        skills: ["React", "Node.js", "MongoDB", "Payment APIs"],
        postedTime: "2 hours ago"
    },
    {
        id: 2,
        title: "Mobile App UI/UX Design",
        category: "design",
        description: "Looking for a creative designer to create modern UI/UX for a fitness tracking mobile app.",
        budget: 800,
        duration: "2-4-weeks",
        skills: ["Figma", "UI/UX", "Mobile Design", "Prototyping"],
        postedTime: "5 hours ago"
    },
    {
        id: 3,
        title: "Content Writing for Tech Blog",
        category: "writing",
        description: "Need high-quality articles about emerging technologies, AI, and software development.",
        budget: 300,
        duration: "1-week",
        skills: ["Technical Writing", "SEO", "Research", "AI Knowledge"],
        postedTime: "1 day ago"
    },
    {
        id: 4,
        title: "Social Media Marketing Campaign",
        category: "marketing",
        description: "Create and manage social media campaigns for a new product launch across multiple platforms.",
        budget: 1200,
        duration: "3-6-months",
        skills: ["Social Media", "Content Strategy", "Analytics", "Ad Management"],
        postedTime: "3 hours ago"
    },
    {
        id: 5,
        title: "iOS App Development",
        category: "mobile",
        description: "Develop a native iOS app for food delivery with real-time tracking and payment integration.",
        budget: 2500,
        duration: "3-6-months",
        skills: ["Swift", "iOS", "Core Data", "MapKit", "Payment APIs"],
        postedTime: "6 hours ago"
    },
    {
        id: 6,
        title: "Logo and Brand Identity Design",
        category: "design",
        description: "Create a complete brand identity package including logo, color palette, and brand guidelines.",
        budget: 500,
        duration: "2-4-weeks",
        skills: ["Logo Design", "Brand Identity", "Adobe Illustrator", "Typography"],
        postedTime: "4 hours ago"
    }
];

const sampleFreelancers = [
    {
        id: 1,
        name: "Sarah Johnson",
        title: "Full-Stack Developer",
        avatar: "SJ",
        rating: 4.9,
        completedProjects: 127,
        skills: ["React", "Node.js", "Python", "AWS"],
        hourlyRate: 85,
        location: "San Francisco, CA"
    },
    {
        id: 2,
        name: "Ahmed Hassan",
        title: "UI/UX Designer",
        avatar: "AH",
        rating: 4.8,
        completedProjects: 89,
        skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
        hourlyRate: 65,
        location: "Dubai, UAE"
    },
    {
        id: 3,
        name: "Emily Chen",
        title: "Content Writer",
        avatar: "EC",
        rating: 4.9,
        completedProjects: 203,
        skills: ["Technical Writing", "SEO", "Copywriting", "Research"],
        hourlyRate: 45,
        location: "Toronto, Canada"
    },
    {
        id: 4,
        name: "Carlos Rodriguez",
        title: "Mobile App Developer",
        avatar: "CR",
        rating: 4.7,
        completedProjects: 76,
        skills: ["React Native", "Flutter", "iOS", "Android"],
        hourlyRate: 75,
        location: "Barcelona, Spain"
    },
    {
        id: 5,
        name: "Priya Patel",
        title: "Digital Marketing Specialist",
        avatar: "PP",
        rating: 4.8,
        completedProjects: 154,
        skills: ["Social Media", "Google Ads", "Analytics", "SEO"],
        hourlyRate: 55,
        location: "Mumbai, India"
    },
    {
        id: 6,
        name: "Michael Brown",
        title: "DevOps Engineer",
        avatar: "MB",
        rating: 4.9,
        completedProjects: 98,
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
        hourlyRate: 95,
        location: "London, UK"
    }
];

// DOM Elements
let currentJobs = [...sampleJobs];
let currentFreelancers = [...sampleFreelancers];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    loadJobs();
    loadFreelancers();
    setupEventListeners();
    setupNavigation();
});

// Modal Functions
function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function showSignupModal() {
    document.getElementById('signupModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function showPostJobModal() {
    document.getElementById('postJobModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

function switchToSignup() {
    closeModal('loginModal');
    showSignupModal();
}

function switchToLogin() {
    closeModal('signupModal');
    showLoginModal();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modals = ['loginModal', 'signupModal', 'postJobModal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (event.target === modal) {
            closeModal(modalId);
        }
    });
}

// Navigation Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    const navHeight = document.querySelector('.navbar').offsetHeight;
    const elementPosition = element.offsetTop - navHeight;
    
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}

function setupNavigation() {
    // Smooth scrolling for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Change navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// Jobs Functions
function loadJobs() {
    const jobsGrid = document.getElementById('jobsGrid');
    jobsGrid.innerHTML = '';

    currentJobs.forEach(job => {
        const jobCard = createJobCard(job);
        jobsGrid.appendChild(jobCard);
    });
}

function createJobCard(job) {
    const card = document.createElement('div');
    card.className = 'job-card';
    card.onclick = () => showJobDetails(job);

    const skillsHtml = job.skills.map(skill => 
        `<span class="skill-tag">${skill}</span>`
    ).join('');

    card.innerHTML = `
        <h3>${job.title}</h3>
        <span class="job-category">${getCategoryName(job.category)}</span>
        <p>${job.description}</p>
        <div class="freelancer-skills">
            ${skillsHtml}
        </div>
        <div class="job-meta">
            <span class="job-budget">$${job.budget}</span>
            <span class="job-time">${job.postedTime}</span>
        </div>
    `;

    return card;
}

function getCategoryName(category) {
    const categories = {
        'web-development': 'Web Development',
        'design': 'Design',
        'writing': 'Writing',
        'marketing': 'Marketing',
        'mobile': 'Mobile Development'
    };
    return categories[category] || category;
}

function showJobDetails(job) {
    // Create and show job details modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'jobDetailsModal';
    modal.innerHTML = `
        <div class="modal-content large">
            <span class="close" onclick="closeModal('jobDetailsModal')">&times;</span>
            <h2>${job.title}</h2>
            <span class="job-category">${getCategoryName(job.category)}</span>
            <p><strong>Budget:</strong> $${job.budget}</p>
            <p><strong>Duration:</strong> ${job.duration}</p>
            <p><strong>Posted:</strong> ${job.postedTime}</p>
            <h3>Description</h3>
            <p>${job.description}</p>
            <h3>Required Skills</h3>
            <div class="freelancer-skills">
                ${job.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            <div style="margin-top: 2rem;">
                <button class="btn-primary" onclick="submitProposal(${job.id})">Submit Proposal</button>
                <button class="btn-secondary" onclick="closeModal('jobDetailsModal')">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function submitProposal(jobId) {
    showMessage('Proposal submitted successfully! The client will review it shortly.', 'success');
    closeModal('jobDetailsModal');
    document.body.removeChild(document.getElementById('jobDetailsModal'));
}

// Freelancers Functions
function loadFreelancers() {
    const freelancersGrid = document.getElementById('freelancersGrid');
    freelancersGrid.innerHTML = '';

    currentFreelancers.forEach(freelancer => {
        const freelancerCard = createFreelancerCard(freelancer);
        freelancersGrid.appendChild(freelancerCard);
    });
}

function createFreelancerCard(freelancer) {
    const card = document.createElement('div');
    card.className = 'freelancer-card';
    card.onclick = () => showFreelancerProfile(freelancer);

    const stars = '★'.repeat(Math.floor(freelancer.rating)) + 
                 (freelancer.rating % 1 ? '☆' : '');

    const skillsHtml = freelancer.skills.map(skill => 
        `<span class="skill-tag">${skill}</span>`
    ).join('');

    card.innerHTML = `
        <div class="freelancer-avatar">${freelancer.avatar}</div>
        <h3>${freelancer.name}</h3>
        <p class="freelancer-title">${freelancer.title}</p>
        <div class="freelancer-rating">
            <span class="stars">${stars}</span>
            <span>${freelancer.rating}</span>
        </div>
        <p><strong>$${freelancer.hourlyRate}/hr</strong></p>
        <p class="freelancer-title">${freelancer.completedProjects} projects completed</p>
        <div class="freelancer-skills">
            ${skillsHtml}
        </div>
    `;

    return card;
}

function showFreelancerProfile(freelancer) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'freelancerProfileModal';
    
    const stars = '★'.repeat(Math.floor(freelancer.rating)) + 
                 (freelancer.rating % 1 ? '☆' : '');

    modal.innerHTML = `
        <div class="modal-content large">
            <span class="close" onclick="closeModal('freelancerProfileModal')">&times;</span>
            <div style="text-align: center; margin-bottom: 2rem;">
                <div class="freelancer-avatar" style="margin: 0 auto 1rem;">${freelancer.avatar}</div>
                <h2>${freelancer.name}</h2>
                <p class="freelancer-title">${freelancer.title}</p>
                <div class="freelancer-rating">
                    <span class="stars">${stars}</span>
                    <span>${freelancer.rating} (${freelancer.completedProjects} reviews)</span>
                </div>
                <p><strong>$${freelancer.hourlyRate}/hr</strong></p>
                <p>${freelancer.location}</p>
            </div>
            <h3>Skills</h3>
            <div class="freelancer-skills" style="margin-bottom: 2rem;">
                ${freelancer.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            <h3>Portfolio</h3>
            <p>Portfolio samples would be displayed here...</p>
            <div style="margin-top: 2rem; text-align: center;">
                <button class="btn-primary" onclick="contactFreelancer(${freelancer.id})">Contact</button>
                <button class="btn-secondary" onclick="closeModal('freelancerProfileModal')">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function contactFreelancer(freelancerId) {
    showMessage('Message sent! The freelancer will respond soon.', 'success');
    closeModal('freelancerProfileModal');
    document.body.removeChild(document.getElementById('freelancerProfileModal'));
}

// Filter Functions
function setupEventListeners() {
    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterJobs);
    }

    // Budget filter
    const budgetFilter = document.getElementById('budgetFilter');
    if (budgetFilter) {
        budgetFilter.addEventListener('change', filterJobs);
    }

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }

    // Form submissions
    setupFormHandlers();
}

function filterJobs() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const budgetFilter = document.getElementById('budgetFilter').value;

    currentJobs = sampleJobs.filter(job => {
        let matchesCategory = !categoryFilter || job.category === categoryFilter;
        let matchesBudget = true;

        if (budgetFilter) {
            switch (budgetFilter) {
                case '0-100':
                    matchesBudget = job.budget <= 100;
                    break;
                case '100-500':
                    matchesBudget = job.budget > 100 && job.budget <= 500;
                    break;
                case '500-1000':
                    matchesBudget = job.budget > 500 && job.budget <= 1000;
                    break;
                case '1000+':
                    matchesBudget = job.budget > 1000;
                    break;
            }
        }

        return matchesCategory && matchesBudget;
    });

    loadJobs();
}

function performSearch() {
    const searchTerm = document.querySelector('.search-bar input').value.toLowerCase();
    if (!searchTerm) return;

    currentJobs = sampleJobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm))
    );

    loadJobs();
    scrollToSection('browse-jobs');
}

// Form Handlers
function setupFormHandlers() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showMessage('Login successful! Welcome back.', 'success');
            closeModal('loginModal');
        });
    }

    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showMessage('Account created successfully! Welcome to FreelanceHub.', 'success');
            closeModal('signupModal');
        });
    }

    // Post job form
    const postJobForm = document.getElementById('postJobForm');
    if (postJobForm) {
        postJobForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(postJobForm);
            const newJob = {
                id: sampleJobs.length + 1,
                title: postJobForm.querySelector('input[placeholder="Job Title"]').value,
                category: postJobForm.querySelector('select').value,
                description: postJobForm.querySelector('textarea').value,
                budget: parseInt(postJobForm.querySelector('input[placeholder="Budget ($)"]').value),
                duration: postJobForm.querySelectorAll('select')[1].value,
                skills: postJobForm.querySelector('input[placeholder="Required Skills (comma separated)"]').value.split(',').map(s => s.trim()),
                postedTime: 'Just now'
            };

            sampleJobs.unshift(newJob);
            currentJobs = [...sampleJobs];
            loadJobs();
            
            showMessage('Job posted successfully! Freelancers will start submitting proposals soon.', 'success');
            closeModal('postJobModal');
            postJobForm.reset();
        });
    }
}

// Utility Functions
function showMessage(text, type = 'success') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());

    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    message.style.display = 'block';
    
    // Insert after navbar
    const navbar = document.querySelector('.navbar');
    navbar.parentNode.insertBefore(message, navbar.nextSibling);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 5000);
}

// Add loading animation to buttons when clicked
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-primary, .btn-secondary, .btn-primary-large, .btn-secondary-large')) {
        const button = e.target;
        const originalText = button.innerHTML;
        
        button.innerHTML = '<span class="loading"></span> Processing...';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 1500);
    }
});

// Add smooth animations when elements come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
window.addEventListener('load', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .job-card, .freelancer-card, .step');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key closes modals
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal[style*="block"]');
        openModals.forEach(modal => {
            closeModal(modal.id);
            if (modal.id.includes('Details') || modal.id.includes('Profile')) {
                modal.remove();
            }
        });
    }
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Add ripple effect CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn-primary, .btn-secondary, .btn-primary-large, .btn-secondary-large {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Add ripple event listeners
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-primary, .btn-secondary, .btn-primary-large, .btn-secondary-large')) {
        createRipple(e);
    }
});