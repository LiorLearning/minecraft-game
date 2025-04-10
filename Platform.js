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
import { PLATFORM_WIDTH, PLATFORM_HEIGHT, PLATFORM_COLOR } from './constants.js';
var Platform = /*#__PURE__*/ function() {
    "use strict";
    function Platform(x, y) {
        var width = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : PLATFORM_WIDTH, height = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : PLATFORM_HEIGHT, hasQuiz = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
        _class_call_check(this, Platform);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.hasQuiz = hasQuiz; // Whether this platform triggers a quiz
        this.quizActive = false; // Whether quiz is currently triggered
        this.color = PLATFORM_COLOR;
    }
    _create_class(Platform, [
        {
            // Check if the player is on this platform
            key: "isPlayerOn",
            value: function isPlayerOn(player) {
                // Player's feet position
                var playerBottom = player.y + player.height;
                var playerLastBottom = player.y - player.velocityY + player.height; // Position before velocity was applied
                // Player position relative to platform
                var isOverlappingPlatform = player.x + player.width > this.x && player.x < this.x + this.width;
                // Check if player was above platform in the previous frame and is now at or below platform level
                var wasAbovePlatform = playerLastBottom <= this.y;
                var isAtOrBelowPlatform = playerBottom >= this.y;
                // We want to detect when a player falls onto a platform or is standing on it
                return isOverlappingPlatform && (wasAbovePlatform && isAtOrBelowPlatform || Math.abs(playerBottom - this.y) < 5); // Small tolerance to ensure player sticks to platform
            }
        },
        {
            // Update platform state
            key: "update",
            value: function update(player) {
                // If the platform has a quiz and player is on it, activate the quiz
                if (this.hasQuiz && this.isPlayerOn(player) && !this.quizActive) {
                    this.quizActive = true;
                    return true; // Signal that a quiz should start
                }
                return false;
            }
        },
        {
            // Render the platform
            key: "render",
            value: function render(ctx, cameraOffset) {
                var screenX = this.x - cameraOffset;
                // Only render if visible on screen
                if (screenX < -this.width || screenX > ctx.canvas.width) {
                    return;
                }
                // Draw platform body
                ctx.fillStyle = this.color;
                ctx.fillRect(screenX, this.y, this.width, this.height);
                // Draw platform top (grass-like)
                ctx.fillStyle = '#228B22'; // Grass green
                ctx.fillRect(screenX, this.y, this.width, 5);
                // Add Minecraft-style pixel detail
                ctx.fillStyle = '#006400'; // Darker green
                for(var i = 0; i < this.width; i += 10){
                    var pixelWidth = Math.min(5, this.width - i);
                    if (Math.random() > 0.5) {
                        ctx.fillRect(screenX + i, this.y, pixelWidth, 3);
                    }
                }
            // We've removed the question mark indicators as requested
            }
        }
    ]);
    return Platform;
}();
export { Platform as default };
