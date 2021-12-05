/*
 * File: YarnPattern.js
 * --------------------
 * This program uses the GLine class to simulate winding a piece of
 * yarn around an array of pegs along the edges of the graphics window.
 */

"use strict";

/* Constants */

const PEG_SEP = 13;       /* The separation between pegs in pixels  */
const N_ACROSS = 78;      /* Number of PEG_SEP units horizontally   */
const N_DOWN = 50;        /* Number of PEG_SEP units vertically     */
const DELTA = 120;        /* Number of pegs to skip on each cycle   */

/*
 * Creates a pattern that simulates the process of winding a piece of
 * yarn around a series of pegs along the edges of the graphics window.
 * At each step, the yarn is stretched from its current peg to the one
 * DELTA pegs further on, wrapping around to the beginning if necessary.
 */

function yarnPattern() {
   let gw = GWindow(N_ACROSS * PEG_SEP, N_DOWN * PEG_SEP);
   let pegs = createPegArray();
   let thisPeg = 0;
   let nextPeg = -1;
   while (thisPeg !== 0 || nextPeg === -1) {
      nextPeg = (thisPeg + DELTA) % pegs.length;
      let p0 = pegs[thisPeg];
      let p1 = pegs[nextPeg];
      let line = GLine(p0.getX(), p0.getY(), p1.getX(), p1.getY());
      line.setColor("Green");
      gw.add(line);
      thisPeg = nextPeg;
    }


}

/*
 * Creates an array of pegs around the perimeter of the graphics window.
 */

function createPegArray() {
   let pegs = [ ];
   for (let i = 0; i < N_ACROSS; i++) {
      pegs.push(Point(i * PEG_SEP, 0));
   }
   for (let i = 0; i < N_DOWN; i++) {
      pegs.push(Point(N_ACROSS * PEG_SEP, i * PEG_SEP));
   }
   for (let i = N_ACROSS; i > 0; i--) {
      pegs.push(Point(i * PEG_SEP, N_DOWN * PEG_SEP));
   }
   for (let i = N_DOWN; i > 0; i--) {
      pegs.push(Point(0, i * PEG_SEP));
   }
   return pegs;
}


