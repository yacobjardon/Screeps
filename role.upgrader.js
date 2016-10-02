var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep, n) {

        if (creep.carry.energy < creep.carryCapacity)
        {
            var energy = creep.pos.findInRange(
            FIND_DROPPED_ENERGY,
                1
            );

            if (energy.length) {
                creep.pickup(energy[0]);
            }
        }

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('upgrading');
	    }

	    if(creep.memory.upgrading) {
	        
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
            
        } else {
            
            var sources = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                return ( ((structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 100))
                       ||((structure.structureType == STRUCTURE_STORAGE ) && (structure.store[RESOURCE_ENERGY] > 100))
                )
            }});
            
            if(creep.withdraw(sources, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources);
            }
        }
	}
};

module.exports = roleUpgrader;