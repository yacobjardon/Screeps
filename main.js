var _init  = require('n_init');
var _spawn = require('n_spawn');
var _scheduler = require('n_scheduler');
var _roles = require('n_roles');


module.exports.loop = function () {

    var start = Date.now();
    _init.run();        // loads vars into memory
    _spawn.run(Game);   // spawns exsisting creeps (should this be feed by scheduler) (should this be moved?)
    _scheduler.run();   // chooses creeps to exicute stratigy
    _roles.run();       //
    //opto.run();         // game anlysis and strategy
    var end = Date.now();
    //console.log(end - start);
    //Game.cpu.getUsed()

}