var roleBuilder = {
    run: function(creep, n) {


        if (creep.carry.energy < creep.carryCapacity)
        {
            var energy = creep.pos.findInRange( FIND_DROPPED_ENERGY,1 );
            
            if (energy.length) {
                creep.pickup(energy[0]);
            }
        }
        
        
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.memory.harvesting = true;
            creep.say('harvesting');
        } else if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.memory.harvesting = false;
            creep.say('building');
        } else if ( creep.memory.repairing ==  true && creep.memory.harvesting == true
                || creep.memory.repairing ==  false && creep.memory.harvesting == false ){
            creep.memory.repairing = false;
            creep.memory.harvesting = true;
            creep.say('harvesting');
        }
            	
        	    
        
	    if(creep.memory.building) {
	        
	        var targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
	        
            if(targets) {
                
                if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }
                
            } else {
                role = require('role.upgrader')
                role.run(creep)
            }
            
        } else  {
            
            	            
            if(Memory.to_delete.length){
                
                
                var target = Game.getObjectById(String(Memory.to_delete[0]))
                
                if(target) {
                    if(creep.dismantle(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);    
                    }
                }
            
            } else {
            
                var sources = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ( ((structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > structure.storeCapacity * .2))
                               ||((structure.structureType == STRUCTURE_STORAGE) && (structure.store[RESOURCE_ENERGY] > structure.storeCapacity * .01))
                        )
                }});
                
                if(creep.withdraw(sources, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources);
                }
            }
        }
    }
};

module.exports = roleBuilder;