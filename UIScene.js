class UIScene extends BaseScene{
  constructor(){
    super('UIScene');

  }
  preload() {
    super.preload();
    this.load.atlas('joystickcontroller', 'assets/sprites/arcade-joystick.png', 'assets/sprites/arcade-joystick.json');
    this.load.image('button1-up', 'assets/sprites/button1-up.png');

  }

  create() {
    //VirtualJoystick
    this.stick = this.pad.addStick(200, 1025, 200, 'joystickcontroller');

    //this.stick.setScrollFactor(0);
    this.stick.on('update', stickUpdate, this);
    this.stick.scale = 1.0;

    //Loading Scene/Character
    this.gameScene = this.scene.manager.getScene('TownScene');
    this.gameArcher = this.gameScene.archer.character.body;

    //Fire Button
    var fireButtonSprite = this.add.sprite(1300, 1075,'button1-up')
    fireButtonSprite.setInteractive();
    fireButtonSprite.on('pointerdown', this.fireButtonSpriteDown, this);
  /*  this.fireButton = this.pad.addButton(1300, 1075, 200, 'joystickcontroller', 'button1-up', 'button1-down');
    this.fireButton.on('update', firebuttonUpdate, this);*/

  }

  update(){
    //Put this in the UIScene. Allows it to access the game scene.
  }
  fireButtonSpriteDown(){
    console.log('fire');
    this.tryShoot(this.gameScene.archer, this.gameScene.bullets);

  }
  // end of scene
}

//Stick Update
function stickUpdate (stick, force)
{
  const maxSpeed = 200;

  if (stick.isDown)
  {
    this.physics.velocityFromRotation(stick.rotation, force * maxSpeed, this.gameArcher.velocity);
    this.gameScene.archer.character.rotation = this.stick.rotation;
  }
  else{
    this.gameArcher.velocity.set(0);
  }
}

/* function firebuttonUpdate(){
  if (button.isDown){

  }

}*/
