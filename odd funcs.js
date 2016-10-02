Game.spawns.s1.createCreep( [WORK, CARRY, MOVE], 'Harvester1' );




Game.creeps.c1.memory.role = 'harvester';
Game.creeps.c1.memory.role = 'upgrader';
Game.creeps.c1.memory.role = 'builder';

Game.creeps.c1.memory.id = 1;


Game.spawns.s1.canCreateCreep([WORK, CARRY, MOVE], [name])
Game.spawns.s1.canCreateCreep([WORK, CARRY, MOVE], 'c2')

if(Game.spawns.s1.canCreateCreep([WORK, CARRY, MOVE], 'c1') == 0){
    Game.spawns.s1.createCreep( [WORK, CARRY, MOVE], 'c1' );
}



require('my_module').add_creep();