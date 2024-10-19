# The Reactor Game

This whole app is just designed to be Bop It between 2 people.

Player 1 **(Inspector)** sees:
- Stats (heat, coolant, fuel, etc)
- Reactor Events (control rod fractured, fuel depleted, etc)

Player 2 **(Controller)** sees:
- Control Panel (buttons, dials, switches, etc)
- Instruction Log (messaegs from player 1 )

The inspector has to send instructions to the controller of how to soothe the reactor for example:
```
1. Disengage: fuel rods 10, 6, 39, 3
2. Re-engage: fuel rod 6 control rod 12
3. Drain 25 gallons: coolant
4. ...
```
The controller has to input those instructions on their control panel which is deliberately confusing, eg, fuel rod engagement buttons could look like:

|ZONE 3|ZONE 1|ZONE 54|
|-|-|-|
|A2|B7|C1|
|D3|E14|F14|
|G5|H21|F142|

Where the ID provided is the ID in any of the cells and the cell columns are ordered like Zone 3 is all prime numbers, zone 1 is multiples of 7, zone 54 is the digits of pi, etc.

## Technical Info: 
- Node.js
- NPM packages:
  - typescript
  - jquery
  - browserify

## Build:
This app is supposed to be as simple as possible. As such, it uses very few packages and transpiles everything down into a single `index.js` file.

**It is by no means supposed to be efficient.**


- Run Client: `live-server --port=8080`
- Run Server: `node dist/index.js` 
- Compile Server: `tsc -w`
- Compile Client: `npm run build`

## Notes

I might containerise this with docker at some point... Not sure why it'd need to be scalable but it'd be pretty cool I guess.