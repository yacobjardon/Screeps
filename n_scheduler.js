//This function should check what needs to be done and
// assigns aproperate units to do such. Several generic
// classes chould be made (ie if no building to repair
// then build, if no building then harvest)

// to keep cpu usage low:
//    -cache paths between key points
//    -find building needed to be fixed
//    -use as few creeps as can, -> use big creeps!
//    -have storage units next to sources (for miners to dump in)
//    -miners dont move, just mine
//    -enery transport move, dont mine
//    -early game generic units are ok

//    -don't need to check everything each tick! (try not to completly fill stuff, ie 90%)

// this function determines what needs to be done, and chooses who to do it!
// TODO: everything!!

module.exports = {
    run: function(){
        
        //Memory.rooms[];
        
        
        var hostiles = Game.rooms.W6N51.find(FIND_HOSTILE_CREEPS);
        
        if(hostiles.length){
            
        } else {
            
        }

        //defense
        
        return;
    }
};

/*

var targetRoomName = "E13S8";
var targetPos = new RoomPosition(10,10, targetRoomName);
Urist.moveTo(targetPos);
*/