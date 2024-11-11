document.addEventListener('DOMContentLoaded', function () {
    const thumbnails = document.querySelectorAll('[thumbnail-index] .thumbnail');
    
    thumbnails.forEach(thumbnail => {
        const title = thumbnail.querySelector('.caption .page-title');
        
        if (title) {
            thumbnail.addEventListener('mousemove', (event) => {
                const thumbnailRect = thumbnail.getBoundingClientRect();
                const offsetX = event.clientX - thumbnailRect.left;
                const offsetY = event.clientY - thumbnailRect.top;
                
                // Position the title relative to mouse movement
                title.style.position = 'absolute';
                title.style.left = `${offsetX + 10}px`;
                title.style.top = `${offsetY + 10}px`;
                title.style.transform = 'translate(-50%, -50%)';
            });

            thumbnail.addEventListener('mouseleave', () => {
                title.style.left = '50%';
                title.style.top = '50%';
            });
        }
    });
});
