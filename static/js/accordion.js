// Auto-open accordions when clicking TOC links
document.addEventListener('DOMContentLoaded', function() {
    // Handle hash changes (including initial page load with hash)
    function handleAccordionHash() {
        if (!window.location.hash) return;
        
        const hash = window.location.hash.slice(1);
        const accordion = document.querySelector(`details.accordion[data-heading-id="${hash}"]`);
        
        if (accordion) {
            accordion.open = true;
            // Small delay to ensure accordion is open before scrolling
            setTimeout(() => {
                const heading = document.getElementById(hash);
                if (heading) {
                    heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }
    
    // Handle on page load
    handleAccordionHash();
    
    // Handle when hash changes
    window.addEventListener('hashchange', handleAccordionHash);
});
