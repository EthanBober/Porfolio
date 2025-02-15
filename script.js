// Skills data
const analysisSkills = [
    'Thermal-Mechanical Analysis',
    'Impulse Excitation Testing',
    'Tensile & Hardness Testing',
    'Surface Characterization',
    'Spectroscopic Methods'
];

const synthesisSkills = [
    'Polymer Synthesis',
    'Hydrogel Fabrication',
    'Composite Processing',
    'Material Optimization',
    'Organic Synthesis'
];

const computationalSkills = [
    'MATLAB',
    'LAMMPS',
    'ANSYS Granta/Fluent',
    'Python',
    'C++'
];

document.addEventListener('DOMContentLoaded', () => {
    // Add small delay for smoother loading
    setTimeout(() => {
        // Add loaded class to enable fade-in
        const scrollContainer = document.querySelector('.scroll-container');
        scrollContainer.classList.add('loaded');
        
        // Populate skills lists
        const populateSkills = (skills, elementId) => {
            const list = document.getElementById(elementId);
            const fragment = document.createDocumentFragment();
            
            skills.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill;
                fragment.appendChild(li);
            });
            
            list.appendChild(fragment);
        };

        populateSkills(analysisSkills, 'analysis-skills');
        populateSkills(synthesisSkills, 'synthesis-skills');
        populateSkills(computationalSkills, 'computational-skills');

        // Make sure hero section is active on initial load (only hero has fade-in)
        document.getElementById('hero').classList.add('active');

        // Hide scroll indicator initially
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        // Set initial styles for smooth appearance
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.transform = 'translateY(20px)';
        scrollIndicator.style.transition = 'opacity 1.2s ease-out, transform 1.2s ease-out';
        
        // Show scroll indicator after 3.5 seconds with smooth animation
        setTimeout(() => {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.transform = 'translateY(0)';
        }, 3500);

        // Research item animations on hover
        const items = document.querySelectorAll('.research-item, .skill-category');
        items.forEach((item, index) => {
            // Small staggered animation for items, but no opacity/transform
            item.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
        });

        // Smooth scroll for the scroll indicator
        document.querySelector('.scroll-indicator').addEventListener('click', () => {
            const researchSection = document.getElementById('research');
            scrollContainer.scrollTo({
                top: researchSection.offsetTop,
                behavior: 'smooth'
            });
        });
        
        // Improve snapping during scroll
        scrollContainer.addEventListener('scroll', () => {
            clearTimeout(scrollContainer.scrollEndTimer);
            scrollContainer.scrollEndTimer = setTimeout(() => {
                const scrollPosition = scrollContainer.scrollTop;
                
                // Find the nearest section
                let closestSection = null;
                let closestDistance = Infinity;
                
                const sections = document.querySelectorAll('.fullscreen-section');
                sections.forEach(section => {
                    const distance = Math.abs(section.offsetTop - scrollPosition);
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestSection = section;
                    }
                });
                
                // Scroll to the nearest section
                if (closestSection && Math.abs(closestSection.offsetTop - scrollPosition) > 50) {
                    scrollContainer.scrollTo({
                        top: closestSection.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }, 100); // Small delay to wait for scrolling to finish
        });
    }, 200); // 200ms delay for smoother loading
});