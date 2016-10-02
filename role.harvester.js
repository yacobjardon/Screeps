var roleHarvester = {
    run: function(creep, n) {
        
        if (creep.carry.energy < creep.carryCapacity)
        {
            var energy = creep.pos.findInRange( FIND_DROPPED_ENERGY, 1 );
            if (energy.length) {
                creep.pickup(energy[0]);
            }
        }
        
        
        
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('source');
	    } else if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('dump');
	    }
        
        
        
	    if( !creep.memory.building ) {
	        
            var source = Game.getObjectById(String(Memory.vars[n].source));
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
            };
        
	    } else {
                
            targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => 
                {return (structure.structureType == STRUCTURE_CONTAINER) && (structure.energy != structure.storeCapacity) }});
            
            
            if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets);
            }
        }
	}
};

module.exports = roleHarvester;