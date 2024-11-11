(function(){
    var mousePositions = [];

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

    var moveTitleWithCursor = function() {
        var thumbnails = document.querySelectorAll('[thumbnail-index] .thumbnail');
        
        thumbnails.forEach(function(thumbnail) {
            const title = thumbnail.querySelector('.caption .page-title');
            if (title) {
                var rect = thumbnail.getBoundingClientRect();
                var offsetX = mousePositions[0] ? mousePositions[0].x - rect.left : 0;
                var offsetY = mousePositions[0] ? mousePositions[0].y - rect.top : 0;

                // Move the title based on cursor position
                title.style.position = 'absolute';
                title.style.left = `${offsetX + 10}px`;  
                title.style.top = `${offsetY + 10}px`;  
                title.style.transform = 'translate(-50%, -50%)';
            }
        });
    };

    window.addEventListener('mousemove', updateMousePositions, { passive: true });

    function updateTitlePosition() {
        requestAnimationFrame(updateTitlePosition);
        moveTitleWithCursor();
    }

    updateTitlePosition();
})();
