module.exports = {
    
    run: function(){
    
        var towers = Game.spawns.S1.room.find(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER})
        for(var n in towers){
            

            var tower = towers[n];// = Game.getObjectById('57e33db75067b9fd2e8593c3');
        
            if(tower) {
            
                var hostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            
                if(hostile) {
                
                    tower.attack(hostile);
                
            } else {

                
                var toRepair = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(object){
                    return (
                        object.structureType    == STRUCTURE_ROAD        && (object.hits < object.hitsMax)
                        || object.structureType == STRUCTURE_EXTENSION   && (object.hits < object.hitsMax)
                        || object.structureType == STRUCTURE_CONTAINER   && (object.hits < object.hitsMax * .9)
                        || object.structureType == STRUCTURE_SPAWN       && (object.hits < object.hitsMax)
                        || object.structureType == STRUCTURE_STORAGE     && (object.hits < object.hitsMax)
                        || object.structureType == STRUCTURE_RAMPART     && (object.hits < 5000)
                        || object.structureType == STRUCTURE_WALL        && (object.hits < 10000)
                        || object.structureType == STRUCTURE_KEEPER_LAIR && (object.hits < object.hitsMax * .5)
                        || object.structureType == STRUCTURE_CONTROLLER  && (object.hits < object.hitsMax * .9)
                        || object.structureType == STRUCTURE_LINK        && (object.hits < object.hitsMax * .5)
                        || object.structureType == STRUCTURE_TOWER       && (object.hits < object.hitsMax)
                        || object.structureType == STRUCTURE_POWER_SPAWN && (object.hits < object.hitsMax * .5)
                        || object.structureType == STRUCTURE_EXTRACTOR   && (object.hits < object.hitsMax * .5)
                        || object.structureType == STRUCTURE_LAB         && (object.hits < object.hitsMax * .5)
                        || object.structureType == STRUCTURE_TERMINAL    && (object.hits < object.hitsMax * .5)
                        || object.structureType == STRUCTURE_NUKER       && (object.hits < object.hitsMax * .5)                        
                    );
                }});
        
                if(toRepair) {
                    tower.repair(toRepair);
                }
            } 
        }
            
        }
    }

    
    /*
    var hostiless = Game.rooms['E14N51'].find(FIND_HOSTILE_CREEPS);
    
    if(hostiles.length > 0) {
        var username = hostiles[0].owner.username;
        Game.notify(`User ${username} spotted in room ${roomName}`);
        var towers = Game.rooms[roomName].find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.attack(hostiles[0]));
    }
    */
    
};