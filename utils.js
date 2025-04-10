export function isColliding(rect1, rect2, isResourceCollection = false) {
    // For resource collection, give more vertical leeway
    const verticalBuffer = isResourceCollection ? 40 : 10;
    
    return rect1.x < rect2.x + rect2.width + 10 && 
           rect1.x + rect1.width + 10 > rect2.x && 
           rect1.y < rect2.y + rect2.height + verticalBuffer && 
           rect1.y + rect1.height + verticalBuffer > rect2.y;
}
