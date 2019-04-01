/* class Example extends Phaser.Scene
{
    constructor ()
    {
        super();

        this.box;
        this.stick;
    }

    preload ()
    {
        this.load.atlas('arcade', 'assets/skins/arcade-joystick.png', 'assets/skins/arcade-joystick.json');
    }

    create ()
    {
        this.box = this.add.rectangle(400, 300, 128, 128, 0x6666ff);

        this.physics.add.existing(this.box);

        this.stick = this.pad.addStick(120, 1075, 200, 'arcade');
        this.stick.on('update', this.stickUpdate, this);
    }

    stickUpdate (stick, force)
    {
        const maxSpeed = 400;

        this.box.body.setVelocity(0);

        if (stick.isDown)
        {
            this.physics.velocityFromRotation(stick.rotation, force * maxSpeed, this.box.body.velocity);
        }
    }
}; */

class BaseCharacter{
	constructor(scene, x, y, texture){
		this.scene = scene;
		this.character = scene.physics.add.sprite(x, y, texture);
		this.damageCount = 0;
		this.damageMax = 2;
	}
	update(){
		const speed = 175;
    const prevVelocity = this.character.body.velocity.clone();
   //this.character.body.setVelocity(0);
    //horizontal
    if (this.keys.a.isDown) {
       this.character.body.setVelocityX(-speed);

    } else if (this.keys.d.isDown) {
       this.character.body.setVelocityX(speed);
    }
   //vertical
    if (this.keys.w.isDown) {
       this.character.body.setVelocityY(-speed);
    } else if (this.keys.s.isDown) {
       this.character.body.setVelocityY(speed);
    }
        this.character.body.velocity.normalize().scale(speed);
        const worldPoint = this.scene.input.activePointer.positionToCamera(this.scene.cameras.main);
        this.character.rotation = Phaser.Math.Angle.Between(this.character.x, this.character.y, worldPoint.x, worldPoint.y);
//console.log (this.scene.bullets);
		//bullet = this.scene.bullets.get (this.character.x, this.character.y);
					//if(bullet){
						//fireBullet.call(this.scene, bullet, this.character.rotation, this.character);
			//	}




		};


setBullets(bullets){
	this.bullets = bullets;
}

	enableCollision(destructLayer){
    this.scene.physics.add.collider(this.character, destructLayer);
  }

}
class PlayerCharacter extends BaseCharacter{
	constructor(scene, x, y, texture){
		super(scene, x, y, texture)
		        this.currentSpeed = 0;
        this.keys = scene.input.keyboard.addKeys(
            {
                left: Phaser.Input.Keyboard.KeyCodes.LEFT,
                right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
                up: Phaser.Input.Keyboard.KeyCodes.UP,
                down: Phaser.Input.Keyboard.KeyCodes.DOWN,
                w: Phaser.Input.Keyboard.KeyCodes.W,
                a: Phaser.Input.Keyboard.KeyCodes.A,
                s: Phaser.Input.Keyboard.KeyCodes.S,
                d: Phaser.Input.Keyboard.KeyCodes.D
            }
        );
	}

}



class EnemyCharacter extends BaseCharacter{
  constructor(scene, x, y, texture, player){
      super(scene, x, y, texture);
      this.player = player;
      this.character.angle = Phaser.Math.RND.angle();
      this.scene.physics.velocityFromRotation(this.character.rotation, 100, this.character.velocity);
      this.fireTime = 0;
  }

	update(time, delta){
		super.update();
		this.character.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y);
		if(this.damageCount <= this.damageMax -2 && Phaser.Math.Distance.Between(this.player.x, this.player.y) < 300 && this.fireTime == 0){
			// within Range
			this.fireTime = time;
			var bullet = this.bullets.get(this.character.x, this.character.y);
			if(bullet){
				fireBullet.call(this.scene, bullet, this.character.rotation, this.player);
			}
		}
		if(this.fireTime > 0){
			if(time > this.fireTime + 2000){
				this.fireTime = 0;
			}
		}
	}
}

