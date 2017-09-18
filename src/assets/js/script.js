/**
 * Created by niels on 3/16/2017.
 */
var lastsearch = "landscape";
var lastphoto;
var latitude;
var longitude;

var getphotohtml = function (photo, size) {
    imageurl = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_' + size + '.jpg';
    return '<img src="'+imageurl+'" alt="'+photo.title+'" title="'+photo.title+'" data-photoid="'+photo.id+'">';
};

var showsearchresults = function (data) {
    showpicturearray(data.photos.photo);
};

var showpicturearray = function(picturearray){
    var htmllocation = $('.content');
    htmllocation.html("");
    var picturesinarray = picturearray.length;
    for (i = 0; i < picturesinarray; i++) {
        var htmltag = getphotohtml(picturearray[i], "q");
        htmllocation.append(htmltag);
    }
};

var zoek = function () {
    var searchfield = $('#search').val();
    getimages(searchfield, showsearchresults);
    lastsearch = searchfield;
};

var showdetailpage = function (data) {
    var image = data.photo;
    var content = $('.content');
    //console.log(image);
    var name = image.owner.realname;
    if (name === ""){name = image.owner.username;}
    var html = getphotohtml(image,"z");
    html += "<p>title: "+image.title._content+"</p>" ;
    html += "<p>author: "+name+"</p>";
    html += "<button class='location' data-photoid='"+image.id+"' data-title='"+image.title._content+"' >see location</button>";
    html += "<button class='author' data-nsid='"+image.owner.nsid+"' data-username='"+name+"'>more from author</button>";
    content.html(html);
    $('header').html("<button class='backtosearch'>back</button>"+"<h1>Image: "+image.title._content+"</h1>");
    lastphoto = image.id;
};

var detailpage = function (e) {
    e.preventDefault();
    //console.log($(this).data("photoid"));
    getimageinfo($(this).data("photoid"), showdetailpage);
};

var gobacktosearch = function (e) {
  e.preventDefault();
  getimages(lastsearch, showsearchresults);
    $('header').html('<input type="text" title="search" name="search" id="search"><button id="searchbutton">search</button>');
};
var gobacktodetail = function (e) {
  e.preventDefault();
  getimageinfo(lastphoto, showdetailpage);
};

var geolocation = function (e) {
    e.preventDefault();
    $('.content').html("<div id='map'></div>");
    $('header').html("<h1>Location of image: "+$(this).data("title")+"</h1>"+"<button class='backtodetail'>back</button>");
    getimagelocation($(this).data("photoid"),showgeolocation);
};

var showgeolocation = function (data) {
    latitude = parseFloat(data.photo.location.latitude);
    longitude = parseFloat(data.photo.location.longitude);
    initMap();
};

var initMap = function() {
    var place = {lat: latitude, lng: longitude};
    console.log(place);
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: place
    });
    var marker = new google.maps.Marker({
        position: place,
        map: map
    });
};

var fromauthor = function (e) {
    e.preventDefault();
    getimagesfromuser($(this).data("nsid"), showsearchresults);
    $('h1').html("Pictures from: "+$(this).data("username"));
};

$(document).ready(function () {
    $('body').on('click','.content > img', detailpage)
        .on('click','#searchbutton',function (e) {
       e.preventDefault();
       zoek();
    })
        .on('keyup','input[type=text]',function (event) {
        if (event.keyCode === 13) {
            zoek();
        }
    })
        .on('click','.backtosearch',gobacktosearch)
        .on('click','.location',geolocation)
        .on('click','.author',fromauthor)
        .on('click','.backtodetail',gobacktodetail)
    ;
    getimages("landscape", showsearchresults);
});

