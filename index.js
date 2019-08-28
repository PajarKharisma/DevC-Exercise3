//https://swapi.co/api/planets/?format=json
let data = [];

function getData(key, val) {
    datas = []
    datas.push("<tr>");
    datas.push("<td id='"+ key +"'>"+ val.name +"</td>");
    datas.push("<td id='"+ key +"'>"+ val.rotation_period +"</td>");
    datas.push("<td id='"+ key +"'>"+ val.orbital_period +"</td>");
    datas.push("<td id='"+ key +"'>"+ val.diameter +"</td>");
    datas.push("</tr>")
    
    return datas
}

function loadData() {
    limit = $('#filter').val();
    var items = [];
    //$("#badan tr").remove();
    $.each(data, function(key, val){
        switch (limit) {
            case '0':
                items.push(getData(key, val));
            break;
            case '1':
                if(val.rotation_period >= 20){
                    items.push(getData(key, val));
                }
            break;
            default:
                if(val.rotation_period < 20){
                    items.push(getData(key, val));
                }
            break;
        }
    });
    
    $('#badan').html(items.join(""));
    //$(items.join("")).appendTo("#badan");
}

function loadJson() {
    var datajson = (function () {
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': 'https://raw.githubusercontent.com/PajarKharisma/DevC-Exercise3/master/data.json',
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
        return json;
    })();
    return datajson;
}


$(document).ready(function(){
    data = loadJson().results;
    loadData();
});

$("#filter").change(function(){
    loadData();
});