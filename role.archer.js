module.exports = {
    run: function(creep, n){
        
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        
        if(target) {
            if(creep.rangedMassAttack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                
                //delete Memory.vars[n].path
            }
            
        } else {
            
            creep.moveTo(33, 23);
            
        }
        
        /* else if ((Memory.vars[n].path.length == 0) && (Memory.vars[n].drain != 0)) {
            
            target = Game.flags.F_W6N52_00;
            
            Memory.vars[n].path = creep.pos.findPathTo(target, {maxOps: 200});
            
                if( !Memory.vars[n].path.length || !target.equalsTo(path[path.length - 1]) ) {
                    Memory.vars[n].path = creep.pos.findPathTo(target, {maxOps: 1000, ignoreDestructibleStructures: true});
                }
                
            if( Memory.vars[n].path.length ) {
                creep.move(Memory.vars[n].path[0].direction);
                Memory.vars[n].path.splice(0,1);
            }
            
        } else if (Memory.vars[n].path.length > 0){
            creep.move(Memory.vars[n].path[0].direction);
            Memory.vars[n].path.splice(0,1);
        }
        */
    }
};