module.exports = {
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
            //creep.say('pick');
            
	    } else if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        //creep.say('dump');
	        
	    } else if ( creep.memory.repairing ==  true && creep.memory.harvesting == true
	             || creep.memory.repairing ==  false && creep.memory.harvesting == false ){
            creep.memory.repairing = false;
            //creep.say('pick');
	    }
        
        
	    if( !creep.memory.building ) {
	        
	        //creep.moveTo(41, 41)
	        
            var energy = creep.room.find( FIND_DROPPED_ENERGY );
            if (energy[0] > 100) {
                
                if(creep.pickup(energy[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(energy)
                }
                
            } else {
                var sources = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                    return ( (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > structure.storeCapacity * .2) )
                }});
            }
            
            if(sources){
                
                if(creep.withdraw(sources, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources);
                }
                
            } else {
                
                var sources = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => { return ( (structure.structureType == STRUCTURE_STORAGE))}
                    
                });
            
                if(sources){
                    if(creep.withdraw(sources, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources);
                    }
                }
            }
            //var source = Game.getObjectById(Memory.vars[creep.memory.idn].source);
            
        } else {
            
            
            var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER
                                ) && structure.energy < structure.energyCapacity;
                    }
            });
            
            if( targets ){
                
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }
            } else {
                
                var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                    return structure.structureType == STRUCTURE_STORAGE 
                    }
                });
                
                if(targets){
                    
                    if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets);
                    }
                    
                }
            }
        }
	}
};