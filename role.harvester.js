var roleHarvester = {
    run: function(creep) {
        
        if (creep.carry.energy < creep.carryCapacity)
        {
            var energy = creep.pos.findInRange( FIND_DROPPED_ENERGY, 1 );
            if (energy.length) {
                console.log('found ' + energy[0].energy + ' energy at ', energy[0].pos);
                creep.pickup(energy[0]);
            }
        }
        
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    } else if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    } /*else {
            creep.memory.building = false;
            creep.say('harvesting');
	    }*/
        
	    if( !creep.memory.building ) {
	        
        var sources = creep.room.find(FIND_SOURCES);
            
            //console.log(sources);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            
            var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER
                                ) && structure.energy < structure.energyCapacity || structure.structureType == STRUCTURE_CONTAINER && structure.energy < structure.storeCapacity;
                    }
            });
            
            if( !targets ){
                targets = Game.creeps.c2.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER)}});
                //console.log(targets)
                /*
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION) && structure.energy < structure.storeCapacity 
                    }
                });  */
            }
            
            //console.log(targets);
            
            if( !targets ){
                roleBuilder = require('role.builder')
                roleBuilder.run(creep)
            }
            
            
            if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets);
            }
        }
	}
};

module.exports = roleHarvester;