(function(){
    var mousePositions = [];

    // Update the mouse position on move or touch
    var updateMousePositions = function(event) {
        mousePositions = [];
        if (event.type === 'touchmove') {
            _.each(event.touches, function(touch){
                mousePositions.push({
                    x: touch.clientX,
                    y: touch.clientY
                });
            });
        } else {
            mousePositions = [{ x: event.clientX, y: event.clientY }];
        }
    };

    // Function to move the title with the cursor
    var moveTitleWithCursor = function() {
        var thumbnails = document.querySelectorAll('[thumbnail-index] .thumbnail');
        
        thumbnails.forEach(function(thumbnail) {
            const title = thumbnail.querySelector('.caption .page-title');
            if (title) {
                var rect = thumbnail.getBoundingClientRect();
                var offsetX = mousePositions[0] ? mousePositions[0].x - rect.left : 0;
                var offsetY = mousePositions[0] ? mousePositions[0].y - rect.top : 0;

                // Set a consistent offset distance from the cursor (adjust as needed)
                var offsetDistance = 15; // This is the distance from the cursor to the title, adjust as needed

                // Move the title based on the cursor position with the fixed offset
                title.style.position = 'absolute';
                title.style.left = `${offsetX + offsetDistance}px`;  // Consistent distance from cursor
                title.style.top = `${offsetY + offsetDistance}px`;   // Consistent distance from cursor
                title.style.transform = 'translate(-50%, -50%)';
            }
        });
    };

    // Update mouse positions
    window.addEventListener('mousemove', updateMousePositions, { passive: true });

    // Update title position continuously using requestAnimationFrame
    function updateTitlePosition() {
        requestAnimationFrame(updateTitlePosition);
        moveTitleWithCursor();
    }

    updateTitlePosition();
})();
