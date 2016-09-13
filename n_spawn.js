var spawn = {
    run: function(Game){
        
        for(var name in Memory.vars) {
            var creep = name;
            if(Game.spawns.S1.canCreateCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], Memory.vars[name].id) == 0){
                Game.spawns.S1.createCreep(  [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], String(Memory.vars[name].id));
                console.log('spawn:  ', name);
                
                Game.creeps[Memory.vars[name].id].memory.repairing  = false;
                Game.creeps[Memory.vars[name].id].memory.building   = false;
                Game.creeps[Memory.vars[name].id].memory.upgrading  = false;
                Game.creeps[Memory.vars[name].id].memory.harvesting = true;
            }
        }
        
        /*
        if(Game.spawns.S1.canCreateCreep([WORK, CARRY, CARRY, MOVE], 'c0') == 0){
            Game.spawns.S1.createCreep(  [WORK, CARRY, CARRY, MOVE], 'c0' );
            Game.creeps.c0.memory.role = 'builder';
            Game.creeps.c0.memory.id = 0;
        }
        if(Game.spawns.S1.canCreateCreep([WORK, CARRY, CARRY, MOVE], 'c1') == 0){
            Game.spawns.S1.createCreep(  [WORK, CARRY, CARRY, MOVE], 'c1' );
            Game.creeps.c1.memory.role = 'harvester';
            Game.creeps.c1.memory.id = 1;
        }
        ...
        */
    }
};

module.exports = spawn;