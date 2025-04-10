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
import { CANVAS_WIDTH, CANVAS_HEIGHT, GROUND_LEVEL } from './constants.js';
import { isColliding } from './utils.js';
import Platform from './Platform.js';
import Zombie from './Zombie.js';
import MiningSpot from './MiningSpot.js';
import { RESOURCE_TYPES } from './constants.js';
var World = /*#__PURE__*/ function() {
    "use strict";
    function World(assetLoader) {
        _class_call_check(this, World);
        this.assetLoader = assetLoader;
        this.levelWidth = 4000; // Extended level width for more platforming
        this.items = [];
        this.platforms = [];
        this.zombies = []; // Array to hold zombie enemies
        this.miningSpots = []; // Array to hold mining spots
        this.cameraOffset = 0; // Add camera offset property
        this.generateLevel();
    }
    _create_class(World, [
        {
            // Method to set camera offset from Game class
            key: "setCameraOffset",
            value: function setCameraOffset(offset) {
                this.cameraOffset = offset;
            }
        },
        {
            key: "generateLevel",
            value: function generateLevel() {
                // Generate platforms
                this.generatePlatforms();
                // Generate resources
                this.generateResources();
                // Generate zombies
                this.generateZombies();
            }
        },
        {
            key: "generatePlatforms",
            value: function generatePlatforms() {
                var _this = this;
                // Ground platform (immovable base)
                this.platforms.push(new Platform(0, GROUND_LEVEL + 30, this.levelWidth, 50));
                // Add floating platforms (some with quizzes)
                var platformPositions = [
                    {
                        x: 250,
                        y: 300,
                        hasQuiz: true
                    },
                    {
                        x: 500,
                        y: 250,
                        hasQuiz: false
                    },
                    {
                        x: 800,
                        y: 200,
                        hasQuiz: true
                    },
                    {
                        x: 1100,
                        y: 300,
                        hasQuiz: false
                    },
                    {
                        x: 1400,
                        y: 250,
                        hasQuiz: true
                    },
                    {
                        x: 1700,
                        y: 150,
                        hasQuiz: false
                    },
                    {
                        x: 2000,
                        y: 200,
                        hasQuiz: true
                    },
                    {
                        x: 2300,
                        y: 250,
                        hasQuiz: false
                    },
                    {
                        x: 2600,
                        y: 300,
                        hasQuiz: true
                    },
                    {
                        x: 2900,
                        y: 200,
                        hasQuiz: false
                    },
                    {
                        x: 3200,
                        y: 150,
                        hasQuiz: true
                    },
                    {
                        x: 3500,
                        y: 250,
                        hasQuiz: false
                    }
                ];
                platformPositions.forEach(function(param) {
                    var x = param.x, y = param.y, hasQuiz = param.hasQuiz;
                    _this.platforms.push(new Platform(x, y, undefined, undefined, hasQuiz));
                });
            }
        },
        {
            key: "generateResources",
            value: function generateResources() {
                // Add mining spots instead of resources
                this.generateMiningSpots();
            }
        },
        {
            key: "generateMiningSpots",
            value: function generateMiningSpots() {
                // Place mining spots on platforms
                this.platforms.forEach((platform, index) => {
                    // Skip the ground platform (index 0)
                    if (index === 0) return;
                    
                    // Determine resource type based on platform position
                    const resourceType = RESOURCE_TYPES[index % RESOURCE_TYPES.length];
                    
                    // Position mining spot near the platform
                    const miningSpot = new MiningSpot(platform.x + platform.width / 2 - 20, platform.y - 55, resourceType);
                    this.miningSpots.push(miningSpot);
                    
                    // Add a zombie to guard this mining spot if it doesn't already have one
                    // But only add to even-numbered platforms to reduce the number of zombies
                    if (index % 2 === 0) {
                        // Check if there's already a zombie guarding this platform
                        let hasGuard = false;
                        for (const zombie of this.zombies) {
                            if (zombie.platform === platform) {
                                hasGuard = true;
                                break;
                            }
                        }
                        
                        // If no guard exists, add one
                        if (!hasGuard) {
                            const patrolStart = platform.x + 20;
                            const patrolEnd = platform.x + platform.width - 20;
                            this.zombies.push(new Zombie(platform.x + platform.width / 2, patrolStart, patrolEnd, platform));
                        }
                    }
                });
            }
        },
        {
            key: "generateZombies",
            value: function generateZombies() {
                var _this = this;
                // Add zombies at different locations along the level
                const zombiePositions = [
                    { x: 400, patrolStart: 300, patrolEnd: 600 },
                    { x: 900, patrolStart: 800, patrolEnd: 1100 },
                    { x: 1500, patrolStart: 1400, patrolEnd: 1750 },
                    { x: 2200, patrolStart: 2050, patrolEnd: 2350 },
                    { x: 2800, patrolStart: 2650, patrolEnd: 3000 },
                    { x: 3400, patrolStart: 3250, patrolEnd: 3550 },
                    { x: 3700, patrolStart: 3600, patrolEnd: 3800 },
                    // Removed ~30% of the zombies (removed positions at 650, 1200, 1850, 2500, 3100)
                ];

                // Create zombie instances on ground level
                zombiePositions.forEach(({ x, patrolStart, patrolEnd }) => {
                    _this.zombies.push(new Zombie(x, patrolStart, patrolEnd));
                });

                // Add zombies on platforms to make them more challenging
                const platformZombies = [
                    { platformIndex: 1, patrolOffset: 20 },
                    { platformIndex: 5, patrolOffset: 20 },
                    { platformIndex: 9, patrolOffset: 20 }
                    // Removed ~40% of platform zombies (removed indices 3 and 7)
                ];
                platformZombies.forEach(function(param) {
                    var platformIndex = param.platformIndex, patrolOffset = param.patrolOffset;
                    if (platformIndex < _this.platforms.length) {
                        var platform = _this.platforms[platformIndex];
                        var x = platform.x + platform.width / 2;
                        var patrolStart = platform.x + patrolOffset;
                        var patrolEnd = platform.x + platform.width - patrolOffset;
                        _this.zombies.push(new Zombie(x, patrolStart, patrolEnd, platform));
                    }
                });
            }
        },
        {
            key: "checkCollision",
            value: function checkCollision(player) {
                var playerBounds = player.getBounds();
                var playerX = player.x;
                var screenWidth = CANVAS_WIDTH;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    // Only check items within the visible area plus a small buffer
                    for(var _iterator = this.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var item = _step.value;
                        // Skip items that are too far from the player (broad phase)
                        if (Math.abs(item.x - playerX) > screenWidth) continue;
                        // Detailed collision check only for nearby items (narrow phase)
                        if (isColliding(playerBounds, item, true)) {
                            return item;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return null;
            }
        },
        {
            key: "checkZombieCollisions",
            value: function checkZombieCollisions(player) {
                var playerBounds = player.getBounds();
                var playerX = player.x;
                var visibilityThreshold = CANVAS_WIDTH * 1.5; // Slightly larger than screen
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    // Only check zombies that are close to the player
                    for(var _iterator = this.zombies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var zombie = _step.value;
                        // Skip zombies that are too far away (broad phase)
                        if (Math.abs(zombie.x - playerX) > visibilityThreshold) continue;
                        // Only do precise collision checks for nearby zombies (narrow phase)
                        if (zombie.checkCollision(player)) {
                            return zombie;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return null;
            }
        },
        {
            // Check for platform collisions
            key: "checkPlatformCollisions",
            value: function checkPlatformCollisions(player) {
                var onPlatform = false;
                var quizTriggered = false;
                var playerX = player.x;
                var platformCheckDistance = CANVAS_WIDTH; // Only check platforms within this distance
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    // Skip platforms that are too far from the player
                    for(var _iterator = this.platforms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var platform = _step.value;
                        // Broad phase - distance-based culling
                        if (Math.abs(platform.x - playerX) > platformCheckDistance && Math.abs(platform.x + platform.width - playerX) > platformCheckDistance) {
                            continue;
                        }
                        // Narrow phase - detailed collision check
                        if (platform.isPlayerOn(player)) {
                            onPlatform = true;
                            player.y = platform.y - player.height; // Position player on top of platform
                            player.velocityY = 0;
                            player.isJumping = false;
                            // Check if this platform triggers a quiz
                            if (platform.update(player)) {
                                quizTriggered = true;
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return {
                    onPlatform: onPlatform,
                    quizTriggered: quizTriggered
                };
            }
        },
        {
            key: "removeItem",
            value: function removeItem(item) {
                this.items = this.items.filter(function(i) {
                    return i.id !== item.id;
                });
            }
        },
        {
            key: "updateZombies",
            value: function updateZombies(deltaTime) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    // Update all zombies
                    for(var _iterator = this.zombies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var zombie = _step.value;
                        zombie.update(deltaTime);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        },
        {
            key: "updateMiningSpots",
            value: function updateMiningSpots(deltaTime) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    // Update all mining spots
                    for(var _iterator = this.miningSpots[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var miningSpot = _step.value;
                        miningSpot.update(deltaTime);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        },
        {
            key: "render",
            value: function render(ctx) {
                // Use the stored camera offset
                var cameraOffset = this.cameraOffset;
                // Draw trees in the background
                for(var i = 0; i < 15; i++){
                    this.drawTree(ctx, 100 + i * 300 - cameraOffset, 335);
                }
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    // Draw platforms
                    for(var _iterator = this.platforms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var platform = _step.value;
                        platform.render(ctx, cameraOffset);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                try {
                    // Draw mining spots
                    for(var _iterator1 = this.miningSpots[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                        var miningSpot = _step1.value;
                        miningSpot.render(ctx, cameraOffset, this.assetLoader);
                    }
                } catch (err) {
                    _didIteratorError1 = true;
                    _iteratorError1 = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                            _iterator1.return();
                        }
                    } finally{
                        if (_didIteratorError1) {
                            throw _iteratorError1;
                        }
                    }
                }
                var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
                try {
                    // Draw collectable items
                    for(var _iterator2 = this.items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
                        var item = _step2.value;
                        var screenX = item.x - cameraOffset;
                        // Only draw if visible on screen
                        if (screenX > -item.width && screenX < CANVAS_WIDTH) {
                            // Add a small bounce animation to make resources more visible
                            var bounceOffset = Math.sin(Date.now() / 300) * 5;
                            var renderY = item.y + bounceOffset - 15; // Position items slightly higher above ground
                            
                            // Draw the appropriate resource image based on type
                            var img = this.assetLoader.getAsset(item.type);
                            if (img) {
                                // Draw the image
                                ctx.drawImage(img, screenX, renderY, 1.5 * item.width, 1.5 * item.height);
                            } else {
                                // Fallback if image isn't loaded
                                if (item.type === 'sticks') {
                                    this.drawSticks(ctx, screenX, renderY);
                                } else if (item.type === 'strings') {
                                    this.drawStrings(ctx, screenX, renderY);
                                } else if (item.type === 'flint') {
                                    this.drawFlint(ctx, screenX, renderY);
                                } else if (item.type === 'feather') {
                                    this.drawFeather(ctx, screenX, renderY);
                                }
                            }
                            // Draw label
                            ctx.fillStyle = 'white';
                            ctx.font = '12px Arial';
                            ctx.fillText(item.type, screenX, renderY - 5);
                            
                            // Draw a hint indicator to show items are collectible
                            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                            ctx.beginPath();
                            ctx.arc(screenX + item.width/2, renderY + item.height/2, 
                                    15 + Math.sin(Date.now() / 200) * 3, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                            _iterator2.return();
                        }
                    } finally{
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
                var _iteratorNormalCompletion3 = true, _didIteratorError3 = false, _iteratorError3 = undefined;
                try {
                    // Render zombies
                    for(var _iterator3 = this.zombies[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true){
                        var zombie = _step3.value;
                        zombie.render(ctx, cameraOffset, this.assetLoader);
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                            _iterator3.return();
                        }
                    } finally{
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            }
        },
        {
            key: "drawTree",
            value: function drawTree(ctx, x, y) {
                var _this_assetLoader;
                var minecraftTexture = (_this_assetLoader = this.assetLoader) === null || _this_assetLoader === void 0 ? void 0 : _this_assetLoader.getAsset('minecraft');
                if (minecraftTexture) {
                    // Draw tree trunk using wood texture from minecraft.png
                    // The wood texture is typically in the bottom half of the image
                    ctx.fillStyle = '#8B4513'; // Base color
                    ctx.fillRect(x, y - 65, 20, 70);
                    // Draw tree leaves using green texture
                    ctx.fillStyle = '#006400'; // Base color
                    ctx.fillRect(x - 20, y - 115, 60, 50);
                    // Add some pixel-like detail to match Minecraft aesthetic
                    ctx.fillStyle = '#005400'; // Darker green for texture
                    for(var i = 0; i < 12; i++){
                        var leafX = x - 20 + Math.floor(Math.random() * 60);
                        var leafY = y - 115 + Math.floor(Math.random() * 50);
                        ctx.fillRect(leafX, leafY, 5, 5);
                    }
                } else {
                    // Fallback if texture isn't loaded
                    // Tree trunk
                    ctx.fillStyle = '#8B4513';
                    ctx.fillRect(x, y - 65, 20, 70);
                    // Tree leaves
                    ctx.fillStyle = '#006400';
                    ctx.fillRect(x - 20, y - 115, 60, 50);
                }
            }
        },
        {
            key: "drawSticks",
            value: function drawSticks(ctx, x, y) {
                ctx.fillStyle = '#8B4513';
                ctx.fillRect(x, y, 35, 10);
                ctx.fillRect(x + 15, y + 10, 10, 20);
            }
        },
        {
            key: "drawStrings",
            value: function drawStrings(ctx, x, y) {
                ctx.strokeStyle = '#DDDDDD';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + 30, y + 35);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x + 10, y);
                ctx.lineTo(x + 20, y + 35);
                ctx.stroke();
            }
        },
        {
            key: "drawFlint",
            value: function drawFlint(ctx, x, y) {
                ctx.fillStyle = '#777777';
                ctx.beginPath();
                ctx.moveTo(x, y + 15);
                ctx.lineTo(x + 15, y);
                ctx.lineTo(x + 25, y + 10);
                ctx.lineTo(x + 20, y + 25);
                ctx.fill();
            }
        },
        {
            key: "drawFeather",
            value: function drawFeather(ctx, x, y) {
                ctx.fillStyle = '#F5F5F5';
                ctx.beginPath();
                ctx.moveTo(x, y + 40);
                ctx.lineTo(x + 10, y);
                ctx.lineTo(x + 20, y + 40);
                ctx.fill();
                // Feather stem
                ctx.fillStyle = '#DDD';
                ctx.fillRect(x + 9, y + 5, 2, 30);
            }
        }
    ]);
    return World;
}();
export { World as default };
