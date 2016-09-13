var roleBuilder = {
    run: function(creep) {


        if (creep.carry.energy < creep.carryCapacity)
        {
            var energy = creep.pos.findInRange( FIND_DROPPED_ENERGY,1 );

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
	    } else {
	        
	    }

	    if(creep.memory.building) {
	        var targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(1) {
                if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }
            }
	    } else  {
	        
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0+1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0+1]);
            }
	    }
	}
};

module.exports = roleBuilder;