// class BaseTank {
// 	constructor(scene, x, y, texture, frame) {
// 		this.scene = scene;
// 	    this.shadow = scene.physics.add.sprite(x, y, texture, 'shadow');
// 		this.hull = scene.physics.add.sprite(x, y, texture, frame);
// 		this.hull.body.setSize(this.hull.width - 8, this.hull.height - 8)
// 		this.hull.body.collideWorldBounds = true;
// 		this.hull.body.bounce.setTo(1, 1);
// 		this.turret = scene.physics.add.sprite(x, y, texture, 'turret');
// 		this.damageCount = 0;
// 		this.damageMax = 2;
// 	}
// 	update(){
// 		this.shadow.x = this.turret.x = this.hull.x;
// 		this.shadow.y = this.turret.y = this.hull.y;
// 	}
// 	damage(){
// 		console.log('ouchy pouchy');
// 	}
// 	burn(){
// 		this.turret.setVisible(false);
// 		this.hull.setVelocity(0);
// 		this.hull.body.immovable = true;
// 	}
// 	isDestroyed(){
// 		if(this.damageCount >= this.damageMax){
// 			return true
// 		}
// 	}
// 	enableCollision(destructLayer) {
// 		this.scene.physics.add.collider(this.hull, destructableLayer);
// 	}
// }

//class EnemyTank extends BaseTank{
	//constructor(scene, x, y, texture, frame, player){
		//super(scene, x, y, texture, frame);
		//this.player = player;
		//this.hull.angle = Phaser.Math.RND.angle();
		//this.scene.physics.velocityFromRotation(this.hull.rotation, 100, this.hull.body.velocity);

	//}
// 	update(){
// 		super.update();
// 		this.turret.rotation = Phaser.Math.Angle.Between(this.hull.x, this.hull.y, this.player.hull.x, this.player.hull.y);
// 		this.shadow.rotation = this.hull.rotation = Math.atan2(this.hull.body.velocity.y, this.hull.body.velocity.x)
// 		if(Phaser.Math.Distance.Between(this.hull.x, this.hull.y, this.player.hull.x, this.player.hull.y) < 300){
// 			//in range
// 			 var bullet = this.bullets.get (this.turret.x, this.turret.y);
// 			if(bullet){
// 				fireBullet.call(this.scene, bullet, this.turret.rotation, this.player);
// 			}
// 		}
// 	}
// 	damage(){
// 		this.damageCount++;
// 		if(this.damageCount >= this.damageMax){
// 			//destroyed
// 			this.turret.destroy();
// 			this.hull.destroy();
// 		}else if(this.damageCount == this.damageMax-1){
// 			//disabled
// 			this.burn();
// 		}
// 	}
// }

// class PlayerTank extends BaseTank{
// 	   constructor(scene, x, y, texture, frame) {
//        super(scene, x, y, texture, frame)
// 		   this.currentSpeed = 0;
// 		   this.keys = scene.input.keyboard.addKeys(
// 		   {
// 			   left: Phaser.Input.Keyboard.KeyCodes.LEFT,
// 			   right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
// 			   up: Phaser.Input.Keyboard.KeyCodes.UP,
// 			   down: Phaser.Input.Keyboard.KeyCodes.DOWN,
// 			   w: Phaser.Input.Keyboard.KeyCodes.W,
// 			   s: Phaser.Input.Keyboard.KeyCodes.S,
// 			   a: Phaser.Input.Keyboard.KeyCodes.A,
// 			   d: Phaser.Input.Keyboard.KeyCodes.D
// 		   }
// 		   );
// 	   }
// 	   getTank() {
// 		   return this.hull
// 	   }
// 	   update() {
// 		   if (this.keys.up.isDown || this.keys.w.isDown) {
// 			   if (this.currentSpeed < 100) {
// 				   this.currentSpeed += 10;
// 			   }
// 		   } else if (this.keys.down.isDown || this.keys.s.isDown) {
// 			   if (this.currentSpeed >  -100) {
// 				    this.currentSpeed -= 10;
// 			   }
// 		   } else {
// 			   this.currentSpeed *= 0.9;
// 		   }
// 		   if (this.keys.left.isDown || this.keys.a.isDown) {
// 			   if (this.currentSpeed > 0) {
// 				   this.hull.angle--
// 			   } else {
// 				   this.hull.angle++
// 			   }
// 		   } else if (this.keys.right.isDown || this.keys.d.isDown) {
// 			   if (this.currentSpeed > 0) {
// 				   this.hull.angle++
// 			   } else {
// 				   this.hull.angle--
// 			   }
// 		   }
// 		   this.scene.physics.velocityFromRotation(this.hull.rotation, this.currentSpeed, this.hull.body.velocity);
// 		   this.turret.x = this.shadow.x =this.hull.x;
// 		   this.turret.y = this.shadow.y =this.hull.y;
// 		   const worldPoint = this.scene.input.activePointer.positionToCamera(this.scene.cameras.main);
// 		   this.turret.rotation = Phaser.Math.Angle.Between(this.turret.x, this.turret.y, worldPoint.x, worldPoint.y);
// 	   }
// }
