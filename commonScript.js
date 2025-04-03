const dataSheetID = "1FsSH2xQvFtbErHMD2DmYlU9Nfb_1Jch0sxMUfXHFSvY";
var sheetKey = "AIzaSyDbAMvetESCRm5z4IPjHlSofzXuZasbE7I";
var sheets = [];
var scripts = [];

window.sheetTitles = ["", "", ""];
window.netIdDatabase = {};
window.currentSection = -1;
window.sheetCount = 3;
window.sheetsLoaded = 0;

var sheetURL = (string, sheet) =>
    "https://sheets.googleapis.com/v4/spreadsheets/" + sheet + "/values/" + string + "?key=" + sheetKey;

$.get(sheetURL("DATA", dataSheetID), function (data) {
    
    try {
        sheets = data.values.slice(1,2)[0];
        sheets.shift();
        scripts = data.values.slice(2,3)[0];
        scripts.shift();

        sheets.forEach((element, index) => {

            $.get(sheetURL("DATA", element), function (data) {
                window.sheetTitles[index] += (data.values.slice(0, 1)[0][0]);
            });

            $.get(sheetURL("NETIDS", element), function (data) {
                var netIdData = data.values.slice(1);
                netIdData.forEach(element => window.netIdDatabase[element[0].toUpperCase()] = element[1]);
                window.sheetsLoaded++;

            });
        });
    }
    
    catch (e) {
        console.log(e);
        alert("Error loading data. Please wait a moment and refresh the page.");
    }
    
    
});


window.sendData = function(data) {

    if (window.netid == "tst0000") return;

    $.ajax({
        url: "https://script.google.com/macros/s/" + scripts[window.currentSection] + "/exec",
        method: "POST",
        dataType: "json",
        data: JSON.stringify(data)
    }).done(function() {
    }).fail(function() {
        alert("Failure to submit score. Contact instructor immediately.");
    });
    
    console.log("Sending data to Google Sheets, section " + window.currentSection + " : ", data);
    console.log("url: " + "https://script.google.com/macros/s/" + scripts[window.currentSection] + "/exec");
};
