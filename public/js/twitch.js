var users = "users/";
var streams = "streams/";
var http = "https://wind-bow.gomix.me/twitch-api/";
var stream;
var search;
var status;
var channels = ["ninja","rocketleague", "shroud","summit1g", "sodapoppin", "tsm_myth", "starcraft", "drdisrespectlive", "cdnthe3rd", "pokimane", "tsm_daequan", "highdistortion"];;
var channel;
var logo;
var streamsOnline = "";
var streamsOffline = "";

function onLoad() {
    for (var i = 0; i < channels.length; i++) {
        (function(i) {

            $.ajax({
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                dataType: 'jsonp',
                url: http + streams + channels[i],
                success: function(response1) {
                    var r = response1;
                    var stream = r.stream;

                    $.ajax({
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        dataType: 'jsonp',
                        url: http + users + channels[i],
                        success: function(response2) {
                            var r2 = response2;
                            var name = r2.display_name;
                            var logo = r2.logo;

                            neuesLi = document.createElement("li");

                            if (stream != null && name != undefined) {
                                neuesLi.innerHTML = "<div id='idChannels' class='jumbotron'><img target='_blank' src=" +
                                    logo + " class='cLogo'><a href='https://www.twitch.tv/" + name + "' target='_blank'><h3 id='idName'>" +
                                    name + "</h3></a><p id='idStatusC'>Currently Online</p><div id='idDot' style='background-color: green;'></div></div>";
                            } else if (stream == null && name != undefined) {
                                neuesLi.innerHTML = "<div id='idChannels' class='jumbotron'><img target='_blank' src=" +
                                    logo + " class='cLogo'><a href='https://www.twitch.tv/" + name + "' target='_blank'><h3 id='idName'>" +
                                    name + "</h3></a><p id='idStatusC'>Currently not Online</p><div id='idDot' style='background-color: red;'></div></div>";
                            } else {
                                neuesLi.innerHTML = "<div id='idChannels' class='jumbotron'><img target='_blank' src='https://zadroweb.com/wp-content/uploads/2013/07/page-not-found-300x270.jpg' class='cLogo'><h3 id='idName'>ERROR</h3></a><p id='idStatusC'>Channel " + channels[i] + " not found</p></div>";
                            }
                            $("#idListe").hide().append(neuesLi).fadeIn();
                        }
                    });
                }
            });
        })(i);
    };
};

function getApi() {
    search = $("#idSearch").val();

    if (search === "") {
        return alert("What are you searching for?");
    }

    $.ajax({
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        dataType: 'jsonp',
        url: http + streams + search,
        success: function(response1) {
            var r = response1;
            var stream = r.stream;

            $.ajax({
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                dataType: 'jsonp',
                url: http + users + search,
                success: function(response2) {
                    var r2 = response2;
                    var name = r2.display_name;
                    var logo = r2.logo;

                    if (stream != null && name != undefined) {
                        $("#idName").hide().html("<div id='idRes' class='jumbotron'><img target='_blank' src=" +
                                          logo + " class='cLogo'><a href='https://www.twitch.tv/" + name + "' target='_blank'><h3 id='idName'>" +
                                          name + "</h3></a><p id='idStatusC'>Currently Online</p><div id='idDot' style='background-color: green;'></div></div>").fadeIn();
                    } 
                    else if (stream == null && name != undefined) {
                        $("#idName").hide().html("<div id='idRes' class='jumbotron'><img target='_blank' src=" +
                                          logo + " class='cLogo'><a href='https://www.twitch.tv/" + name + "' target='_blank'><h3 id='idName'>" +
                                          name + "</h3></a><p id='idStatusC'>Currently not Online</p><div id='idDot' style='background-color: red;'></div></div>").fadeIn();
                    }
                    else {
                        $("#idName").hide().html("<div id='idRes' class='jumbotron'><img target='_blank' src='https://zadroweb.com/wp-content/uploads/2013/07/page-not-found-300x270.jpg' class='cLogo'><h3 id='idName'>ERROR</h3></a><p id='idStatusC'>Channel " + search + " not found</p></div>").fadeIn();
                    }
                }
            });
        }
    });
}


$(document).ready(function searchButton() {
    onLoad();
    $("#idButton").on("click", getApi);
    $("#idSearch").keypress(function(e) {
        if (e.which == 13) {
            $("#idButton").focus().click();
        }
    });
});