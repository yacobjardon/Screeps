module.exports = {
    run: function(creep, n) {

        // Pickup droped energy nearby
        if (creep.carry.energy < creep.carryCapacity)
        {
            var energy = creep.pos.findInRange( FIND_DROPPED_ENERGY, 1 );
            
            if (energy.length) {
                creep.pickup(energy[0]);
            }
        }
        
        
        // Change the creep status/state
        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.memory.harvesting = true;
            creep.say('harvesting');
        } else if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.memory.harvesting = false;
            creep.say('repairing');
        } else if ( creep.memory.repairing ==  true && creep.memory.harvesting == true
                || creep.memory.repairing ==  false && creep.memory.harvesting == false ){
            creep.memory.repairing = false;
            creep.memory.harvesting = true;
            creep.say('harvesting');
        }
        
        if(!creep.memory.repairing){
            
            if(Memory.to_delete.length){
                
                var target = Game.getObjectById(String(Memory.to_delete[0]));
                
                if(target) {
                    if(creep.dismantle(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);    
                    }
                }
                
            } else {
                var sources = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ( ((structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > structure.storeCapacity * .1))
                               ||((structure.structureType == STRUCTURE_STORAGE ) && (structure.store[RESOURCE_ENERGY] > structure.storeCapacity * .01))
                        )
                }});
                
                if(creep.withdraw(sources, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources);
                }
            }
            
        } else {
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
                role = require('role.upgrader')
                role.run(creep)
            }
            
                // perhaps check the results again?
        } //else {
            // nothing to repair, let's do something else?
        //}

    }
};