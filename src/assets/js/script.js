/**
 * Created by niels on 3/16/2017.
 */

var getphotohtml = function (photo, size) {
    imageurl = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_' + size + '.jpg';
    return '<img src="'+imageurl+'" alt="'+photo.title+'" title="'+photo.title+'" data-photoid="'+photo.id+'">';
};

var toonzoekresultaten = function (data) {
    console.log(data);
    var afbeeldingarray = data.photos.photo;
    var aantalphotosoppagina = afbeeldingarray.length;
    var htmllocatie = $('.content');
    htmllocatie.html("");
    for (i = 0; i < aantalphotosoppagina; i++) {
        var htmltag = getphotohtml(afbeeldingarray[i], "q");
        htmllocatie.append(htmltag);
    }
};

var toondetailpagina = function (data) {
    var image = data.photo;
    var content = $('.content');
    //console.log(image);
    var html = getphotohtml(image,"z");
    html += "<p>title: "+image.title._content+"</p>" ;
    html += "<p>author: "+image.owner.realname+"</p>";
    html += "<button class='.location'>see location</button>";
    html += "<button class='.author'>more from author</button>";
    content.html(html);
    $('header').html("<button class='.back'>back</button>");
};

var detailpagina = function (e) {
    e.preventDefault();
    //console.log($(this).data("photoid"));
    getimageinfo($(this).data("photoid"), toondetailpagina);
};

var goback = function (e) {
  e.preventDefault();
  getimages("tower", toonzoekresultaten);
};

$(document).ready(function () {
    $('.content').on('click','img', detailpagina);
    $('#searchbutton').on('click',function (e) {
       e.preventDefault();
       getimages($('#search').val(), toonzoekresultaten);
    });
    $('input[type=text]').keyup(function (event) {
        if (event.keyCode == 13) {
            getimages($('#search').val(), toonzoekresultaten);
        }
    });
    getimages("landscape", toonzoekresultaten);
});

