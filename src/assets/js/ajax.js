/**
 * Created by niels on 3/16/2017.
 *
 */
var getimages = function (zoekterm, callback) {
    var gegevens = {
        method: "flickr.photos.search",
        text: zoekterm,
        sort: "interestingness-desc"
    };
    flickrajax(gegevens, callback);
};

var getimageinfo = function (photoid,callback) {
  var gegevens = {
      method: "flickr.photos.getInfo",
      photo_id: photoid
  };
    console.log("succes 01");
    flickrajax(gegevens,callback);
};

var flickrajax = function (gegevens, callback){
    gegevens.api_key = "b88c47533062084da794e0f0f815503e";
    gegevens.format = "json";
    gegevens.nojsoncallback = '1';
    $.ajax({
        type: "POST",
        url: "https://api.flickr.com/services/rest/",
        data: gegevens,
        dataType: "json"
    }).done(function (data, textStatus, jqXHR) {
        //console.log(data);
        if (data.stat == "ok") {
            console.log("succes 02");
            callback(data);
        }
        else {
            console.log("ERROR: bad responce from flickr");
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("ERROR: no responce from flickr");
    });
};