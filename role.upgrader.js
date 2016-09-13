var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.carry.energy < creep.carryCapacity)
        {
            var energy = creep.pos.findInRange(
            FIND_DROPPED_ENERGY,
                1
            );

            if (energy.length) {
                console.log('found ' + energy[0].energy + ' energy at ', energy[0].pos);
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
        }
        else {
            /*
            var containers = creep.pos.findInRange(FIND_STRUCTURES, 1, 
                {filter: {structureType: STRUCTURE_CONTAINER}});
            containers[0].transfer(creep, RESOURCE_ENERGY);
            */
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0+1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0+1]);
            }
        }
	}
};

module.exports = roleUpgrader;