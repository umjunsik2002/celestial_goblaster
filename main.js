titleWords = ["Cat", "Catch", "Ca$h"];
word1 = titleWords[rndi(titleWords.length)]
word2 = titleWords[rndi(titleWords.length)]
word3 = titleWords[rndi(titleWords.length)]

title = (`${word1} ${word2} ${word3}`);

description = `
[Tap/Hold]
  Steal!
`;

// Define pixel arts of characters
// Each letter represents a pixel color
// l - Black    L - Light Black
// r - Red      R - Light Red
// g - Green    G - Light Green
// b - Blue     B - Light Blue
// y - Yellow   Y - Light Yellow
// p - Purple   P - Light Purple
// c - Cyan     C - Light Cyan

characters = [
`
 y  y
 yyyy
yygygy
 yyyy
 yyyy
 y  y
`,

`
 y  y
 yyyy
yygygy
 yyyy
 yyyy
 y  
`,

`
 y  y
 yyyy
yygygy
 yyyy
 yyyy
    y
`,
];

const G = {
        WIDTH: 200,
        HEIGHT: 50,
};

options = {
        viewSize: {x: G.WIDTH, y: G.HEIGHT},
        theme: "dark",  // "simple" and "dark" are the LEAST resource-intensive (aka safe)
        seed: 69,
        isPlayingBgm: true,
        isReplayEnabled: true,

        isCapturing: true,
        isCapturingGameCanvasOnly: true,
        captureCanvasScale: 2
};

/**
 * @typedef {{
 * pos: Vector
 * mirror: number
 * flipFactor : number
 * moveSpeed: number
 * }} Player
 */

/**
 * @type { Player }
 */
let player;

/**
 * @typedef {{
* pos: Vector
* id: number
* isLucky: boolean
* }} Machine
*/

/**
* @type { Machine }
*/
let machine;

let machines;

/**
 * @type { boolean }
 */
let activeMachine

// The game loop
function update() {
    // init ran at startup
    if (!ticks) {
        player = {
            pos: vec(4, G.HEIGHT - 3),
            mirror: 1,
            flipFactor: 1,
            moveSpeed: 20
        };

        machines = []
        for (let i = 0; i < 10; i++) {
            machines.push(machine = {
                pos: vec(30 + (i * 16), G.HEIGHT - 2, 10, 30),
                id: i + 1,
                isLucky: false
            })
        }

        activeMachine = false
    }

    if (ticks % 5 == 0 && !activeMachine) {
        machines[rndi(machines.length)].isLucky = true
        activeMachine = true
    }

    machines.forEach((m) => {
        if (m.isLucky) {
            color("green")
            box(m.pos.x, m.pos.y, rnd(10, 15), rnd(30,35))

            color("yellow")
            particle(
                // May also use a Vector instead of an (x, y) coordinate
                m.pos.x,             // x coordinate
                m.pos.y - 15,             // y coordinate
                2,                       // number of particles
                2,                       // speed of particles
                -PI/2,                   // emitting angle
                PI/2                      // emitting width
            )
        } else {
            color("light_black")
            box(m.pos.x, m.pos.y, 10, 30)
        }
    });

    player.moveSpeed = difficulty / 4

    // Updating and drawing the player
    if (player.pos.x < G.WIDTH - 2 && player.pos.x > 3) {
        player.pos.x += player.moveSpeed * player.flipFactor;
    } else {
        player.mirror *= -1
        player.flipFactor *= -1
        player.pos.x += player.moveSpeed * player.flipFactor;
    }

    // // Particles
    // color("yellow")
    // particle(
    //     // May also use a Vector instead of an (x, y) coordinate
    //     player.pos.x + offset,    // x coordinate
    //     player.pos.y,             // y coordinate
    //     4,                        // number of particles
    //     1,                        // speed of particles
    //     -PI/2,                    // emitting angle
    //     PI/4                      // emitting width
    // );

    // Draw sprite with original colors instead of an overlay
    color("black")
    char("a", player.pos, {mirror: {x: player.mirror}})

    // Text
    color("red");
    text(difficulty.toString(), G.WIDTH - 25, 10);
};
