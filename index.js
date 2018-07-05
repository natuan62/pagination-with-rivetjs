function loadXMLDoc(dname) {
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", dname, false);
    xhttp.send();
    return xhttp.responseXML;
}
var xmlDoc1 = loadXMLDoc("http://"); // XML
var x2js = new X2JS();
var jsonObj1 = x2js.xml2json(xmlDoc1); // Convert XML to JSON

var items = jsonObj1;

events = {
    prevPage: function (e, model) {
        var numPages = Math.ceil(model.data.length / model.limit);
        model.items = [];
        if (model.current_page > 1) {
            model.current_page--;
            
            if (model.current_page < 1) model.current_page = 1;
            if (model.current_page > numPages) model.current_page = numPages;
            for (var i = (model.current_page - 1) * model.limit; i < (model.current_page * model.limit) && i < model.data.length; i++){
                model.items.push(model.data[i]);
                
            }

            if (model.current_page == 1) {
                document.getElementById("btn-prev").disabled = true;

            } else {
                document.getElementById("btn-prev").disabled = false;

            }
        
            if (model.current_page == numPages) {
                document.getElementById("btn-next").disabled = true;
                
            } else {
                document.getElementById("btn-next").disabled = false;
            }

        }
    },

    nextPage: function (e, model) {
        var numPages = Math.ceil(model.data.length / model.limit);
     
        model.items = [];
        if (model.current_page < numPages) {
            model.current_page++;

            if (model.current_page < 1) model.current_page = 1;
            if (model.current_page > numPages) model.current_page = numPages;
            for (var i = (model.current_page - 1) * model.limit; i < (model.current_page * model.limit) && i < model.data.length; i++){
                model.items.push(model.data[i]);
                
            }

           if (model.current_page == 1) {
                document.getElementById("btn-prev").disabled = true;

            } else {
                document.getElementById("btn-prev").disabled = false;

            }
        
            if (model.current_page == numPages) {
                document.getElementById("btn-next").disabled = true;
                
            } else {
                document.getElementById("btn-next").disabled = false;
            }
        }
      
    }
}

rivets.bind(document.querySelector('#binding-news'), {
    items: items,
    data: jsonObj1,
    current_page: 1,
    limit: 6,
    controller: events
});
