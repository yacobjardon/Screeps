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
        }
        
    },
    
    init_vars: function(){
        
            delete Memory.vars;
            Memory.builds = [
                
                num_required = {
                num_energy      :   2,  //collects energy and returns to spawns
                num_mineral     :   0,  //collects minerals
                num_transport   :   0,  //saves the miners the need to move
                num_builder     :   2,  //builds and repairs structures
                num_upgrader    :   1,  //upgrades conroller
                num_sword       :   0,  //melee unit
                num_archer      :   0  //ranged unit
            },
                creepEquip = {
                equip_energy    :   ['WORK', 'CARRY', 'MOVE'],
                equip_mineral   :   ['WORK', 'CARRY', 'MOVE'],
                equip_builder   :   ['WORK', 'CARRY', 'MOVE'],
                equip_upgrader  :   ['WORK', 'CARRY', 'MOVE'],
                equip_sword     :   ['ATTACK', 'TOUGH', 'MOVE'],
                equip_archer    :   ['RANGED_ATTACK', 'RANGED_ATTACK', 'MOVE']
            },
                creepType       =   { ener:0 , mine:1 , tran:2 , buil:3 , upgr:4 , swor:5 , arch:6},
                creepState      =   { active:0 , spg:1 , dead:2 },
                creepPop        =   [ this.creepState , this.creepType, this.creepEquip ],
                //creepList     =   [],
// use the cpu demands to determine how the game should behave
//  ie, how big to make units
                gameLevel      =   [4, 16, 64, 256],
                currLevel      =    0
            ];
            
            Memory.paths = [];
            Memory.vars  = [ 
                                c00 = {id: 'c0', role: 'harvester', source:0x0, drain:0x0},
                                c01 = {id: 'c1', role: 'upgrader',  source:0x0, drain:0x0}, // this list should be managed by the schedualer
                                c02 = {id: 'c2', role: 'repair',    source:0x0, drain:0x0}, // and populated by the spawner
                                c03 = {id: 'c3', role: 'repair',    source:0x0, drain:0x0}, // both the schedulaer and spawner should be controlled
                                c04 = {id: 'c4', role: 'repair',    source:0x0, drain:0x0}, //  by the optimizer (or manualy)
                                c05 = {id: 'c5', role: 'upgrader',  source:0x0, drain:0x0},
                                c06 = {id: 'c6', role: 'upgrader',  source:0x0, drain:0x0},
                                c07 = {id: 'c7', role: 'harvester', source:0x0, drain:0x0}
                            ];
            
            Memory.creepEquip = {
                harvester   :   [ 
                                  ['WORK', 'CARRY', 'MOVE'],
                                  ['WORK', 'WORK', 'CARRY', 'CARRY', 'MOVE'],
                                  ['WORK', 'WORK', 'WORK', 'WORK', 'WORK', 'CARRY', 'MOVE'],
                                  ['WORK', 'WORK', 'WORK', 'WORK', 'WORK', 'WORK', 'CARRY', 'CARRY', 'CARRY', 'MOVE', 'MOVE']
                            ],
                mineral     :   [
                                  ['WORK', 'CARRY', 'MOVE'],
                                  [],
                                  [],
                                  []
                                ],
                builder     :   [
                                  ['WORK', 'CARRY', 'MOVE'],
                                  [],
                                  [],
                                  []
                                ],
                upgrader    :   [
                                  ['WORK', 'CARRY', 'MOVE'],
                                  [],
                                  [],
                                  []
                                ],
                'repair'    :   [
                                  ['WORK', 'CARRY', 'MOVE'],
                                  ['WORK', 'WORK', 'CARRY', 'CARRY', 'MOVE'],
                                  ['WORK', 'WORK', 'CARRY', 'CARRY', 'MOVE', 'MOVE'],
                                  ['WORK', 'WORK', 'CARRY', 'WORK', 'CARRY', 'CARRY', 'MOVE', 'MOVE']
                                ],
                archer      :   [
                                  ['RANGED_ATTACK', 'RANGED_ATTACK', 'MOVE'],
                                  ['RANGED_ATTACK', 'RANGED_ATTACK', 'MOVE'],
                                  ['RANGED_ATTACK', 'RANGED_ATTACK', 'MOVE'],
                                  ['RANGED_ATTACK', 'RANGED_ATTACK', 'MOVE']
                                ]
            }
            
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