module.exports = {
    run: function(creep) {

        // Pickup droped energy nearby
        if (creep.carry.energy < creep.carryCapacity)
        {
            var energy = creep.pos.findInRange( FIND_DROPPED_ENERGY, 1 );

            if (energy.length) {
                console.log('found ' + energy[0].energy + ' energy at ', energy[0].pos);
                creep.pickup(energy[0]);
            }
        }

        // Change the creep status/state
	    if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('harvesting');
	    } else if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
	        creep.say('repairing');
	    } /*else if (!creep.memory.repairing && !creep.memory.harvesting){
	        creep.memory.repairing = false;
            creep.say('harvesting');
	    }*/
        
        // 
        if(!creep.memory.repairing){
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0+1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0+1]);
            }
            
        } else {
            var toRepair = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function(object){
                    return (
                        object.structureType == STRUCTURE_ROAD      && (object.hits < object.hitsMax * .99)
                        || object.structureType == STRUCTURE_EXTENSION && (object.hits < object.hitsMax * .99)
                        || object.structureType == STRUCTURE_CONTAINER && (object.hits < object.hitsMax * .99)
                        || object.structureType == STRUCTURE_SPAWN && (object.hit < object.hitsMax * .99)
                    );
                }});
                
                
            // move this block up one level
            //console.log(toRepair.length)
            if (toRepair.length == 1){
                creep.moveTo(toRepair);
                creep.repair(toRepair);
            } else if (toRepair.length > 1){
                creep.moveTo(toRepair[0]);
                creep.repair(toRepair[0]);
            } else {
                roleBuilder = require('role.builder')
                roleBuilder.run(creep)
            }
            
                // perhaps check the results again?
        } //else {
            // nothing to repair, let's do something else?
        //}

    }
};