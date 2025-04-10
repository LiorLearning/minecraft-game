function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
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
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
import Player from './Player.js';
import World from './World.js';
import CraftingPanel from './CraftingPanel.js';
import TouchControls from './TouchControls.js';
import WelcomeScreen from './WelcomeScreen.js';
import VictoryScreen from './VictoryScreen.js';
import { AssetLoader } from './AssetLoader.js';
import { AudioManager } from './AudioManager.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT, GROUND_LEVEL, GAME_STATE, MINING_REQUIRED_CLICKS } from './constants.js';
import { FloatingText } from './FloatingText.js';
import QuizPanel from './QuizPanel.js';
var Game = /*#__PURE__*/ function() {
    "use strict";
    function Game(container) {
        _class_call_check(this, Game);
        this.container = container;
        this.assetLoader = new AssetLoader();
        this.audioManager = new AudioManager();
        this.assetsLoaded = false;
        this.isLoading = true;
        this.floatingTextClass = FloatingText; // Store class reference for QuizPanel
        this.cameraOffset = 0; // Initialize camera offset
        // Start by loading assets
        this.initializeGame(container);
    }
    _create_class(Game, [
        {
            key: "initializeGame",
            value: function initializeGame(container) {
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _this.setupCanvas();
                                // Loading message while assets are loading
                                _this.ctx.fillStyle = '#333';
                                _this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                                _this.ctx.fillStyle = 'white';
                                _this.ctx.textAlign = 'center';
                                _this.ctx.font = '24px Arial';
                                _this.ctx.fillText('Loading game assets...', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
                                // Initialize screen shake variables
                                _this.screenShakeIntensity = 0;
                                _this.screenShakeTimer = 0;
                                return [
                                    4,
                                    _this.assetLoader.loadAllAssets()
                                ];
                            case 1:
                                // Load assets first
                                // Load assets and audio
                                _this.assetsLoaded = _state.sent();
                                return [
                                    4,
                                    _this.audioManager.loadAllSounds()
                                ];
                            case 2:
                                _state.sent();
                                // Initialize game objects after assets are loaded
                                _this.resources = {
                                    sticks: 0,
                                    strings: 0,
                                    flint: 0,
                                    feather: 0
                                };
                                _this.world = new World(_this.assetLoader);
                                _this.player = new Player(100, GROUND_LEVEL);
                                _this.player.game = _this; // Add reference to game for asset access
                                _this.craftingPanel = new CraftingPanel(_this.resources, _this);
                                _this.quizPanel = new QuizPanel(_this);
                                _this.floatingTexts = [];
                                _this.gameState = GAME_STATE.WELCOME; // Start with welcome screen
                                _this.isGameActive = false; // For backward compatibility
                                _this.setupControls();
                                _this.touchControls = new TouchControls(_this);
                                _this.welcomeScreen = new WelcomeScreen(_this, _this.assetLoader);
                                _this.victoryScreen = new VictoryScreen(_this);
                                _this.lastTimestamp = 0;
                                _this.isLoading = false;
                                _this.bowCrafted = false;
                                // Start game loop
                                requestAnimationFrame(_this.update.bind(_this));
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "setupCanvas",
            value: function setupCanvas() {
                this.canvas = document.createElement('canvas');
                this.canvas.width = CANVAS_WIDTH;
                this.canvas.height = CANVAS_HEIGHT;
                // Batch style operations together for better performance
                Object.assign(this.canvas.style, {
                    display: 'block',
                    backgroundColor: '#87CEEB',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: '0',
                    left: '0'
                });
                // Add fullscreen button
                this.fullscreenButton = document.createElement('button');
                this.fullscreenButton.textContent = '⛶';
                // Use Object.assign for batch style application
                Object.assign(this.fullscreenButton.style, {
                    position: 'absolute',
                    right: '10px',
                    top: '10px',
                    zIndex: '1000',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '8px',
                    cursor: 'pointer',
                    fontSize: '16px'
                });
                // Store bound method to avoid creating new function on each call
                this._boundToggleFullscreen = this.toggleFullscreen.bind(this);
                this.fullscreenButton.addEventListener('click', this._boundToggleFullscreen);
                this.ctx = this.canvas.getContext('2d');
                this.container.appendChild(this.canvas);
                this.container.appendChild(this.fullscreenButton);
                // Handle window resize
                window.addEventListener('resize', this.handleResize.bind(this));
                this.handleResize();
            }
        },
        {
            key: "handleResize",
            value: function handleResize() {
                // Get the current dimensions of the container/window
                var containerWidth = this.container.clientWidth || window.innerWidth;
                var containerHeight = this.container.clientHeight || window.innerHeight;
                // Calculate the aspect ratio
                var gameAspectRatio = CANVAS_WIDTH / CANVAS_HEIGHT;
                var containerAspectRatio = containerWidth / containerHeight;
                // Adjust canvas size while preserving aspect ratio
                if (containerAspectRatio > gameAspectRatio) {
                    // Container is wider than game
                    this.canvas.style.width = "".concat(containerHeight * gameAspectRatio, "px");
                    this.canvas.style.height = "".concat(containerHeight, "px");
                } else {
                    // Container is taller than game
                    this.canvas.style.width = "".concat(containerWidth, "px");
                    this.canvas.style.height = "".concat(containerWidth / gameAspectRatio, "px");
                }
            }
        },
        {
            key: "toggleFullscreen",
            value: function toggleFullscreen() {
                if (!document.fullscreenElement) {
                    // Enter fullscreen
                    if (this.container.requestFullscreen) {
                        this.container.requestFullscreen();
                    } else if (this.container.webkitRequestFullscreen) {
                        this.container.webkitRequestFullscreen();
                    } else if (this.container.msRequestFullscreen) {
                        this.container.msRequestFullscreen();
                    }
                    this.fullscreenButton.textContent = '⮌';
                } else {
                    // Exit fullscreen
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                    this.fullscreenButton.textContent = '⛶';
                }
            }
        },
        {
            key: "setupControls",
            value: function setupControls() {
                // Use bound handlers instead of creating new anonymous functions
                this._handleKeyDown = this._handleKeyDown.bind(this);
                this._handleKeyUp = this._handleKeyUp.bind(this);
                window.addEventListener('keydown', this._handleKeyDown);
                window.addEventListener('keyup', this._handleKeyUp);
            }
        },
        {
            // Unified key handler to reduce event listener overhead
            key: "_handleKeyDown",
            value: function _handleKeyDown(e) {
                // Use switch statement for more efficient key checking
                switch(e.key.toLowerCase()){
                    case 'arrowleft':
                    case 'a':
                        this.player.moveLeft();
                        break;
                    case 'arrowright':
                    case 'd':
                        this.player.moveRight();
                        break;
                    case ' ':
                    case 'arrowup':
                    case 'w':
                        this.player.jump();
                        break;
                    case 'e':
                        this.tryCollectResource();
                        break;
                }
            }
        },
        {
            key: "_handleKeyUp",
            value: function _handleKeyUp(e) {
                // Use switch statement for more efficient key checking
                switch(e.key.toLowerCase()){
                    case 'arrowleft':
                    case 'arrowright':
                    case 'a':
                    case 'd':
                        this.player.stop();
                        break;
                }
            }
        },
        {
            key: "tryCollectResource",
            value: function tryCollectResource() {
                // First check for collectible items
                var collectedItem = this.world.checkCollision(this.player);
                if (collectedItem) {
                    // Each resource item now counts as 5
                    this.resources[collectedItem.type] += 5;
                    this.world.removeItem(collectedItem);
                    this.craftingPanel.updateResources(this.resources);
                    // Highlight the resource in the crafting panel
                    this.craftingPanel.highlightResource(collectedItem.type);
                    // Create floating text animation
                    var text = "+5 ".concat(collectedItem.type);
                    var x = collectedItem.x;
                    var y = collectedItem.y;
                    this.floatingTexts.push(new FloatingText(text, x, y));
                    // Play collect sound with slight random pitch variation for variety
                    var pitchVariation = 0.9 + Math.random() * 0.2;
                    this.audioManager.play('collect', 0.7 * pitchVariation);
                    // Check if bow can be crafted
                    if (!this.bowCrafted && this.resources.sticks >= 10 && this.resources.strings >= 5 && this.resources.flint >= 5 && this.resources.feather >= 5) {
                        // Show victory screen
                        this.bowCrafted = true;
                        this.gameState = GAME_STATE.VICTORY;
                        this.victoryScreen.show();
                        // Play victory sound
                        this.audioManager.play('collect', 1.5);
                    }
                    return;
                }
                
                // No item collected, check if there are any items nearby but not close enough
                var playerX = this.player.x;
                var playerY = this.player.y;
                var nearbyItem = false;
                
                for (var i = 0; i < this.world.items.length; i++) {
                    var item = this.world.items[i];
                    var dx = item.x - playerX;
                    var dy = item.y - playerY;
                    var distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        nearbyItem = true;
                        // Show a hint about getting closer to the resource
                        this.floatingTexts.push(new FloatingText("Get closer to collect", playerX, playerY - 50));
                        break;
                    }
                }
                
                // If no nearby items were found, try mining
                if (!nearbyItem) {
                    this.tryMining();
                }
            }
        },
        {
            key: "tryMining",
            value: function tryMining() {
                // Cache player position and bounds for performance
                var player = this.player;
                var playerX = player.x;
                var playerBounds = player.getBounds();
                var miningCheckDistance = 100; // Only check mining spots within this distance
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    // Check if player is near any mining spots
                    for(var _iterator = this.world.miningSpots[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var miningSpot = _step.value;
                        if (!miningSpot.active || miningSpot.mined) continue;
                        // Broad phase - distance-based check to skip far away mining spots
                        if (Math.abs(miningSpot.x - playerX) > miningCheckDistance) continue;
                        // Check if player is close enough to mine
                        var miningBounds = {
                            x: miningSpot.x - 20,
                            y: miningSpot.y - 20,
                            width: miningSpot.width + 40,
                            height: miningSpot.height + 40
                        };
                        if (this.isColliding(playerBounds, miningBounds)) {
                            // Player is close to the mining spot, process mining action
                            var miningComplete = miningSpot.increaseClickCount();
                            // Play mining sound with different pitch based on progress
                            var pitchVariation = 0.8 + miningSpot.clickCount / MINING_REQUIRED_CLICKS * 0.4;
                            this.audioManager.play('hurt', 0.3 * pitchVariation); // Repurpose hurt sound for mining
                            // Add screen shake effect
                            this.applyScreenShake(3);
                            // Create floating text showing mining progress
                            var progressText = "Mining: ".concat(miningSpot.clickCount, "/").concat(MINING_REQUIRED_CLICKS);
                            this.floatingTexts.push(new FloatingText(progressText, miningSpot.x, miningSpot.y - 20));
                            if (miningComplete) {
                                // Mining is complete, show quiz
                                // Reset screen shake before showing quiz
                                this.screenShakeIntensity = 0;
                                this.screenShakeTimer = 0;
                                this.gameState = GAME_STATE.QUIZ;
                                this.quizPanel.show(miningSpot); // Pass the mining spot to the quiz panel
                                // Play completion sound
                                this.audioManager.play('collect', 1.0);
                                // Create floating text
                                this.floatingTexts.push(new FloatingText("Mining complete!", miningSpot.x, miningSpot.y - 40));
                            }
                            return;
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
            }
        },
        {
            // Add screen shake effect
            key: "applyScreenShake",
            value: function applyScreenShake(intensity) {
                this.screenShakeIntensity = intensity;
                this.screenShakeTimer = 200; // Duration in milliseconds
            }
        },
        {
            key: "isColliding",
            value: function isColliding(rect1, rect2) {
                return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
            }
        },
        {
            key: "update",
            value: function update(timestamp) {
                var deltaTime = timestamp - this.lastTimestamp;
                this.lastTimestamp = timestamp;
                if (this.gameState === GAME_STATE.PLAYING) {
                    // Update world zombies
                    this.world.updateZombies(deltaTime);
                    // Update mining spots for respawn functionality
                    this.world.updateMiningSpots(deltaTime);
                    this.player.update(deltaTime, this.world);
                    // Update camera offset to keep player visible
                    this.cameraOffset = Math.max(0, this.player.x - CANVAS_WIDTH * 0.25);
                    // Update screen shake effect
                    if (this.screenShakeTimer > 0) {
                        this.screenShakeTimer -= deltaTime;
                    }
                    // Update camera offset for world rendering before collision checks
                    this.updateCameraForWorld();
                    // Check if a quiz should be triggered
                    var quizTriggered = this.world.checkPlatformCollisions(this.player).quizTriggered;
                    if (quizTriggered) {
                        // Reset screen shake when entering quiz mode
                        this.screenShakeIntensity = 0;
                        this.screenShakeTimer = 0;
                        this.gameState = GAME_STATE.QUIZ;
                        this.quizPanel.show();
                    }
                    // Update touch controls
                    this.touchControls.update();
                    // Update floating texts
                    for(var i = this.floatingTexts.length - 1; i >= 0; i--){
                        this.floatingTexts[i].update(deltaTime);
                        if (this.floatingTexts[i].isDone()) {
                            this.floatingTexts.splice(i, 1);
                        }
                    }
                    // Check for zombie collisions only if player is not immune
                    if (!this.player.isImmune) {
                        var collidedZombie = this.world.checkZombieCollisions(this.player);
                        if (collidedZombie) {
                            this.handleZombieCollision();
                        }
                    }
                } else if (this.gameState === GAME_STATE.QUIZ) {
                    // Update quiz panel when in quiz mode
                    this.quizPanel.update(deltaTime);
                }
                // Only render if we have a valid frame (avoid excessive redraws)
                if (deltaTime > 0) {
                    this.render();
                }
                // Use RAF with proper binding to avoid creating new functions
                if (!this._boundUpdate) {
                    this._boundUpdate = this.update.bind(this);
                }
                requestAnimationFrame(this._boundUpdate);
            }
        },
        {
            key: "render",
            value: function render() {
                if (this.isLoading) return; // Skip rendering until assets are loaded
                this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                // Apply screen shake effect if active
                if (this.screenShakeTimer > 0 && this.screenShakeIntensity > 0) {
                    // Pre-calculate shake values for better performance
                    var shakeIntensity = this.screenShakeIntensity * 2;
                    var shakeX = (Math.random() - 0.5) * shakeIntensity;
                    var shakeY = (Math.random() - 0.5) * shakeIntensity;
                    this.ctx.save();
                    this.ctx.translate(shakeX, shakeY);
                }
                // Draw the background - cache patterns for better performance
                var minecraftTexture = this.assetLoader.getAsset('minecraft');
                // Sky background - use cached pattern
                if (!this._skyPattern && minecraftTexture) {
                    this._skyPattern = this.ctx.createPattern(minecraftTexture, 'repeat');
                }
                if (this._skyPattern) {
                    this.ctx.fillStyle = this._skyPattern;
                    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                    // Overlay a transparent blue to ensure sky color
                    this.ctx.fillStyle = 'rgba(135, 206, 235, 0.5)';
                    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                } else {
                    // Fallback if texture isn't loaded
                    this.ctx.fillStyle = '#87CEEB'; // Sky
                    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                }
                // Draw ground - reuse already set context properties when possible
                this.ctx.fillStyle = minecraftTexture ? '#8B4513' : '#8B4513'; // Ground color
                this.ctx.fillRect(0, GROUND_LEVEL + 30, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_LEVEL - 30);
                // Draw grass on top of ground
                this.ctx.fillStyle = '#228B22'; // Grass color
                this.ctx.fillRect(0, GROUND_LEVEL + 30, CANVAS_WIDTH, 10);
                // Draw clouds - batch fill operations with same style
                this.ctx.fillStyle = 'white';
                this.ctx.fillRect(100, 50, 80, 30);
                this.ctx.fillRect(400, 70, 100, 25);
                if (this.gameState === GAME_STATE.WELCOME) {
                    // Game is not active, render welcome screen
                    this.welcomeScreen.render(this.ctx);
                } else if (this.gameState === GAME_STATE.VICTORY) {
                    // Render victory screen
                    this.victoryScreen.render(this.ctx);
                } else if (this.gameState === GAME_STATE.PLAYING || this.gameState === GAME_STATE.QUIZ) {
                    // Game is active, render game elements
                    this.world.render(this.ctx);
                    // Render player at its position relative to camera
                    var playerScreenX = this.player.x - this.cameraOffset;
                    this.player.render(this.ctx, playerScreenX);
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        // Render floating texts
                        for(var _iterator = this.floatingTexts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var text = _step.value;
                            text.render(this.ctx, this.cameraOffset);
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
                    this.craftingPanel.render(this.ctx);
                    // Render touch controls on top
                    this.touchControls.render(this.ctx);
                    // If in quiz mode, render the quiz UI
                    if (this.gameState === GAME_STATE.QUIZ) {
                        this.quizPanel.render(this.ctx);
                    }
                }
                // Combine conditional checks to reduce branching
                if (this.gameState === GAME_STATE.PLAYING) {
                    this.renderControlInstructions();
                    this.renderDebugInfo();
                }
                // Reset screen shake transformation
                if (this.screenShakeTimer > 0 && this.screenShakeIntensity > 0) {
                    this.ctx.restore();
                }
            }
        },
        {
            // Update camera offset before rendering
            key: "updateCameraForWorld",
            value: function updateCameraForWorld() {
                if (this.world) {
                    this.world.setCameraOffset(this.cameraOffset);
                }
            }
        },
        {
            key: "renderDebugInfo",
            value: function renderDebugInfo() {
            // Method intentionally left empty - debug info is not needed in production
            }
        },
        {
            key: "renderControlInstructions",
            value: function renderControlInstructions() {
                // Don't show on mobile as they already have touch controls
                if (this.touchControls.isMobile) return;
                // Semi-transparent background
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
                this.ctx.fillRect(0, CANVAS_HEIGHT - 50, CANVAS_WIDTH - this.craftingPanel.width, 50);
                // Panel title
                this.ctx.fillStyle = '#FFCC33'; // Gold/yellow Minecraft title color
                this.ctx.font = 'bold 14px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText('CONTROLS', (CANVAS_WIDTH - this.craftingPanel.width) / 2, CANVAS_HEIGHT - 40);
                // Control instructions text
                this.ctx.fillStyle = 'white';
                this.ctx.font = '14px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText('← → or A/D: Move | ↑ or W or SPACE: Jump | E: Mine/Collect', (CANVAS_WIDTH - this.craftingPanel.width) / 2, CANVAS_HEIGHT - 20);
            }
        },
        {
            key: "start",
            value: function start() {
            // Game initialization is now handled in initializeGame
            // This method is kept for backward compatibility
            }
        },
        {
            key: "handleZombieCollision",
            value: function handleZombieCollision() {
                var _this = this;
                // Player hit a zombie
                // Reset player position slightly back to avoid being immediately hit again
                this.player.x -= 60 * (this.player.facingRight ? 1 : -1);
                // Check if player has any resources to lose
                var availableResources = [];
                for(var type in this.resources){
                    if (this.resources[type] >= 5) {
                        availableResources.push(type);
                    }
                }
                if (availableResources.length > 0) {
                    // Choose a random resource to reduce
                    var resourceType = availableResources[Math.floor(Math.random() * availableResources.length)];
                    this.resources[resourceType] -= 5;
                    // Update crafting panel
                    this.craftingPanel.updateResources(this.resources);
                    // Add visual feedback about resource loss
                    this.floatingTexts.push(new FloatingText("-5 ".concat(resourceType, "!"), this.player.x, this.player.y - 40));
                }
                // Add some visual feedback
                this.floatingTexts.push(new FloatingText("Ouch!", this.player.x, this.player.y - 20));
                // Play hurt sound effect
                this.audioManager.play('hurt', 0.7);
                // Apply screen shake effect
                this.applyScreenShake(5);
                // Visual indication of being hit
                this.player.isHit = true;
                this.player.isImmune = true;
                this.player.immunityTimer = 0;
                setTimeout(function() {
                    _this.player.isHit = false;
                }, 500);
            }
        }
    ]);
    return Game;
}();
export { Game as default };
