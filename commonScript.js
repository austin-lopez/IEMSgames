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
};

UIBar.destroy();


/* typewriter */
!function() {
    postrender.typewriter = function (b) {
        if (this.tags) {
            var r = new RegExp("t8n.typewriter.([0-9]+)(?:[^0-9]|$)","g");
            var t = r.exec(this.tags.toString());
            if (t) {
                typeout(b, t[1]+0);
            }
        }
        return b;
    };
    var typeout = function(c,t) {
        var Furl = function(current) {
            this.n = current;
            this.out = false;
            this.data = current.nodeValue;
            current.nodeValue = "";
            this.kids = [];
            var cn = current.childNodes;
            if (current.style && current.style.display=="none") {
                return;
            }
            while (cn.length>0) {
                var f = new Furl(cn[0]);
                current.removeChild(cn[0]);
                f.out = true;this.kids.push(f);
            }
        };
        var nodes = new Furl(c);
        var unfurl = function(furled,d) {
            var n = furled.n;
            if (furled.out) {
                d.appendChild(n);
                furled.out = false;
            }
            if (furled.data) {
                n.nodeValue += furled.data[0];
                furled.data = furled.data.slice(1);
                return true;
            }
            for (var j=0; j<furled.kids.length; j++) {
                var ret = unfurl(furled.kids[j],n);
                if (ret) {
                    return true;
                }
            }
            return false;
        };
        var title = passage();
        var intr = setInterval (
            function() {
                if (passage() == title && unfurl(nodes,null)) {
                    return;
                }
                clearInterval(intr);
            }
            ,t);
    };
}();


importStyles('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');