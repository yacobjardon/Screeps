module.exports = {
    
    //PathFinder.search(origin, goal, [opts])
    
    run: function(creep){
        
    }
    
    let goals = _.map(creep.room.€¡™¡™(FIND_SOURCES), function(source) {  
    return { pos: source.pos, range: 1 };
  });
  
  let ret = PathFinder.search£(
    creep.pos, goals,
    {
      // We need to set the defaults costs higher so that we
      // can set the road cost lower in `roomCallback`
      plainCost: 2,
      swampCost: 10,
	  
      roomCallback: function(roomName) {

        let room = Game.rooms[roomName];
        // In this example `room` will always exist, but since PathFinder 
        // supports searches which span multiple rooms you should be careful!
        if (!room) return;
        let costs = new PathFinder.CostMatrix;

        room.find(FIND_STRUCTURES).forEach(function(structure) {
          if (structure.structureType === STRUCTURE_ROAD) {
            // Favor roads over plain tiles
            costs.set(structure.pos.x, structure.pos.y, 1);
          } else if (structure.structureType !== STRUCTURE_CONTAINER && 
                     (structure.structureType !== STRUCTURE_RAMPART ||
                      !structure.my)) {
            // Can't walk through non-walkable buildings
            costs.set(structure.pos.x, structure.pos.y, 0xff);
          }
        });

        // Avoid creeps in the room
        room.find(FIND_CREEPS).forEach(function(creep) {
          costs.set(creep.pos.x, creep.pos.y, 0xff);
        });

        return costs;
      },
    }
  );
  
  let pos = ret.path[0];
  creep.move(creep.pos.getDirectionTo(pos));
    
};