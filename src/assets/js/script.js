/**
 * Created by niels on 3/16/2017.
 */
var lastsearch = "landscape";

var getphotohtml = function (photo, size) {
    imageurl = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_' + size + '.jpg';
    return '<img src="'+imageurl+'" alt="'+photo.title+'" title="'+photo.title+'" data-photoid="'+photo.id+'">';
};

var toonzoekresultaten = function (data) {
    toonafbeeldingarray(data.photos.photo);
};

var toonafbeeldingarray = function(afbeeldingarray){
    var htmllocatie = $('.content');
    htmllocatie.html("");
    var aantalphotosoppagina = afbeeldingarray.length;
    for (i = 0; i < aantalphotosoppagina; i++) {
        var htmltag = getphotohtml(afbeeldingarray[i], "q");
        htmllocatie.append(htmltag);
    }
};

var zoek = function () {
    var zoekveld = $('#search').val();
    getimages(zoekveld, toonzoekresultaten);
    lastsearch = zoekveld;
};

var toondetailpagina = function (data) {
    var image = data.photo;
    var content = $('.content');
    //console.log(image);
    var naam = image.owner.realname;
    if (naam === ""){naam = image.owner.username;}
    var html = getphotohtml(image,"z");
    html += "<p>title: "+image.title._content+"</p>" ;
    html += "<p>author: "+naam+"</p>";
    html += "<button class='location' data-photoid='"+image.id+"' >see location</button>";
    html += "<button class='author' data-nsid='"+image.owner.nsid+"' data-username='"+naam+"'>more from author</button>";
    content.html(html);
    $('header').html("<button class='back'>back</button>"+"<h1>Image: "+image.title._content+"</h1>");
};

var detailpagina = function (e) {
    e.preventDefault();
    //console.log($(this).data("photoid"));
    getimageinfo($(this).data("photoid"), toondetailpagina);
};

var goback = function (e) {
  e.preventDefault();
  getimages(lastsearch, toonzoekresultaten);
    $('header').html('<input type="text" title="search" name="search" id="search"><button id="searchbutton">search</button>');
};

var geoloaction = function (e) {
    e.preventDefault();
    //ajax.js call
};

var fromauthor = function (e) {
    e.preventDefault();
    getimagesfromuser($(this).data("nsid"), toonzoekresultaten);
    $('h1').html("Pictures from: "+$(this).data("username"));
};

$(document).ready(function () {
    $('body').on('click','.content > img', detailpagina)
        .on('click','#searchbutton',function (e) {
       e.preventDefault();
       zoek();
    })
        .on('keyup','input[type=text]',function (event) {
        if (event.keyCode === 13) {
            zoek();
        }
    })
        .on('click','.back',goback)
        .on('click','.location',geoloaction)
        .on('click','.author',fromauthor)
    ;
    getimages("landscape", toonzoekresultaten);
});

