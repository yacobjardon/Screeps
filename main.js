var _init  = require('n_init');
var _spawn = require('n_spawn');
var _scheduler = require('n_scheduler');
var _roles = require('n_roles');


module.exports.loop = function () {

    var start = Date.now();
    let start2 = 123;
    _init.run();        // loads vars into memory
    _spawn.run();   // spawns exsisting creeps (should this be feed by scheduler) (should this be moved?)
    _scheduler.run();   // chooses creeps to exicute stratigy
    _roles.run();       //
    //opto.run();         // game anlysis and strategy
    var end = Date.now();
    //console.log(end - start);
    //Game.cpu.getUsed()
    
    
    
    for(var room_it in Game.rooms) {
        
        //console.log(room_it)
        
        //var room = Game.rooms[room_it]
        //var spawn = room.find(FIND_MY_SPAWNS)[0]; // TODO: decide on multi spawn rooms
    }
    
}