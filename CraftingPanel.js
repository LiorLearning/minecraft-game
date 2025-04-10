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
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants.js';
var CraftingPanel = /*#__PURE__*/ function() {
    "use strict";
    function CraftingPanel(resources, game) {
        _class_call_check(this, CraftingPanel);
        this.game = game;
        this.resources = resources;
        this.width = 160;
        this.height = CANVAS_HEIGHT;
        this.x = CANVAS_WIDTH - this.width;
        this.y = 0;
        this.isMobile = this.detectMobile();
        // Adjust panel size for mobile if needed
        if (this.isMobile) {
            this.width = 130; // Slightly smaller on mobile
            this.x = CANVAS_WIDTH - this.width;
        }
        // Animation properties for highlighting resources
        this.highlightedResource = null;
        this.highlightTimer = 0;
        this.highlightDuration = 1000; // Highlight duration in milliseconds
        // Minecraft-style UI properties
        this.borderWidth = 4;
        this.slotSize = 32;
        this.slotPadding = 4;
        this.iconSize = this.slotSize - this.slotPadding * 2;
    }
    _create_class(CraftingPanel, [
        {
            key: "updateResources",
            value: function updateResources(resources) {
                this.resources = resources;
            }
        },
        {
            key: "highlightResource",
            value: function highlightResource(resourceType) {
                // Set the resource to be highlighted
                this.highlightedResource = resourceType;
                this.highlightTimer = this.highlightDuration;
            }
        },
        {
            key: "detectMobile",
            value: function detectMobile() {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 800;
            }
        },
        {
            key: "update",
            value: function update(deltaTime) {
                // Update highlight timer
                if (this.highlightedResource && this.highlightTimer > 0) {
                    this.highlightTimer = Math.max(0, this.highlightTimer - deltaTime);
                    if (this.highlightTimer === 0) {
                        this.highlightedResource = null;
                    }
                }
            }
        },
        {
            key: "render",
            value: function render(ctx) {
                var _this = this;
                var _this_game_assetLoader, _this_game, _this_game_assetLoader1, _this_game1;
                // Draw Minecraft-style panel background with texture
                var minecraftTexture = (_this_game = this.game) === null || _this_game === void 0 ? void 0 : (_this_game_assetLoader = _this_game.assetLoader) === null || _this_game_assetLoader === void 0 ? void 0 : _this_game_assetLoader.getAsset('minecraft');
                // Panel background with semi-transparent dark overlay
                if (minecraftTexture) {
                    // Draw panel with dark stone texture
                    ctx.globalAlpha = 0.3;
                    ctx.drawImage(minecraftTexture, this.x, this.y, this.width, this.height);
                    ctx.globalAlpha = 1.0;
                }
                // Dark overlay for readability
                ctx.fillStyle = 'rgba(20, 20, 20, 0.85)';
                ctx.fillRect(this.x, this.y, this.width, this.height);
                // Draw Minecraft-style wooden border
                this.drawMinecraftBorder(ctx);
                // Panel title with minecraft-style font
                ctx.fillStyle = '#FFCC33'; // Gold/yellow Minecraft title color
                ctx.font = 'bold 16px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('INVENTORY', this.x + this.width / 2, 30);
                var resourceTypes = [
                    {
                        name: 'Sticks',
                        key: 'sticks',
                        color: '#8B4513',
                        reqAmount: 10
                    },
                    {
                        name: 'Strings',
                        key: 'strings',
                        color: '#DDDDDD',
                        reqAmount: 5
                    },
                    {
                        name: 'Flint',
                        key: 'flint',
                        color: '#777777',
                        reqAmount: 5
                    },
                    {
                        name: 'Feather',
                        key: 'feather',
                        color: '#F5F5F5',
                        reqAmount: 5
                    }
                ];
                // Draw resource slots in Minecraft style
                var slotStartY = 50;
                resourceTypes.forEach(function(resource, index) {
                    var y = slotStartY + index * (_this.slotSize + 8);
                    // Draw resource slot (item frame)
                    _this.drawMinecraftSlot(ctx, _this.x + 10, y, resource, index);
                    // Check if this resource is being highlighted
                    var isHighlighted = _this.highlightedResource === resource.key && _this.highlightTimer > 0;
                    // Resource counter - highlight with animation if needed
                    if (isHighlighted) {
                        // Pulsing text effect for highlighted resource
                        var highlightProgress = _this.highlightTimer / _this.highlightDuration;
                        var pulseFactor = 1 + 0.3 * Math.sin(highlightProgress * Math.PI * 10);
                        var fontSize = 16 * pulseFactor;
                        ctx.fillStyle = '#FFFF55'; // Bright yellow color for highlight (Minecraft style)
                        ctx.font = "bold ".concat(fontSize, "px Arial");
                        ctx.textAlign = 'left';
                        ctx.fillText("".concat(_this.resources[resource.key], "/").concat(resource.reqAmount), _this.x + _this.slotSize + 18, y + 20);
                    } else {
                        // Normal rendering
                        ctx.fillStyle = 'white';
                        ctx.font = 'bold 16px Arial';
                        ctx.textAlign = 'left';
                        // Use a single formatted text to avoid overlap
                        ctx.fillText("".concat(_this.resources[resource.key], "/").concat(resource.reqAmount), _this.x + _this.slotSize + 18, y + 20);
                    }
                });
                // Bow crafting status
                var bowY = slotStartY + resourceTypes.length * (this.slotSize + 8) + 20;
                // Draw bow crafting section with Minecraft style title
                ctx.fillStyle = '#FFCC33'; // Gold/yellow color
                ctx.textAlign = 'center';
                ctx.font = 'bold 16px Arial';
                ctx.fillText('CRAFTING', this.x + this.width / 2, bowY);
                // Draw crafting result slot (larger)
                var resultSlotSize = this.slotSize * 1.5;
                var resultX = this.x + this.width / 2 - resultSlotSize / 2;
                var resultY = bowY + 15;
                // Draw the crafting result slot
                this.drawMinecraftSlot(ctx, resultX, resultY, null, 4, resultSlotSize);
                var bowReady = this.resources.sticks >= 10 && this.resources.strings >= 5 && this.resources.flint >= 5 && this.resources.feather >= 5;
                // Bow status indicator
                var bowImage = (_this_game1 = this.game) === null || _this_game1 === void 0 ? void 0 : (_this_game_assetLoader1 = _this_game1.assetLoader) === null || _this_game_assetLoader1 === void 0 ? void 0 : _this_game_assetLoader1.getAsset('bow');
                if (bowReady && bowImage) {
                    // Draw the bow image if crafting is complete
                    var iconPadding = 8;
                    ctx.drawImage(bowImage, resultX + iconPadding, resultY + iconPadding, resultSlotSize - iconPadding * 2, resultSlotSize - iconPadding * 2);
                    // Ready text with crafting glow
                    ctx.fillStyle = '#FFCC33';
                    ctx.textAlign = 'center';
                    ctx.font = 'bold 16px Arial';
                    // Add pulsing glow effect
                    var glowSize = 2 + Math.sin(Date.now() / 200) * 2;
                    ctx.shadowColor = '#FFFF00';
                    ctx.shadowBlur = glowSize;
                    ctx.fillText('READY!', this.x + this.width / 2, resultY + resultSlotSize + 20);
                    ctx.shadowBlur = 0;
                } else {
                    // Status text when not ready with Minecraft-style "locked" appearance
                    ctx.fillStyle = '#888888';
                    ctx.textAlign = 'center';
                    ctx.font = '14px Arial';
                    // Draw a question mark or locked indicator
                    ctx.fillText('?', resultX + resultSlotSize / 2, resultY + resultSlotSize / 2 + 5);
                    // Incomplete text
                    ctx.fillStyle = '#AA5555';
                    ctx.fillText('LOCKED', this.x + this.width / 2, resultY + resultSlotSize + 20);
                }
            // Remove controls from inventory section
            }
        },
        {
            // Draw a Minecraft style slot with icon
            key: "drawMinecraftSlot",
            value: function drawMinecraftSlot(ctx, x, y, resource, index) {
                var size = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : this.slotSize;
                // Outer dark border
                ctx.fillStyle = '#1A1A1A';
                ctx.fillRect(x, y, size, size);
                // Inner slot background (lighter)
                ctx.fillStyle = '#373737';
                ctx.fillRect(x + 1, y + 1, size - 2, size - 2);
                // Highlight at top-left (3D effect)
                ctx.fillStyle = '#4F4F4F';
                ctx.fillRect(x + 2, y + 2, size - 4, 1);
                ctx.fillRect(x + 2, y + 3, 1, size - 5);
                // Shadow at bottom-right (3D effect)
                ctx.fillStyle = '#2C2C2C';
                ctx.fillRect(x + size - 3, y + 3, 1, size - 5);
                ctx.fillRect(x + 3, y + size - 3, size - 6, 1);
                // Draw resource icon if provided
                if (resource) {
                    var _this_game_assetLoader, _this_game;
                    var assetName = resource.key;
                    var resourceImg = (_this_game = this.game) === null || _this_game === void 0 ? void 0 : (_this_game_assetLoader = _this_game.assetLoader) === null || _this_game_assetLoader === void 0 ? void 0 : _this_game_assetLoader.getAsset(assetName);
                    // Check if this resource is being highlighted
                    var isHighlighted = this.highlightedResource === resource.key && this.highlightTimer > 0;
                    if (resourceImg) {
                        // Draw the resource image
                        var padding = this.slotPadding;
                        // Add slight animation if highlighted
                        if (isHighlighted) {
                            var bounceAmount = Math.sin(Date.now() / 150) * 2;
                            ctx.drawImage(resourceImg, x + padding, y + padding + bounceAmount, size - padding * 2, size - padding * 2);
                            // Draw glow effect
                            ctx.globalAlpha = 0.3 + 0.2 * Math.sin(Date.now() / 200);
                            ctx.fillStyle = '#FFFF00';
                            ctx.fillRect(x, y, size, size);
                            ctx.globalAlpha = 1.0;
                        } else {
                            ctx.drawImage(resourceImg, x + padding, y + padding, size - padding * 2, size - padding * 2);
                        }
                    } else {
                        // Fallback if image isn't loaded - draw colored squares
                        var colors = [
                            '#8B4513',
                            '#DDDDDD',
                            '#777777',
                            '#F5F5F5'
                        ];
                        ctx.fillStyle = colors[index % colors.length];
                        var iconPadding = 6;
                        ctx.fillRect(x + iconPadding, y + iconPadding, size - iconPadding * 2, size - iconPadding * 2);
                    }
                }
            }
        },
        {
            // Draw a Minecraft style border around the panel
            key: "drawMinecraftBorder",
            value: function drawMinecraftBorder(ctx) {
                var borderColor = '#553525'; // Dark wood color
                var borderWidth = this.borderWidth;
                // Top border
                ctx.fillStyle = borderColor;
                ctx.fillRect(this.x, this.y, this.width, borderWidth);
                // Bottom border
                ctx.fillRect(this.x, this.y + this.height - borderWidth, this.width, borderWidth);
                // Left border
                ctx.fillRect(this.x, this.y, borderWidth, this.height);
                // Right border
                ctx.fillRect(this.x + this.width - borderWidth, this.y, borderWidth, this.height);
                // Add corner details
                for(var i = 0; i < borderWidth; i++){
                    // Top-left to bottom-right diagonal at corners
                    ctx.fillStyle = "rgba(0, 0, 0, ".concat(0.2 + i * 0.1, ")");
                    // Top-left corner
                    ctx.fillRect(this.x + i, this.y + i, 1, 1);
                    // Top-right corner
                    ctx.fillRect(this.x + this.width - i - 1, this.y + i, 1, 1);
                    // Bottom-left corner
                    ctx.fillRect(this.x + i, this.y + this.height - i - 1, 1, 1);
                    // Bottom-right corner
                    ctx.fillRect(this.x + this.width - i - 1, this.y + this.height - i - 1, 1, 1);
                }
            }
        }
    ]);
    return CraftingPanel;
}();
export { CraftingPanel as default };
