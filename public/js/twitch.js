var channels = ["wedc517", "ninja", "overwatchleague", "riot games", "lck1", "rocketleague", "shroud", "lck_korea", "unune", "gotaga", "simmit1g", "sodapoppin", "tsm_myth", "starcraft", "drdisrespectlive", "cdnthe3rd", "pokimane", "tsm_daequan", "highdistortion"];
var streamsOnline = "";
var streamsOffline = "";

$(document).ready(function () {

    for (i = 0; i < channels.length; i++) {
        var twitchOnline = "https://wind-bow.glitch.me/twitch-api/streams/" + channels[i];
        var twitchOffline = "https://wind-bow.glitch.me/twitch-api/channels/" + channels[i];

        $.getJSON(twitchOnline, function (json) {


            if (json["stream"] !== null) {
                var result = "<a class='redirect' target='blank' href='" + json['stream']['channel']['url'] + "'><div class='stream'><img src='" + json['stream']['channel']['logo'] +
                    "' alt='stream icon' class='preview m-2'>" + "<span class='channel-name'>" + json['stream']['channel']['display_name'] + "</span>" + " <br>" + json['stream']['channel']['status'] +
                    "<span class='game'><br> casting " + json['stream']['channel']['game'] + "</span>" + 
                    "<span class='status'><img class='red-dot' src='https://91b6be3bd2294a24b7b5-da4c182123f5956a3d22aa43eb816232.ssl.cf1.rackcdn.com/contentItem-290013-2844041-8c6v44yzypq7k-or.png'> " +
                     json['stream']['viewers'] + " viewers</span>" + "</div></a>";
                streamsOnline += result;
                $("#streams-online").html(streamsOnline);

            } else {
                $.getJSON(json['_links']['channel'] + "?client_id=7otw8pi9b4pitf9z27yw0seu7xog2v&", function (data) {
                    var result = "<a class='redirect' target='blank' href='" + data["url"] + "'><div class='stream'><img src='" + data['logo'] +
                        "' alt='stream icon' class='preview m-2'>" + "<span class='channel-name'>" + data['display_name'] + "</span>" + " <br>" + data['status'] +
                        "<span class='game'><br> last time casted " + data['game']  + "</span>" + "<span class='status'>Offline</span>" + "</div></a>";
                    streamsOffline += result;
                    $("#streams-offline").html(streamsOffline);
                });

            }

        });

    }

    $('#btn-offline').on("click", function() {
        $("#streams-online").html("");
        $("#streams-offline").html(streamsOffline);
    });

    $('#btn-online').on("click", function() {
        $("#streams-offline").html("");
        $("#streams-online").html(streamsOnline);
    });

    $('#btn-all').on("click", function() {
        $("#streams-online").html(streamsOnline);
        $("#streams-offline").html(streamsOffline);
    });


});