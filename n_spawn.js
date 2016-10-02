var spawn = {
    run: function(){
        
        for(var name in Memory.vars) {
            

            //var x = window["Memory"][creepEquip][3][Memory][vars][role];
            switch(Memory.vars[name].role) {
                    
                case 'harvester':
                    var equip = Memory.creepEquip[3].harvester;
                    break;
                case 'upgrader':
                    var equip = Memory.creepEquip[3].upgrader;
                    break;
                case 'builder':
                    var equip = Memory.creepEquip[3].builder;
                    break;
                case 'repair':
                    var equip = Memory.creepEquip[3].repair;
                    break;
                case 'transport':
                    var equip = Memory.creepEquip[3].transport;
                    break;
                case 'archer':
                    var equip = Memory.creepEquip[3].archer;
                    break;
                case 'sword':
                    var equip = Memory.creepEquip[3].sword;
                    break;
                case 'explore':
                    var equip = Memory.creepEquip[3].explore;
                    break;
                default:
                    console.log('Error, role not found!:  ', Memory.vars[name].role);
                    break;
            }
            
            
            if(Game.spawns.S1.canCreateCreep(  equip , String(Memory.vars[name].id)) == 0){
                if(Game.spawns.S1.createCreep( equip , String(Memory.vars[name].id))){
                    
                    console.log('spawn:  ', name, '  ', Memory.vars[name].role);
                    
                    Game.creeps[Memory.vars[name].id].memory.repairing  = false;
                    Game.creeps[Memory.vars[name].id].memory.building   = false;
                    Game.creeps[Memory.vars[name].id].memory.upgrading  = false;
                    Game.creeps[Memory.vars[name].id].memory.harvesting = true;
                }
            }
        }
        
        var rolen = 'harvester'
        var namen = 'randn'
        
        //console.log(Game.spawns.S1.canCreateCreep(  Memory.creepEquip[1].rolen , namen))
        
        this.spawn_new()
    },
    
    
    spawn_new: function(){
        
        for( var n in Memory.to_spawn ){
            
            var spn = Memory.to_spawn[n].spawn;
            var nme  = Memory.to_spawn[n].id;
            var rle = Memory.to_spawn[n].role;
            var lvl = Memory.to_spawn[n].lvl;
            var src = Memory.to_spawn[n].source;
            var drn = Memory.to_spawn[n].drain;
            
            
            
            switch( rle ) {
                    
                case 'harvester':
                    var equip = Memory.creepEquip[lvl].harvester;
                    break;
                case 'upgrader':
                    var equip = Memory.creepEquip[lvl].upgrader;
                    break;
                case 'builder':
                    var equip = Memory.creepEquip[lvl].builder;
                    break;
                case 'repair':
                    var equip = Memory.creepEquip[lvl].repair;
                    break;
                case 'transport':
                    var equip = Memory.creepEquip[lvl].transport;
                    break;
                case 'archer':
                    var equip = Memory.creepEquip[lvl].archer;
                    break;
                case 'sword':
                    var equip = Memory.creepEquip[lvl].sword;
                    break;
                case 'explore':
                    var equip = Memory.creepEquip[lvl].explore;
                    break;
                default:
                    console.log('Error, role not found!:  ', rle );
                    break;
            }

            
            if(Game.spawns.S1.canCreateCreep(  equip , nme) == 0){
                if(Game.spawns.S1.createCreep( equip , nme)){
                    
                    console.log('spawn new:  ', nme);
                    
                    Game.creeps[Memory.vars[name].id].memory.repairing  = false;
                    Game.creeps[Memory.vars[name].id].memory.building   = false;
                    Game.creeps[Memory.vars[name].id].memory.upgrading  = false;
                    Game.creeps[Memory.vars[name].id].memory.harvesting = true;
                    Game.creeps[Memory.vars[name].id].memory.idn        = Memory.vars.length;
                    
                    Memory.vars.push({id: nme, role: rle, source: src, drain: drn});
                    
                    Memory.to_spawn.splice(0, 1);
                }
            }
            
        }
    },
    
    
    //this function wil be used by the scheduler to line up the needed creeps to spawn
    que_new_creep: function(room_name, spawn_name, creep_name, creep_role, creep_level, creep_source, creep_drain){
        
        Memory.to_spawn.push({
            spawn:  String(spawn_name),
            id:     String(creep_name),
            role:   String(creep_role),
            lvl:    creep_level,
            source: creep_source,
            drain:  creep_drain
        })
        
        //Memory.to_spawn = ({spawn: 'S1', id: 'c6', role: 'harvester', lvl:1, source: 0, drain: 0})
    },
    
    kill_creep: function(creep, n){
        
        Memory.vars.splice(n,1);
        delete Memory.creeps.creep;
        eva(Game.creep.suicide());
    }
};

module.exports = spawn;


