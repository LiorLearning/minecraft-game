function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
import { GROUND_LEVEL } from './constants.js';
import { isColliding } from './utils.js';
var Zombie = /*#__PURE__*/ function() {
    "use strict";
    function Zombie(x, patrolStart, patrolEnd) {
        var platform = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
        _class_call_check(this, Zombie);
        this.x = x;
        this.y = platform ? platform.y - 50 : GROUND_LEVEL - 10; // Adjusted to match visual position of zombie
        this.width = 30; // Slightly wider to match zombie image
        this.height = 50; // Taller to match zombie image
        this.speed = 2.0; // Slightly reduced speed to compensate for larger size
        this.direction = 1; // 1 for right, -1 for left
        // Patrol zone
        this.patrolStart = patrolStart || x - 150;
        this.patrolEnd = patrolEnd || x + 150;
        // Platform the zombie is on (if any)
        this.platform = platform;
        // Falling animation properties
        this.isFalling = false;
        this.fallVelocity = 0;
        // Animation
        this.frameCount = 0;
        this.animationSpeed = 10;
        this.currentFrame = 0;
        this.totalFrames = 4; // 4 frame simple animation
    }
    _create_class(Zombie, [
        {
            key: "update",
            value: function update(deltaTime) {
                // Move zombie based on direction
                this.x += this.speed * this.direction;
                // Add falling state and velocity for animation
                this.isFalling = false;
                this.fallVelocity = this.fallVelocity || 0;
                // Check if zombie is about to walk off platform edge
                if (this.platform) {
                    var onPlatform = this.x + this.width > this.platform.x && this.x < this.platform.x + this.platform.width;
                    if (!onPlatform) {
                        // Zombie walked off the platform edge, start falling animation
                        this.isFalling = true;
                        this.platform = null;
                        this.fallVelocity = 0; // Initialize fall velocity
                    } else {
                        // Stay on platform
                        this.y = this.platform.y - this.height;
                    }
                }
                // Handle falling animation
                if (this.isFalling) {
                    // Apply gravity to falling velocity
                    this.fallVelocity += 0.4;
                    this.y += this.fallVelocity;
                    // Check if zombie reached ground level
                    if (this.y >= GROUND_LEVEL - 5) {
                        this.y = GROUND_LEVEL - 5;
                        this.isFalling = false;
                        this.fallVelocity = 0;
                    }
                } else if (!this.platform) {
                    // If on ground, stay at ground level
                    this.y = GROUND_LEVEL - 5;
                }
                // Change direction if reaching patrol boundary
                if (this.x <= this.patrolStart) {
                    this.direction = 1; // Move right
                } else if (this.x >= this.patrolEnd) {
                    this.direction = -1; // Move left
                }
                // Update animation frame
                this.frameCount++;
                if (this.frameCount >= this.animationSpeed) {
                    this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
                    this.frameCount = 0;
                }
            }
        },
        {
            key: "checkCollision",
            value: function checkCollision(player) {
                // Create optimized collision bounds to match the visual appearance of the zombie sprite
                // The full body zombie image has some transparent space around it, so adjust collision accordingly
                var zombieBounds = {
                    x: this.x + 7,
                    y: this.y + 10,
                    width: this.width - 14,
                    height: this.height - 12 // Reduce height to match the actual body in the sprite
                };
                // Also check if player is jumping over the zombie - higher jump = better chance to clear
                var playerBounds = player.getBounds();
                // If player is moving upward quickly, give additional leeway for jumping over zombies
                if (player.velocityY < -4) {
                    // Player is jumping upward strongly, increase their chance to clear the zombie
                    zombieBounds.height -= 10; // Further reduce collision height
                }
                return isColliding(playerBounds, zombieBounds);
            }
        },
        {
            key: "render",
            value: function render(ctx, cameraOffset, assetLoader) {
                // Get camera offset from world
                var screenX = this.x - cameraOffset;
                // Don't render if off screen
                if (screenX < -this.width || screenX > ctx.canvas.width) {
                    return;
                }
                // Save context for rotation during falling
                ctx.save();
                // Apply visual effects for falling zombie
                if (this.isFalling) {
                    // Center of zombie for rotation
                    var centerX = screenX + this.width / 2;
                    var centerY = this.y + this.height / 2;
                    // Rotate zombie slightly based on falling velocity
                    var rotationAngle = Math.min(this.fallVelocity * 0.05, 0.3);
                    ctx.translate(centerX, centerY);
                    ctx.rotate(rotationAngle * this.direction); // Direction affects rotation side
                    ctx.translate(-centerX, -centerY);
                }
                // Get zombie texture if available
                var zombieTexture = assetLoader === null || assetLoader === void 0 ? void 0 : assetLoader.getAsset('full body zombie minecraft');
                if (zombieTexture) {
                    // Draw the zombie image instead of rendering shapes
                    // Use larger multipliers to make the zombie image properly sized
                    var zombieWidth = this.width * 1.5; // Increased from 1.2 to better match actual sprite
                    var zombieHeight = this.height * 1.6; // Increased from 1.5 to better match actual sprite
                    // Calculate zombie position (centered)
                    var zombieX = screenX - (zombieWidth - this.width) / 2;
                    var zombieY = this.y - (zombieHeight - this.height);
                    // Apply scaling and flipping based on direction and animation
                    ctx.save();
                    // Center of zombie for transformations
                    var centerX1 = zombieX + zombieWidth / 2;
                    var centerY1 = zombieY + zombieHeight / 2;
                    // Apply transformations relative to the center
                    ctx.translate(centerX1, centerY1);
                    // Flip horizontally based on direction
                    if (this.direction < 0) {
                        ctx.scale(-1, 1);
                    }
                    // Add slight wobble based on animation frame
                    var wobbleAngle = Math.sin(this.currentFrame * (Math.PI / 2)) * 0.05;
                    ctx.rotate(wobbleAngle);
                    // When falling, apply additional rotation
                    if (this.isFalling) {
                        var fallRotation = Math.min(this.fallVelocity * 0.05, 0.3) * this.direction;
                        ctx.rotate(fallRotation);
                    }
                    // Draw zombie image centered at origin (after transformations)
                    ctx.drawImage(zombieTexture, -zombieWidth / 2, -zombieHeight / 2, zombieWidth, zombieHeight);
                    ctx.restore();
                } else {
                    // Fallback if texture isn't loaded - draw simple zombie shape
                    ctx.fillStyle = '#7D9B76'; // Green zombie color
                    ctx.fillRect(screenX, this.y, this.width, this.height);
                    // Red eyes as a minimal indicator
                    ctx.fillStyle = 'red';
                    if (this.direction > 0) {
                        ctx.fillRect(screenX + this.width - 10, this.y + 5, 5, 3);
                    } else {
                        ctx.fillRect(screenX + 5, this.y + 5, 5, 3);
                    }
                }
                // Add "falling" text above zombie if it's falling
                if (this.isFalling) {
                    ctx.fillStyle = 'white';
                    ctx.font = '12px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText("Ahhh!", screenX + this.width / 2, this.y - 25);
                    // Add falling dust particles if falling
                    if (this.isFalling && this.fallVelocity > 2) {
                        ctx.fillStyle = 'rgba(150, 150, 150, 0.5)';
                        for(var i = 0; i < 3; i++){
                            var particleSize = 2 + Math.random() * 3;
                            ctx.fillRect(screenX + Math.random() * this.width, this.y + this.height - 5 + Math.random() * 10, particleSize, particleSize);
                        }
                    }
                }
                // Restore context after rotation
                ctx.restore();
            }
        }
    ]);
    return Zombie;
}();
export { Zombie as default };
