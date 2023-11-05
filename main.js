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
 * moveSpeed: number
 * }} Player
 */

/**
 * @type { Player }
 */
let player;

// The game loop
function update() {
    // init ran at startup
    if (!ticks) {
        player = {
            pos: vec(3, G.HEIGHT - 3),
            moveSpeed: 0.25
        };
    }

    // Updating and drawing the player
    if (player.pos.x < G.WIDTH - 3) {
        player.pos.x += player.moveSpeed;
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
    char("a", player.pos)

    // Text
    color("red");
    text(difficulty.toString(), G.WIDTH - 25, 10);
};
