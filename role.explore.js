var roleExplore = {
    run: function(creep, n) {
        
        if (creep.carry.energy < creep.carryCapacity){
            var energy = creep.pos.findInRange( FIND_DROPPED_ENERGY, 1 );
            if (energy.length) {
                creep.pickup(energy[0]);
            }
        }
        
        if(creep.room.name != Memory.vars[n].drain){
            creep.moveTo(Game.flags.F_W7N51_00) 
            
        } else {
            
            if(creep.pos.x == 0){
                creep.move(RIGHT)
            } else if(creep.pos.x == 49){
                creep.move(LEFT)
            } else if(creep.pos.y == 49){
                creep.move(TOP)
            } else if(creep.pos.y == 0){
                creep.move(BOTTOM)
            }
            
            
            if((creep.memory.building || creep.memory.upgrading) && creep.carry.energy == 0) {
                creep.memory.building = false;
                creep.memory.harvesting = true;
                creep.memory.upgrading = false;
                creep.say('harvesting');
            } else if (creep.room.ticksToDowngrade < 18000 && creep.carry.energy == creep.carryCapacity) {
                creep.memory.building = false;
                creep.memory.harvesting = false;
                creep.memory.upgrading = true;
                creep.say('upgrading');
            } else if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
                creep.memory.building = true;
                creep.memory.harvesting = false;
                creep.memory.upgrading = false;
                creep.say('building');
            } else if ( creep.memory.repairing ==  true && creep.memory.harvesting == true && creep.memory.upgrading ==  true
                     || creep.memory.repairing ==  false && creep.memory.harvesting == false && creep.memory.upgrading ==  false){
                creep.memory.repairing = false;
                creep.memory.harvesting = true;
                creep.memory.upgrading = false;
                creep.say('harvesting');
            }
        
        
            if(creep.memory.building) {
                
                var toRepair = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(object){
                        return (
                            object.structureType    == STRUCTURE_ROAD       && (object.hits < object.hitsMax)
                            || object.structureType == STRUCTURE_EXTENSION  && (object.hits < object.hitsMax)
                            || object.structureType == STRUCTURE_CONTAINER  && (object.hits < object.hitsMax * .9)
                            || object.structureType == STRUCTURE_SPAWN      && (object.hits < object.hitsMax)
                            || object.structureType == STRUCTURE_STORAGE    && (object.hits < object.hitsMax)
                            || object.structureType == STRUCTURE_RAMPART    && (object.hits < 5000)
                            || object.structureType == STRUCTURE_WALL       && (object.hits < 10000 /*object.hitsMax * .5*/)
                            || object.structureType == STRUCTURE_KEEPER_LAIR && (object.hits < object.hitsMax * .5)
                            || object.structureType == STRUCTURE_CONTROLLER && (object.hits < object.hitsMax * .9)
                            || object.structureType == STRUCTURE_LINK       && (object.hits < object.hitsMax * .5)
                            || object.structureType == STRUCTURE_TOWER      && (object.hits < object.hitsMax)
                            || object.structureType == STRUCTURE_POWER_SPAWN && (object.hits < object.hitsMax * .5)
                            || object.structureType == STRUCTURE_EXTRACTOR   && (object.hits < object.hitsMax * .5)
                            || object.structureType == STRUCTURE_LAB        && (object.hits < object.hitsMax * .5)
                            || object.structureType == STRUCTURE_TERMINAL   && (object.hits < object.hitsMax * .5)
                            || object.structureType == STRUCTURE_NUKER      && (object.hits < object.hitsMax * .5)                        
                        );
                }});
            
            
            // move this block up one level
            //console.log(creep , toRepair)
            if (toRepair){
                creep.moveTo(toRepair);
                creep.repair(toRepair);
            } else {
                var targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                
                if(targets) {
                    
                    if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets);
                    }
                }
            }
                
                
                
            } else if(creep.memory.harvesting) {
                
                var sources = creep.pos.findClosestByRange(FIND_SOURCES);
                    
                if(creep.harvest(sources, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources);
                }
                
            } else {
                
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
                
            }
        }
        /*
        if(0 creep.room.name == 'W6N51' ){
            creep.moveTo(Game.flags.F_W6N51_03)
            
        } else {
            if(creep.room.controller) {
                if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(11, 7);
                }
            }
            
        }
        */
	}
};

module.exports = roleExplore