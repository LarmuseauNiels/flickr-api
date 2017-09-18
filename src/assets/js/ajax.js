/**
 * Created by niels on 3/16/2017.
 */
var getimages = function(zoekterm, callback) {
  var gegevens = {
    method: "flickr.photos.search",
    text: zoekterm,
    sort: "interestingness-desc"
  };
  flickrajax(gegevens, callback);
};
var getimageinfo = function(photoid, callback) {
  var gegevens = {
    method: "flickr.photos.getInfo",
    photo_id: photoid
  };
  flickrajax(gegevens, callback);
};
var getimagelocation = function(photoid, callback) {
  var gegevens = {
    method: "flickr.photos.geo.getLocation",
    photo_id: photoid
  };
  flickrajax(gegevens, callback);
};
var getimagesfromuser = function(userid, callback) {
  var gegevens = {
    method: "flickr.people.getPublicPhotos",
    user_id: userid
  };
  flickrajax(gegevens, callback);
};
var flickrajax = function(gegevens, callback) {
  gegevens.api_key = "b88c47533062084da794e0f0f815503e";
  gegevens.format = "json";
  gegevens.nojsoncallback = '1';
  $.ajax({
    type: "POST",
    url: "https://api.flickr.com/services/rest/",
    data: gegevens,
    dataType: "json"
  }).done(function(data, textStatus, jqXHR) {
    //console.log(data);
    if (data.stat === "ok") {
      callback(data);
    } else if (data.message === "Photo has no location information.") {
      $('#map').html("<h2>Photo has no location information.</h2>");
    } else {
      console.log("ERROR: bad responce from flickr");
      console.log(data);

    }
  }).fail(function(jqXHR, textStatus, errorThrown) {
    console.log("ERROR: no responce from flickr");
  });
};
