
class start extends Phaser.Scene {
    constructor() {
        super('start');
    }
    preload(){}
    create(){}
    update(){}
}

let config = {
    type: Phaser.WEBGL,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    backgroundColor: '#000000',
    scene: [start]
}

let game = new Phaser.Game(config);