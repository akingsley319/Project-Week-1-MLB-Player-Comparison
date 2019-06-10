// Search API for PlayerID necessary to retrieve stats
class PlayerSearch{
    playerSearch(){
        // Grab user name input
        var playerInput = document.getElementById("player").value;
        var seasonInput = document.getElementById("season").value;
        var gameTypeInput = document.getElementById("gametype").value;

        // Link Construction
        let database = "http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='";
        let searchFunction = database.concat(playerInput, "%25'");

        // Attempt to Access Data
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){

                // Make data usable
                var data = JSON.parse(this.responseText);
               
                retrieveIdentification(data, seasonInput, gameTypeInput);
            }
        }
        xhr.open("GET", searchFunction, true);
        xhr.send();
    }
}

// Brings up Stats
class StatSearch{
    statSearch(identity){
        // Gather information for link construction
        var gameType = identity.gameType;
        var season = identity.season;
        var playerId = identity.playerID;

        // Link COnstruction
        let databaseGameType = "http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='";
        let databaseSeason = "'&season='";
        let databasePlayerID = "'&player_id='";
        let searchFunction = databaseGameType.concat(gameType, databaseSeason, season, databasePlayerID, playerId, "'");

        // Server Request
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                console.log("WOW");
                var data = JSON.parse(this.responseText);
                display(identity, data);
            }
        }

        // Open
        xhr.open("GET", searchFunction, true);
        xhr.send();
    }
}

// Used to retrieve player identification; in class PlayerSearch
function retrieveIdentification (data, season, gameType) {
    // Retrieve desired information (And Check if player is in database for desired year)
    var playerInfo = data.search_player_all.queryResults.row;
    if (playerInfo != null){
        var playerId = playerInfo.player_id;
        var firstName = playerInfo.name_use;
        var lastName = playerInfo.name_last;
        var fullName = firstName.concat(" ", lastName);

        var playerIden = {"playerID": playerId, "fullName": fullName, "season": season, "gameType": gameType};
        var statGather = new StatSearch().statSearch(playerIden);
    }
    else {
        var para = document.getElementById("feedback");
        para.textContent = "  Player Not Found"
    }
}

// used to prepare for display of information; in class Stat Search
function display(identity, data) {
    var hittingStats = data.sport_hitting_tm.queryResults.row;

    // Determine displayed information for game type
    if (identity.gameType == 'R'){
        var gameType = "Regular Season";
    } else if (identity.gameType = 'S'){
        var gameType = "SpringTraining";
    } else if (identity.gameType == 'W'){
        var gameType = "World Series"
    }

    // Check if player played in any games, or didn't have any at bats
    if (hittingStats == undefined){
        var para = document.getElementById("feedback");
        para.textContent = "  This Player Did Not Appear In Any Games"
        return false;
    }
    else if (hittingStats.g == undefined){
        var para = document.getElementById("feedback");
        para.textContent = "  No At Bats For This Player"
        return false
    }

    // organize all information to be displayed
    var displayInfo = [
        {"fullname": identity.fullName},
        {"gametype": gameType},
        {"season": identity.season},
        {"games": hittingStats.g},
        {"ab": hittingStats.ab},
        {"avg": hittingStats.avg},
        {"obp": hittingStats.obp},
        {"slg": hittingStats.slg},
        {"ops": hittingStats.ops},
        {"k": hittingStats.so},
        {"bb": hittingStats.bb}
    ];

    displayPlayer(displayInfo);
}