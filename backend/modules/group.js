var gDB = [];
var nextID = 0;

// Utils
function removeObjectWithId(arr, id) {
  const objWithIdIndex = arr.findIndex((obj) => obj.id === id);

  if (objWithIdIndex > -1) {
    arr.splice(objWithIdIndex, 1);
  }

  return arr;
}

/*
group: {
    display_name: string,
    users: [{
        user: id,
        contribution: float
    }],
    amount: float,
    id: int
}
*/
function getGroup(id){
    for(var i = 0; i < gDB.length; i++){
        if(gDB[i].id == id) return gDB[i];
    }
    return -1;
}

// Aconsegueix info principal del grup i info del userID
function CreateGroup(info, userID){
    gDB.push({
        "display_name": info.display_name,
        "users": [{
            "id": userID,
            "contribution": 0,
        }],
        "amount": info.amount,
        "id": nextID
    });
    nextID += 1;

    return nextID - 1;
}

// Afegeix user a un grup amb una contribució principal
function addUserToGroup(userID, group, initialContribution){
    group.users.push({
        "userID": userID,
        "contribution": initialContribution,
    });
}

function getGroupUser(userID, group){
    if(!group.users) return -1;
    for(var i = 0; i < group.users.length; i++){
        if(group.users[i].id == userID){
            return groups.users[i];
        }
    }
    return -1;
}

// Fixa la contribució d'un usuari al grup
function SetUserGroupContribution(userID, groupID, contribution){
    var group = getGroup(groupID);

    if(getGroupUser(userID, group) == -1){
        console.log(group)
        addUserToGroup(userID, group, contribution);
    } else {
        getGroupUser(userID, group).contribution = contribution;
    }
}

function RemoveUserFromGroup(userID, groupID){
    var group = getGroup(groupID);

    if(getGroupUser(userID, group) == -1) return 0;

    for(var i = 0; i < group.users.length; i++){
        if(groups.users[i].id == userID){
            removeObjectWithId(group.users, i);
        }
    }
}

function GetUserGroupContribution(userID, groupID){
    var group = getGroup(groupID);

    var user = getGroupUser(userID, group);
    if(user == -1){
        return 0;
    }
    return user.contribution; 
}

function GetRemaining(groupID){
    var group = getGroup(groupID);

    var r = group.amount;
    for(var i = 0; i < group.users.length; i++){
        r -= group.users[i].contribution;
    }

    return r;
}

function GetGroupContributions(groupID){
    var r = [];
    var group = getGroup(groupID);

    for(var i = 0; i < group.users.length; i++){
        r.push(group.users[i]);
    }

    return r;
}

module.exports.db = gDB;

module.exports.CreateGroup = CreateGroup;
module.exports.SetUserGroupContribution = SetUserGroupContribution;
module.exports.RemoveUserFromGroup = RemoveUserFromGroup;
module.exports.GetUserGroupContribution = GetUserGroupContribution;
module.exports.GetGroupContributions = GetGroupContributions;
module.exports.GetRemaining = GetRemaining;
