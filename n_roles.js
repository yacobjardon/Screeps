var role_harvester  = require('role.harvester');
var role_upgrader   = require('role.upgrader');
var role_builder    = require('role.builder');
var role_repair     = require('role.repair');
var role_tower      = require('role.tower');
var role_transport  = require('role.transport');
var role_archer     = require('role.archer');
var role_sword      = require('role.sword');
var role_explore    = require('role.explore');



var roles = {
    run: function(){

        
        for(var n in Memory.vars) {
            
            if(Game.creeps[Memory.vars[n].id]){
                
                switch(Memory.vars[n].role) {
                    
                case 'harvester':
                    
                    //var role = 'role_' + String(Memory.vars[n].role);
                    //console.log(role)
                    //eval(role.run(Game.creeps[Memory.vars[n].id], n));
                    
                    role_harvester.run(Game.creeps[Memory.vars[n].id], n);
                    break;
                case 'upgrader':
                    role_upgrader.run(Game.creeps[Memory.vars[n].id], n);
                    break;
                case 'builder':
                    role_builder.run(Game.creeps[Memory.vars[n].id], n);
                    break;
                case 'repair':
                    role_repair.run(Game.creeps[Memory.vars[n].id], n);
                    break;
                case 'transport':
                    role_transport.run(Game.creeps[Memory.vars[n].id], n);
                    break;
                case 'archer':
                    role_archer.run(Game.creeps[Memory.vars[n].id], n);
                    break;
                case 'sword':
                    role_sword.run(Game.creeps[Memory.vars[n].id], n);
                    break;
                case 'explore':
                    role_explore.run(Game.creeps[Memory.vars[n].id], n);
                    break;
                default:
                    console.log('Error, role not found!');
                    break;
                }
                
            }
        }
        
        //for(  ) {
        //  
        //}
        
        role_tower.run();
        
    }
}

module.exports = roles;

