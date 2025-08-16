document.addEventListener('DOMContentLoaded', function () {
    const tocSidebar = document.querySelector('.toc-sidebar');
    if (!tocSidebar) return;

    const tocLinks = tocSidebar.querySelectorAll('nav a');
    const headers = Array.from(tocLinks).map(link => document.getElementById(link.getAttribute('href').substring(1))).filter(Boolean);

    if (headers.length === 0) return;

    const updateTocScroll = () => {
        let activeHeader = null;
        const offset = 150; // A larger offset might work better

        for (let i = headers.length - 1; i >= 0; i--) {
            const header = headers[i];
            const rect = header.getBoundingClientRect();
            if (rect.top <= offset) {
                activeHeader = header;
                break;
            }
        }

        tocLinks.forEach(link => link.classList.remove('active'));

        if (activeHeader) {
            const activeLink = tocSidebar.querySelector(`a[href="#${activeHeader.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');

                // Scroll the ToC to keep the active link in view
                const linkTop = activeLink.offsetTop;
                const linkHeight = activeLink.offsetHeight;
                const tocScrollTop = tocSidebar.scrollTop;
                const tocHeight = tocSidebar.clientHeight;

                if (linkTop < tocScrollTop) {
                    tocSidebar.scrollTop = linkTop;
                } else if (linkTop + linkHeight > tocScrollTop + tocHeight) {
                    tocSidebar.scrollTop = linkTop + linkHeight - tocHeight;
                }
            }
        }
    };

    window.addEventListener('scroll', updateTocScroll, { passive: true });
    updateTocScroll(); // Run on load
});
