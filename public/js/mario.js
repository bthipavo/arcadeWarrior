 let gameScene = new Phaser.Scene('Game')
 let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: gameScene
    
    };
    var cursors
    let game = new Phaser.Game(config);

   gameScene.init = function() {
        this.playerSpeed = 2.7
        this.enemySpeed = 2
        this.enemyMaxX = 890
        this.enemyMinX = -90
    }

    gameScene.preload = function()
    {

        this.load.image('bg', '/img/froggerBG.png');
        this.load.image('player', '/img/mark.jpg');
        this.load.image('red', '/img/ball.png');
        this.load.image('mario', '/img/mario.png');
        this.load.image('bowser', '/img/bowser.jpg');
        this.load.image('koopa', '/img/koopa.png');
        this.load.image('toad', '/img/toad.png');
        this.load.image('bush', '/img/berry_bush.png');
        this.load.image('player2', '/img/koomba.png');
        this.load.image('turtle', '/img/turtleShells.png');
        this.load.image('pipe', '/img/pipe.png');
        this.load.image('win', '/img/winMessage.jpg')
    }

    gameScene.create = function ()
    {
        let background = this.add.sprite(0, 0, 'bg');
        cursors = game.input.keyboard.createCursorKeys()

        this.isPlayerAlive = true;

        background.setOrigin(0, 0);

        this.add.image(100, 250, 'bush')
        // this.add.image(500, 100, 'mario')
        // this.add.image(100, 500, 'toad')
        this.add.image(700, 350, 'bush')
        // this.add.image(200, 300, 'koopa')

        this.player = this.add.sprite(this.sys.game.config.width / 2, 575, 'player2');
        this.player.setScale(0.3)

        // player.setVelocity(100, 200);
        // player.setBounce(1, 1);
        // player.setCollideWorldBounds(true);
        //to make the player sparkle

        this.enemies = this.add.group({
            key: 'toad',
            repeat: 2,
            setXY: {
                x: 100,
                y: 120,
                stepX: 100,
                stepY: 390}
                })

        // scale enemies
        Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.3, -0.3);

        // set speeds
        Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
        enemy.speed = Math.random() * 2 + 1;
        }, this)
        // this.runEnemies('toad')
        this.pipe = this.add.group({
            key: 'pipe',
            repeat: 4,
            setXY: {
                x: 100,
                y: 50,
                stepX: 150,
                stepY: 0}
                })
        Phaser.Actions.ScaleXY(this.pipe.getChildren(), -0.8, -0.8);

        this.mario = this.add.group({
            key: 'mario',
            repeat: 2,
            setXY: {
                x: 500,
                y: 120,
                stepX: 100,
                stepY: 390}
                })
        Phaser.Actions.ScaleXY(this.mario.getChildren(), -0.3, -0.3);

        // set speeds
        Phaser.Actions.Call(this.mario.getChildren(), function(enemy) {
        enemy.speed = Math.random() * 2 + 1;
        }, this)

        this.bowser = this.add.group({
            key: 'bowser',
            repeat: 1,
            setXY: {
                x: 300,
                y: 410,
                stepX: 100,
                stepY: 390}
                })
        Phaser.Actions.ScaleXY(this.bowser.getChildren(), -0.4, -0.4);

        // set speeds
        Phaser.Actions.Call(this.bowser.getChildren(), function(enemy) {
        enemy.speed = Math.random() * 2 + 1;
        }, this)

        this.koopa = this.add.group({
            key: 'koopa',
            repeat: 4,
            setXY: {
                x: 200,
                y: 313,
                stepX: 200,
                stepY: 0}
                })
        Phaser.Actions.ScaleXY(this.koopa.getChildren(), -0.4, -0.4);

        // set speeds
        Phaser.Actions.Call(this.koopa.getChildren(), function(enemy) {
        enemy.speed = 5;
        }, this)

        this.turtle = this.add.group({
            key: 'turtle',
            repeat: 2,
            setXY: {
                x: 200,
                y: 200,
                stepX: 300,
                stepY: 0}
                })
        Phaser.Actions.ScaleXY(this.turtle.getChildren(), -0.85, -0.85);

        // set speeds
        Phaser.Actions.Call(this.turtle.getChildren(), function(enemy) {
        enemy.speed = 5;
        }, this)
    }

    // gameScene.runEnemies = function(car) {
    //     this.enemies2 = this.add.group({
    //             key: "'"+car+"'",
    //             repeat: 2,
    //             setXY: {
    //                 x: 100,
    //                 y: 110,
    //                 stepX: 100,
    //                 stepY: 390}
    //                 })

    //         // scale enemies
    //         Phaser.Actions.ScaleXY(this.enemies2.getChildren(), -0.2, -0.2);

    //         // set speeds
    //         Phaser.Actions.Call(this.enemies2.getChildren(), function(enemy) {
    //         enemy.speed = Math.random() * 2 + 1;
    //         }, this)

    // }

    gameScene.update = function() {
        // console.log("pointer" + this.input.activePointer.isDown)
        if (!this.isPlayerAlive) {
        return;
      }
        if (cursors.up.isDown) {

    // player walks
            this.player.y -= this.playerSpeed;
            if (this.player.y<=20) {
                this.player.y = 20
            }
            console.log("increase" + this.player.x)
        }
        if (cursors.down.isDown) {

    // player walks
            this.player.y += this.playerSpeed;
            if (this.player.y>=580) {
                this.player.y = 580
            }
            console.log("increase" + this.player.x)
        }

        if (cursors.right.isDown) {

    // player walks
            this.player.x += this.playerSpeed;
            if (this.player.x>=780) {
                this.player.x = 780
            }
            console.log("increase" + this.player.x)
        }
        if (cursors.left.isDown) {

    // player walks
            this.player.x -= this.playerSpeed;
            if (this.player.x<=20) {
                this.player.x = 20
            }
            console.log("increase" + this.player.x)
        }

        let enemies = this.enemies.getChildren();
        let numEnemies = enemies.length;

        let mario = this.mario.getChildren();
        let numMario = mario.length;

        let koopa = this.koopa.getChildren();
        let numKoopa = koopa.length;

        let turtle = this.turtle.getChildren();
        let numTurtle = turtle.length;

        let bowser = this.bowser.getChildren();
        let numBowser = bowser.length;

        let pipe = this.pipe.getChildren();
        let numPipe = pipe.length;

        for (let i = 0; i < numPipe; i++) {
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), pipe[i].getBounds())) {
            this.winGame();
        }
        
            
            }

        for (let i = 0; i < numEnemies; i++) {
            enemies[i].x += enemies[i].speed
            if (enemies[i].x >= this.enemyMaxX && enemies[i].speed >0) {
                enemies[i].x = this.enemyMinX
                // Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
                // enemy.speed = Math.random() * 2 + 1;
                // }, this)
                enemies[i].x += enemies[i].speed
            }
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemies[i].getBounds())) {
            this.gameOver();
            
            }
        }

        for (let i = 0; i < numMario; i++) {
            mario[i].x += mario[i].speed
            if (mario[i].x >= this.enemyMaxX && mario[i].speed >0) {
                mario[i].x = this.enemyMinX
                // Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
                // enemy.speed = Math.random() * 2 + 1;
                // }, this)
                mario[i].x += mario[i].speed 
            }
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), mario[i].getBounds())) {
            this.gameOver();
            
            }
        }

        for (let i = 0; i < numKoopa; i++) {
            koopa[i].x += koopa[i].speed
            if (koopa[i].x >= this.enemyMaxX && koopa[i].speed >0) {
                koopa[i].x = this.enemyMinX
                // Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
                // enemy.speed = Math.random() * 2 + 1;
                // }, this)
                koopa[i].x += koopa[i].speed
            }
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), koopa[i].getBounds())) {
            this.gameOver();
            
            }
        }

        for (let i = 0; i < numBowser; i++) {
            bowser[i].x -= bowser[i].speed
            if (bowser[i].x <= this.enemyMinX && bowser[i].speed >0) {
                bowser[i].x = this.enemyMaxX
                // Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
                // enemy.speed = Math.random() * 2 + 1;
                // }, this)
                bowser[i].x -= bowser[i].speed
            }
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), bowser[i].getBounds())) {
            this.gameOver();
            
            }
        }

        for (let i = 0; i < numTurtle; i++) {
            turtle[i].x -= turtle[i].speed
            if (turtle[i].x <= this.enemyMinX && turtle[i].speed >0) {
                turtle[i].x = this.enemyMaxX
                // Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
                // enemy.speed = Math.random() * 2 + 1;
                // }, this)
                turtle[i].x -= turtle[i].speed
            }
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), turtle[i].getBounds())) {
            this.gameOver();
            
            }
        }

        gameScene.gameOver = function() {
        console.log("hello")
            this.isPlayerAlive = false;
        // shake the camera
            this.cameras.main.shake(500);

            this.time.delayedCall(250, function() {
            this.cameras.main.fade(250);
          }, [], this);

          // restart game
          this.time.delayedCall(500, function() {
            this.scene.manager.bootScene(this);
          }, [], this);

          // reset camera effects
          this.time.delayedCall(600, function() {
            this.cameras.main.resetFX();
  }, [], this);
        }

        gameScene.winGame = function() {
            console.log("you win!")
            this.add.image(700, 350, 'win')
        }

    }

