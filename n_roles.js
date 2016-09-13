var roleHarvester   = require('role.harvester');
var roleUpgrader    = require('role.upgrader');
var roleBuilder     = require('role.builder');
var roleRepair      = require('role.repair');

var roles = {
    run: function(){
        
        for(var name in Memory.vars) {
            if(Game.creeps[Memory.vars[name].id]){
                //console.log(name);
                switch(Memory.vars[name].role) {
                case 'harvester':
                    roleHarvester.run(Game.creeps[Memory.vars[name].id]);
                    break;
                case 'upgrader':
                    roleUpgrader.run(Game.creeps[Memory.vars[name].id]);
                    break;
                case 'builder':
                    roleBuilder.run(Game.creeps[Memory.vars[name].id]);
                    break;
                case 'repair':
                    roleRepair.run(Game.creeps[Memory.vars[name].id]);
                    break;
                default:
                    console.log('Error, role not found!');
                    break;
                }
            }
        }
    }
}

module.exports = roles;

