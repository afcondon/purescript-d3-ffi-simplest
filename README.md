# purescript-d3-ffi-simplest
Minimal example of D3 general update pattern called from Purescript AND a very simple chart with axes, also called across the PureScript FFI

All that's going on here is `spago init` and the addition of the `index.html` and `Main.purs` files. Then you can make an `index.js` using `spago bundle-app`. That's the minimal part.

The Chart works, the GUP is not, in fact, updating correctly (due i think failure to wait between updates, tho it could be some other more stupid error on my part, it certainly works properly when embedded in the much larger, Signal / Event driven app that i wrote). When i get a chance i'll get to the bottom of the problem and fix it.
