var init = {
    run: function(){
        if(typeof Memory.init !== 'boolean'){
            console.log('***Memory.init set to invaild value***\n      ***Will auto initilize***');
            Memory.init = false;
        }
        
        if(Memory.init == false){
            this.init_vars();
            this.init_rooms();
            this.init_flags();
            Memory.init = true;
        }
        
    },
    
    init_vars: function(){
        
            delete Memory.vars;
            
            Memory.paths = [];
            Memory.vars  = [
                                c00 = {id: 'c0', role: 'harvester', source:0x0, drain:0x0}
                           ];
            
            Memory.creepEquip = [
                
                l0 = {
                    harvester   : [ WORK, CARRY, MOVE ],
                    builder     : [ WORK, CARRY, MOVE ],
                    upgrader    : [ WORK, CARRY, MOVE ],
                    repair      : [ WORK, CARRY, MOVE ],
                    transport   : [ WORK, CARRY, MOVE ],
                    archer      : [ RANGED_ATTACK, RANGED_ATTACK, MOVE ],
                    sword       : [ ATTACK, TOUGH, MOVE ],
                    explore     : [ MOVE, MOVE, CLAIM ]
                },
                    
                l1 = {
                    harvester   : [ WORK,   WORK, WORK,   CARRY, MOVE ],
                    builder     : [ WORK,   WORK, CARRY,  CARRY, MOVE ],
                    upgrader    : [ WORK,   WORK, CARRY,  CARRY, MOVE ],
                    transport   : [ CARRY, CARRY, CARRY,  MOVE,  MOVE ],
                    repair      : [ WORK,   WORK, CARRY,  CARRY, MOVE ],
                    archer      : [ RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, TOUGH, MOVE ],
                    sword       : [ ATTACK, ATTACK, TOUGH, TOUGH, MOVE, MOVE ],
                    explore     : [ MOVE, MOVE, CLAIM, CLAIM ]
                },
                    
                l2 = {
                    harvester   : [ WORK,  WORK,  WORK,  WORK,  WORK, CARRY, MOVE ],
                    builder     : [ WORK,  WORK,  CARRY, CARRY, MOVE, MOVE ],
                    upgrader    : [ WORK,  WORK,  CARRY, CARRY, MOVE, MOVE ],
                    transport   : [ CARRY, CARRY, CARRY, CARRY, MOVE, MOVE ],
                    repair      : [ WORK,  WORK,  CARRY, CARRY, MOVE ],
                    archer      : [ RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, TOUGH, MOVE ],
                    sword       : [ ATTACK, ATTACK, ATTACK, TOUGH, TOUGH, MOVE, MOVE ],
                    explore     : [ MOVE, MOVE, MOVE, CLAIM, CLAIM ]
                }
            ]

            Memory.vars_init = true;
            console.log('Vars loaded');   
    },
    
    init_rooms: function(){
        
        //Game.rooms
        Memory.rooms = {};
        
        Memory.rooms_init = true;
        console.log('rooms loaded');
    },
    
    init_flags: function(){
        //Game.flags
        Memory.flags_init = true;
        console.log('flags loaded');
    }
};

module.exports = init;