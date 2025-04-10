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
import { CANVAS_WIDTH, CANVAS_HEIGHT, GAME_STATE } from './constants.js';
var QuizPanel = /*#__PURE__*/ function() {
    "use strict";
    function QuizPanel(game) {
        _class_call_check(this, QuizPanel);
        this.game = game;
        this.visible = false;
        this.width = 400;
        this.height = 400;
        this.x = CANVAS_WIDTH / 2 - this.width / 2;
        this.y = CANVAS_HEIGHT / 2 - this.height / 2;
        // Quiz content
        this.currentQuiz = null;
        this.selectedAnswer = null;
        this.feedbackMessage = '';
        this.feedbackColor = 'white';
        this.showingFeedback = false;
        this.feedbackTimer = 0;
        // Quiz question bank - educational questions on various topic
        this.quizQuestions = [
            {
                question: "What is 2 + 3?",
                answers: [
                    "4",
                    "5",
                    "6",
                    "7"
                ],
                correctAnswer: 1,
                reward: {
                    type: "sticks",
                    amount: 2
                }
            },
            {
                question: "What is 5 - 2?",
                answers: [
                    "2",
                    "3",
                    "4",
                    "5"
                ],
                correctAnswer: 1,
                reward: {
                    type: "strings",
                    amount: 2
                }
            },
            {
                question: "What is 4 × 2?",
                answers: [
                    "6",
                    "7",
                    "8",
                    "10"
                ],
                correctAnswer: 2,
                reward: {
                    type: "flint",
                    amount: 2
                }
            },
            {
                question: "What is 10 ÷ 2?",
                answers: [
                    "3",
                    "4",
                    "5",
                    "6"
                ],
                correctAnswer: 2,
                reward: {
                    type: "feather",
                    amount: 2
                }
            },
            {
                question: "What is 3 + 4?",
                answers: [
                    "5",
                    "6",
                    "7",
                    "8"
                ],
                correctAnswer: 2,
                reward: {
                    type: "sticks",
                    amount: 2
                }
            },
            {
                question: "What is 6 - 3?",
                answers: [
                    "2",
                    "3",
                    "4",
                    "5"
                ],
                correctAnswer: 1,
                reward: {
                    type: "strings",
                    amount: 2
                }
            },
            {
                question: "What is 2 × 3?",
                answers: [
                    "5",
                    "6",
                    "7",
                    "8"
                ],
                correctAnswer: 1,
                reward: {
                    type: "flint",
                    amount: 2
                }
            },
            {
                question: "What is 8 ÷ 2?",
                answers: [
                    "2",
                    "3",
                    "4",
                    "5"
                ],
                correctAnswer: 2,
                reward: {
                    type: "feather",
                    amount: 2
                }
            },
            {
                question: "What is 5 + 5?",
                answers: [
                    "8",
                    "9",
                    "10",
                    "11"
                ],
                correctAnswer: 2,
                reward: {
                    type: "sticks",
                    amount: 2
                }
            },
            {
                question: "What is 9 - 4?",
                answers: [
                    "3",
                    "4",
                    "5",
                    "6"
                ],
                correctAnswer: 2,
                reward: {
                    type: "strings",
                    amount: 2
                }
            }
        ];
        this.setupListeners();
    }
    _create_class(QuizPanel, [
        {
            key: "setupListeners",
            value: function setupListeners() {
                // Mouse click handler for answering questions
                this.clickHandler = this.handleClick.bind(this);
                this.game.canvas.addEventListener('click', this.clickHandler);
                // Touch handler for mobile
                this.touchHandler = this.handleTouch.bind(this);
                this.game.canvas.addEventListener('touchstart', this.touchHandler);
            }
        },
        {
            key: "removeListeners",
            value: function removeListeners() {
                this.game.canvas.removeEventListener('click', this.clickHandler);
                this.game.canvas.removeEventListener('touchstart', this.touchHandler);
            }
        },
        {
            key: "handleClick",
            value: function handleClick(event) {
                if (!this.visible) return;
                var rect = this.game.canvas.getBoundingClientRect();
                var mouseX = (event.clientX - rect.left) * (this.game.canvas.width / rect.width);
                var mouseY = (event.clientY - rect.top) * (this.game.canvas.height / rect.height);
                // Check if an answer was clicked
                if (this.currentQuiz) {
                    var answers = this.currentQuiz.answers;
                    var buttonHeight = 40;
                    var buttonSpacing = 15;
                    var startY = this.y + 120;
                    for(var i = 0; i < answers.length; i++){
                        var buttonY = startY + i * (buttonHeight + buttonSpacing);
                        if (mouseX >= this.x + 50 && mouseX <= this.x + this.width - 50 && mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
                            this.selectedAnswer = i;
                            this.checkAnswer();
                            break;
                        }
                    }
                }
            }
        },
        {
            key: "handleTouch",
            value: function handleTouch(event) {
                if (!this.visible) return;
                event.preventDefault();
                var rect = this.game.canvas.getBoundingClientRect();
                var touch = event.touches[0];
                var touchX = (touch.clientX - rect.left) * (this.game.canvas.width / rect.width);
                var touchY = (touch.clientY - rect.top) * (this.game.canvas.height / rect.height);
                // Use the same logic as click handler
                if (this.currentQuiz) {
                    var answers = this.currentQuiz.answers;
                    var buttonHeight = 40;
                    var buttonSpacing = 15;
                    var startY = this.y + 120;
                    for(var i = 0; i < answers.length; i++){
                        var buttonY = startY + i * (buttonHeight + buttonSpacing);
                        if (touchX >= this.x + 50 && touchX <= this.x + this.width - 50 && touchY >= buttonY && touchY <= buttonY + buttonHeight) {
                            this.selectedAnswer = i;
                            this.checkAnswer();
                            break;
                        }
                    }
                }
            }
        },
        {
            key: "show",
            value: function show(miningSpot) {
                this.visible = true;
                this.selectRandomQuiz();
                this.selectedAnswer = null;
                this.showingFeedback = false;
                this.currentMiningSpot = miningSpot; // Store reference to the mining spot
            }
        },
        {
            key: "hide",
            value: function hide() {
                this.visible = false;
                this.currentQuiz = null;
                this.selectedAnswer = null;
            }
        },
        {
            key: "selectRandomQuiz",
            value: function selectRandomQuiz() {
                // Select questions based on mining spot type if available
                if (this.currentMiningSpot) {
                    // Filter questions related to the mining spot resource type
                    var resourceType = this.currentMiningSpot.type;
                    var typeQuestions = this.quizQuestions.filter(function(q) {
                        return q.reward.type === resourceType;
                    });
                    if (typeQuestions.length > 0) {
                        // Choose from resource-specific questions
                        var randomIndex = Math.floor(Math.random() * typeQuestions.length);
                        this.currentQuiz = typeQuestions[randomIndex];
                        return;
                    }
                }
                // Fallback to random question if no matching questions or no mining spot
                var randomIndex1 = Math.floor(Math.random() * this.quizQuestions.length);
                this.currentQuiz = this.quizQuestions[randomIndex1];
            }
        },
        {
            key: "checkAnswer",
            value: function checkAnswer() {
                var _this = this;
                if (this.selectedAnswer === this.currentQuiz.correctAnswer) {
                    // Correct answer
                    this.feedbackMessage = 'Correct! Resource will appear.';
                    this.feedbackColor = '#4CAF50'; // Green
                    // If this quiz is from a mining spot, spawn the resource there
                    if (this.currentMiningSpot) {
                        this.spawnResourceAtMiningSpot();
                    } else {
                        // Fallback for quizzes not triggered by mining
                        this.game.resources[this.currentQuiz.reward.type] += this.currentQuiz.reward.amount;
                        this.game.craftingPanel.updateResources(this.game.resources);
                        // Add floating text for direct rewards
                        var playerX = this.game.player.x;
                        var playerY = this.game.player.y;
                        this.game.floatingTexts.push(new this.game.floatingTextClass("+".concat(this.currentQuiz.reward.amount, " ").concat(this.currentQuiz.reward.type), playerX, playerY - 20));
                    }
                } else {
                    // Wrong answer
                    this.feedbackMessage = 'Incorrect! Try again.';
                    this.feedbackColor = '#F44336'; // Red
                }
                // Show feedback
                this.showingFeedback = true;
                this.feedbackTimer = 2000; // 2 seconds
                // After feedback, close quiz and return to game
                setTimeout(function() {
                    _this.hide();
                    _this.game.gameState = GAME_STATE.PLAYING;
                }, this.feedbackTimer);
            }
        },
        {
            key: "spawnResourceAtMiningSpot",
            value: function spawnResourceAtMiningSpot() {
                if (!this.currentMiningSpot) return;
                
                // Find the nearest platform or ground level to position the resource for easy collection
                var spotX = this.currentMiningSpot.x;
                var groundY = 500; // Default ground level
                
                // Find a better Y position - preferably on a platform or the ground
                var platformBelow = null;
                
                // Check for platforms below the mining spot
                this.game.world.platforms.forEach(function(platform) {
                    if (spotX >= platform.x && spotX <= platform.x + platform.width) {
                        if (platform.y < groundY && platform.y > this.currentMiningSpot.y) {
                            platformBelow = platform;
                            groundY = platform.y;
                        }
                    }
                }, this);
                
                // Create a new collectable item at an accessible position
                var item = {
                    type: this.currentMiningSpot.type,
                    x: spotX,
                    y: groundY - 60, // Position resource above the ground/platform for easy collection
                    width: 30,
                    height: 30,
                    id: "".concat(this.currentMiningSpot.type, "-").concat(Date.now())
                };
                
                // Add the item to the world
                this.game.world.items.push(item);
                
                // Mark mining spot as having spawned a resource
                this.currentMiningSpot.resourceSpawned = true;
                
                // Add floating text indicating resource spawned
                this.game.floatingTexts.push(new this.game.floatingTextClass(
                    "".concat(this.currentMiningSpot.type, " appeared!"), 
                    this.currentMiningSpot.x, 
                    this.currentMiningSpot.y - 50
                ));
                
                // Add a hint about collection
                this.game.floatingTexts.push(new this.game.floatingTextClass(
                    "Press E to collect",
                    item.x,
                    item.y - 30
                ));
            }
        },
        {
            key: "update",
            value: function update(deltaTime) {
                if (this.showingFeedback) {
                    this.feedbackTimer -= deltaTime;
                    if (this.feedbackTimer <= 0) {
                        this.showingFeedback = false;
                    }
                }
            }
        },
        {
            key: "render",
            value: function render(ctx) {
                if (!this.visible) return;
                
                // Semi-transparent overlay with gradient effect
                const gradient = ctx.createRadialGradient(
                    CANVAS_WIDTH/2, CANVAS_HEIGHT/2, 50, 
                    CANVAS_WIDTH/2, CANVAS_HEIGHT/2, CANVAS_WIDTH
                );
                gradient.addColorStop(0, 'rgba(0, 0, 0, 0.5)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                
                // Panel background with gradient
                const panelGradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
                panelGradient.addColorStop(0, '#2c3e50');
                panelGradient.addColorStop(1, '#1a2530');
                ctx.fillStyle = panelGradient;
                ctx.fillRect(this.x, this.y, this.width, this.height);
                
                // Improved border with rounded corners
                ctx.beginPath();
                ctx.lineWidth = 6;
                ctx.strokeStyle = '#8B4513';
                ctx.roundRect(this.x - 3, this.y - 3, this.width + 6, this.height + 6, 10);
                ctx.stroke();
                
                // Add decorative corners
                this.drawCornerDecoration(ctx, this.x - 5, this.y - 5, 1); // Top-left
                this.drawCornerDecoration(ctx, this.x + this.width + 5, this.y - 5, 2); // Top-right
                this.drawCornerDecoration(ctx, this.x - 5, this.y + this.height + 5, 3); // Bottom-left
                this.drawCornerDecoration(ctx, this.x + this.width + 5, this.y + this.height + 5, 4); // Bottom-right
                
                if (this.currentQuiz) {
                    // Quiz title with shadow and fancy styling
                    ctx.fillStyle = '#f39c12'; // Gold color
                    ctx.font = 'bold 28px "Trebuchet MS", sans-serif';
                    ctx.textAlign = 'center';
                    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                    ctx.shadowBlur = 4;
                    ctx.shadowOffsetY = 2;
                    ctx.fillText('Question', this.x + this.width / 2, this.y + 35);
                    ctx.shadowBlur = 0;
                    ctx.shadowOffsetY = 0;
                    
                    // Add decorative divider below title
                    ctx.beginPath();
                    ctx.moveTo(this.x + 50, this.y + 45);
                    ctx.lineTo(this.x + this.width - 50, this.y + 45);
                    ctx.strokeStyle = '#f39c12';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    
                    // Question text with improved styling
                    ctx.fillStyle = '#ecf0f1';
                    ctx.font = '20px "Trebuchet MS", sans-serif';
                    
                    // Handle long questions with wrapping
                    this.wrapText(ctx, this.currentQuiz.question, this.x + this.width / 2, this.y + 75, this.width - 60, 25);
                    
                    // Answer options with improved visuals - adjusted positioning
                    const answers = this.currentQuiz.answers;
                    const buttonHeight = 45;
                    const buttonSpacing = 15;
                    // Start options higher up to ensure all fit in the panel
                    const startY = this.y + 130; 
                    
                    for (let i = 0; i < answers.length; i++) {
                        const buttonY = startY + i * (buttonHeight + buttonSpacing);
                        
                        // Button background with gradient
                        const buttonGradient = ctx.createLinearGradient(
                            this.x + 40, buttonY, this.x + 40, buttonY + buttonHeight
                        );
                        
                        if (this.selectedAnswer === i) {
                            // Selected button styling
                            buttonGradient.addColorStop(0, '#3498db');
                            buttonGradient.addColorStop(1, '#2980b9');
                        } else {
                            // Normal button styling
                            buttonGradient.addColorStop(0, '#34495e');
                            buttonGradient.addColorStop(1, '#2c3e50');
                        }
                        
                        ctx.fillStyle = buttonGradient;
                        
                        // Reduced width buttons to fit in panel
                        ctx.beginPath();
                        ctx.roundRect(this.x + 40, buttonY, this.width - 80, buttonHeight, 8);
                        ctx.fill();
                        
                        // Button border
                        ctx.strokeStyle = this.selectedAnswer === i ? '#3498db' : '#1f618d';
                        ctx.lineWidth = 2;
                        ctx.stroke();
                        
                        // Add subtle inner shadow
                        if (this.selectedAnswer !== i) {
                            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
                            ctx.shadowBlur = 3;
                            ctx.shadowOffsetY = 2;
                        }
                        
                        // Answer text with letter indicator
                        ctx.fillStyle = this.selectedAnswer === i ? '#ffffff' : '#ecf0f1';
                        ctx.font = '18px "Trebuchet MS", sans-serif';
                        ctx.textAlign = 'left';
                        ctx.shadowBlur = 0;
                        ctx.shadowOffsetY = 0;
                        
                        // Letter indicator in a circle
                        const letters = ['A', 'B', 'C', 'D'];
                        ctx.beginPath();
                        ctx.arc(this.x + 60, buttonY + buttonHeight / 2, 12, 0, Math.PI * 2);
                        ctx.fillStyle = this.selectedAnswer === i ? '#1f618d' : '#3498db';
                        ctx.fill();
                        
                        ctx.fillStyle = '#ffffff';
                        ctx.font = 'bold 16px "Trebuchet MS", sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText(letters[i], this.x + 60, buttonY + buttonHeight / 2 + 5);
                        
                        // Answer text
                        ctx.fillStyle = this.selectedAnswer === i ? '#ffffff' : '#ecf0f1';
                        ctx.font = '18px "Trebuchet MS", sans-serif';
                        ctx.textAlign = 'left';
                        ctx.fillText(answers[i], this.x + 85, buttonY + buttonHeight / 2 + 5);
                    }
                    
                    // Feedback message with animation and styling - adjusted position
                    if (this.showingFeedback) {
                        // Positioned inside the panel
                        const feedbackY = Math.min(startY + answers.length * (buttonHeight + buttonSpacing) + 10, this.y + this.height - 60);
                        
                        ctx.fillStyle = this.feedbackColor === '#4CAF50' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)';
                        ctx.beginPath();
                        ctx.roundRect(this.x + 40, feedbackY, this.width - 80, 40, 8);
                        ctx.fill();
                        
                        ctx.strokeStyle = this.feedbackColor;
                        ctx.lineWidth = 2;
                        ctx.stroke();
                        
                        // Feedback text with icon
                        ctx.fillStyle = this.feedbackColor;
                        ctx.font = 'bold 20px "Trebuchet MS", sans-serif';
                        ctx.textAlign = 'center';
                        
                        // Draw appropriate icon
                        if (this.feedbackColor === '#4CAF50') {
                            // Checkmark for correct
                            ctx.beginPath();
                            ctx.moveTo(this.x + this.width / 2 - 80, feedbackY + 20);
                            ctx.lineTo(this.x + this.width / 2 - 65, feedbackY + 30);
                            ctx.lineTo(this.x + this.width / 2 - 50, feedbackY + 10);
                            ctx.lineWidth = 3;
                            ctx.strokeStyle = '#4CAF50';
                            ctx.stroke();
                        } else {
                            // X for incorrect
                            ctx.beginPath();
                            ctx.moveTo(this.x + this.width / 2 - 80, feedbackY + 10);
                            ctx.lineTo(this.x + this.width / 2 - 50, feedbackY + 30);
                            ctx.moveTo(this.x + this.width / 2 - 50, feedbackY + 10);
                            ctx.lineTo(this.x + this.width / 2 - 80, feedbackY + 30);
                            ctx.lineWidth = 3;
                            ctx.strokeStyle = '#F44336';
                            ctx.stroke();
                        }
                        
                        ctx.fillText(this.feedbackMessage, this.x + this.width / 2, feedbackY + 25);
                    }
                    
                    // Add reward info
                    ctx.fillStyle = '#bdc3c7';
                    ctx.font = '16px "Trebuchet MS", sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText(`Reward: ${this.currentQuiz.reward.amount} ${this.currentQuiz.reward.type}`, 
                                this.x + this.width / 2, this.y + this.height - 15);
                }
            }
        },
        {
            // Helper function to wrap text
            key: "wrapText",
            value: function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
                var words = text.split(' ');
                var line = '';
                ctx.textAlign = 'center';
                for(var n = 0; n < words.length; n++){
                    var testLine = line + words[n] + ' ';
                    var metrics = ctx.measureText(testLine);
                    var testWidth = metrics.width;
                    if (testWidth > maxWidth && n > 0) {
                        ctx.fillText(line, x, y);
                        line = words[n] + ' ';
                        y += lineHeight;
                    } else {
                        line = testLine;
                    }
                }
                ctx.fillText(line, x, y);
            }
        },
        {
            key: "drawCornerDecoration",
            value: function drawCornerDecoration(ctx, x, y, corner) {
                ctx.fillStyle = '#8B4513';
                
                // Draw different decorations based on corner position
                switch(corner) {
                    case 1: // Top-left
                        ctx.beginPath();
                        ctx.moveTo(x, y + 10);
                        ctx.lineTo(x, y);
                        ctx.lineTo(x + 10, y);
                        ctx.lineTo(x + 5, y + 5);
                        ctx.lineTo(x + 10, y + 10);
                        ctx.fill();
                        break;
                    case 2: // Top-right
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x, y + 10);
                        ctx.lineTo(x - 10, y + 10);
                        ctx.lineTo(x - 5, y + 5);
                        ctx.lineTo(x - 10, y);
                        ctx.fill();
                        break;
                    case 3: // Bottom-left
                        ctx.beginPath();
                        ctx.moveTo(x, y - 10);
                        ctx.lineTo(x, y);
                        ctx.lineTo(x + 10, y);
                        ctx.lineTo(x + 5, y - 5);
                        ctx.lineTo(x + 10, y - 10);
                        ctx.fill();
                        break;
                    case 4: // Bottom-right
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x, y - 10);
                        ctx.lineTo(x - 10, y - 10);
                        ctx.lineTo(x - 5, y - 5);
                        ctx.lineTo(x - 10, y);
                        ctx.fill();
                        break;
                }
            }
        }
    ]);
    return QuizPanel;
}();
export { QuizPanel as default };
