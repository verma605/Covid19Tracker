var getJSON = function(url, callback) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    
    xhr.onload = function() {
    
        var status = xhr.status;
        
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };
    
    xhr.send();
};

var summaryUrl="https://api.covid19api.com/summary";

getJSON(summaryUrl,  function(err, data) {
    
    if (err != null) {
        console.error(err);
    } else {

        console.log(data);

        var totalGlobalConfirmed = data.Global.TotalConfirmed;
        document.getElementById("tgcTemplate").innerHTML=totalGlobalConfirmed;
        
        var totalGlobalDeath= data.Global.TotalDeaths;
        document.getElementById("totalDeathsTemplate").innerHTML=totalGlobalDeath;     

        var totalGlobalRecovered= data.Global.TotalRecovered;
        document.getElementById("totalRecoveredTemplate").innerHTML=totalGlobalRecovered;

        
        var Countries= data.Countries;
        var length=Countries.length;

        console.log(length);

        //Creating a Dynamic table below for data

        var table='';
        var rows=length-1;
        var cols=3;

        for( var r=0; r<=rows; r++)
        {
            table+='<tr>';

                table+= '<td>'+Countries[r].Country+'</td>';
                table+= '<td>'+Countries[r].NewConfirmed+'</td>';
                table+= '<td>'+Countries[r].NewDeaths+'</td>';
                table+= '<td>'+Countries[r].NewRecovered+'</td>';
                table+= '<td>'+Countries[r].TotalConfirmed+'</td>';
                table+= '<td>'+Countries[r].TotalDeaths+'</td>';
                table+= '<td>'+Countries[r].TotalRecovered+'</td>';

            table+='</tr>';
        }

        //console.log(table);


        document.getElementById('tableTemplate').innerHTML=table;
    }
});