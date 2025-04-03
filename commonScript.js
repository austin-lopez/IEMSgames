const dataSheetID = "1FsSH2xQvFtbErHMD2DmYlU9Nfb_1Jch0sxMUfXHFSvY";
var sheetKey = "AIzaSyDbAMvetESCRm5z4IPjHlSofzXuZasbE7I";
var sheets = [];
var scripts = [];

window.sheetTitles = ["", "", ""];
window.netIdDatabase = {};
window.currentSection = -1;
window.sheetCount = 3;
window.sheetsLoaded = 0;

UIBar.destroy();

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



/*! <<numberpool>> macro set for SugarCube v2 */
!function(){"use strict";if("undefined"==typeof version||void 0===version.title||"SugarCube"!==version.title||void 0===version.major||version.major<2||void 0===version.minor||version.minor<22)throw new Error("<<numberpool>> macro set requires SugarCube 2.22.0 or greater, aborting load");Macro.add("numberinput",{handler:function(){function validateAndApply(el,addend){var curValue=Math.trunc(State.getVar(varName)),newValue=Math.trunc(el.value),newPoolValue=null;if(Number.isNaN(newValue)||!Number.isFinite(newValue))return el.value=curValue,!1;if(null!=addend&&(newValue+=addend),newValue<minValue?newValue=minValue:newValue>maxValue&&(newValue=maxValue),null!==pool){var poolValue=pool.get(),delta=(newValue-curValue)*poolCost;delta<0?newPoolValue=poolValue-delta:delta>0&&poolValue>=poolCost?(poolValue<delta&&(newValue=curValue+Math.trunc(poolValue/poolCost),delta=poolValue-poolValue%poolCost),newPoolValue=poolValue-delta):newValue=curValue}return State.setVar(varName,newValue),el.value=newValue,null!==newPoolValue&&pool.set(newPoolValue),!0}var _this=this;if(this.args.length<4){var errors=[];return this.args.length<1&&errors.push("variable name"),this.args.length<2&&errors.push("default value"),this.args.length<3&&errors.push("min value"),this.args.length<4&&errors.push("max value"),this.error("no "+errors.join(" or ")+" specified")}if("string"!=typeof this.args[0])return this.error("variable name argument is not a string");var varName=this.args[0].trim();if("$"!==varName[0]&&"_"!==varName[0])return this.error('variable name "'+this.args[0]+'" is missing its sigil ($ or _)');var varId=Util.slugify(varName),defValue=Number(this.args[1]),minValue=Number(this.args[2]),maxValue=Number(this.args[3]),poolCost=1,autofocus=!1;if(this.args.length>5?(poolCost=Number(this.args[4]),autofocus="autofocus"===this.args[5]):this.args.length>4&&("autofocus"===this.args[4]?autofocus=!0:poolCost=Number(this.args[4])),Number.isNaN(defValue)||!Number.isFinite(defValue)||Math.trunc(defValue)!==defValue)return this.error("default value ("+this.args[1]+") is not a whole number");if(Number.isNaN(minValue)||!Number.isFinite(minValue)||Math.trunc(minValue)!==minValue)return this.error("min value ("+this.args[2]+") is not a whole number");if(Number.isNaN(maxValue)||!Number.isFinite(maxValue)||Math.trunc(maxValue)!==maxValue)return this.error("max value ("+this.args[3]+") is not a whole number");if(Number.isNaN(poolCost)||!Number.isFinite(poolCost)||Math.trunc(poolCost)!==poolCost||poolCost<=0)return this.error("pool cost ("+this.args[4]+") is not a whole number greater than zero");if(defValue<minValue)return this.error("default value ("+this.args[1]+") is less than min value ("+this.args[2]+")");if(defValue>maxValue)return this.error("default value ("+this.args[1]+") is greater than max value ("+this.args[3]+")");var pool=function(){var parent=_this.contextSelect(function(ctx){return"numberpool"===ctx.name});return null!==parent&&parent.hasOwnProperty("pool")?parent.pool:null}();Config.debug&&this.debugView.modes({block:!0});var $elControl=jQuery(document.createElement("div")),$elInput=jQuery(document.createElement("input"));$elControl.attr("id",this.name+"-body-"+varId).addClass("macro-"+this.name).appendTo(this.output),jQuery(document.createElement("button")).attr({id:this.name+"-minus-"+varId}).text("").ariaClick(this.createShadowWrapper(function(){return validateAndApply($elInput.get(0),-1)})).appendTo($elControl),$elInput.attr({id:this.name+"-input-"+varId,name:this.name+"-input-"+varId,type:"text",pattern:"\\d+",tabindex:0}).on("change",this.createShadowWrapper(function(){validateAndApply(this)})).on("keypress",function(ev){13===ev.which&&(ev.preventDefault(),$elInput.trigger("change"))}).appendTo($elControl),jQuery(document.createElement("button")).attr({id:this.name+"-plus-"+varId}).text("").ariaClick(this.createShadowWrapper(function(){return validateAndApply($elInput.get(0),1)})).appendTo($elControl),$elInput.val(defValue),validateAndApply($elInput.get(0)),autofocus&&($elInput.attr("autofocus","autofocus"),jQuery(document).one(":passagedisplay",function(){return setTimeout(function(){return $elInput.focus()},Engine.minDomActionDelay)}))}}),Macro.add("numberpool",{tags:["onchange"],handler:function(){if(0===this.args.length)return this.error("no variable name specified");if(this.payload.length>2)return this.error("multiple <<onchange>> sections specified");if("string"!=typeof this.args[0])return this.error("variable name argument is not a string");var varName=this.args[0].trim();if("$"!==varName[0]&&"_"!==varName[0])return this.error('variable name "'+this.args[0]+'" is missing its sigil ($ or _)');var curValue=State.getVar(varName);if("number"!=typeof curValue||Number.isNaN(curValue)||!Number.isFinite(curValue))return this.error("pool value is not a number");var varId=Util.slugify(varName);TempState.hasOwnProperty(this.name)||(TempState[this.name]={}),TempState[this.name].hasOwnProperty(varId)||(TempState[this.name][varId]=0),Object.defineProperty(this,"pool",{value:Object.defineProperties({},{get:{value:function(){return State.getVar(varName)}},set:{value:function(content){return function(value){value!==State.getVar(varName)&&(State.setVar(varName,value),content&&new Wikifier(null,content))}}(this.payload.length>1?this.payload[1].contents.trim():"")}})}),jQuery(document.createElement("div")).attr("id",this.name+"-"+varId+"-"+TempState[this.name][varId]++).addClass("macro-"+this.name).wiki(this.payload[0].contents.replace(/^\n/,"")).appendTo(this.output)}}),Macro.add("numberslider",{handler:function(){function stepValidate(value){if(fracDigits>0){var ma=Number(minValue+"e"+fracDigits),sa=Number(stepValue+"e"+fracDigits),_va=Number(value+"e"+fracDigits)-ma;return Number(_va-_va%sa+ma+"e-"+fracDigits)}var va=value-minValue;return va-va%stepValue+minValue}function validateAndApply(el){var curValue=State.getVar(varName),newValue=Number(el.value),newPoolValue=null;if(Number.isNaN(newValue)||!Number.isFinite(newValue))return el.value=curValue,!1;if(newValue=stepValidate(newValue),newValue<minValue?newValue=minValue:newValue>maxValue&&(newValue=maxValue),null!==pool)if(fracDigits>0){var pa=Number(pool.get()+"e"+fracDigits),ca=Number(curValue+"e"+fracDigits),na=Number(newValue+"e"+fracDigits),delta=na-ca;pa<delta&&(na-=delta-pa,delta=na-ca,newValue=Number(na+"e-"+fracDigits)),newPoolValue=Number(pa-delta+"e-"+fracDigits)}else{var poolValue=pool.get(),_delta=newValue-curValue;poolValue<_delta&&(newValue-=_delta-poolValue,_delta=newValue-curValue),newPoolValue=poolValue-_delta}return State.setVar(varName,newValue),el.value=newValue,null!==newPoolValue&&pool.set(newPoolValue),!0}var _this2=this;if(this.args.length<5){var errors=[];return this.args.length<1&&errors.push("variable name"),this.args.length<2&&errors.push("default value"),this.args.length<3&&errors.push("min value"),this.args.length<4&&errors.push("max value"),this.args.length<5&&errors.push("step value"),this.error("no "+errors.join(" or ")+" specified")}if("string"!=typeof this.args[0])return this.error("variable name argument is not a string");var varName=this.args[0].trim();if("$"!==varName[0]&&"_"!==varName[0])return this.error('variable name "'+this.args[0]+'" is missing its sigil ($ or _)');var varId=Util.slugify(varName),defValue=Number(this.args[1]),minValue=Number(this.args[2]),maxValue=Number(this.args[3]),stepValue=Number(this.args[4]),autofocus=this.args.length>5&&"autofocus"===this.args[5];if(Number.isNaN(defValue)||!Number.isFinite(defValue))return this.error("default value ("+this.args[1]+") is not a number");if(Number.isNaN(minValue)||!Number.isFinite(minValue))return this.error("min value ("+this.args[2]+") is not a number");if(Number.isNaN(maxValue)||!Number.isFinite(maxValue))return this.error("max value ("+this.args[3]+") is not a number");if(Number.isNaN(stepValue)||!Number.isFinite(stepValue)||stepValue<=0)return this.error("step value ("+this.args[4]+") is not a number greater than zero");if(defValue<minValue)return this.error("default value ("+this.args[1]+") is less than min value ("+this.args[2]+")");if(defValue>maxValue)return this.error("default value ("+this.args[1]+") is greater than max value ("+this.args[3]+")");var fracDigits=function(){var str=String(stepValue),pos=str.lastIndexOf(".");return-1===pos?0:str.length-pos-1}();if(stepValidate(maxValue)!==maxValue)return this.error("max value ("+this.args[3]+") is not a multiple of the step value ("+this.args[4]+") plus the min value ("+this.args[2]+")");var pool=function(){var parent=_this2.contextSelect(function(ctx){return"numberpool"===ctx.name});return undefined !== parent && null !== parent && parent.hasOwnProperty("pool") ? parent.pool : null}();Config.debug&&this.debugView.modes({block:!0});var $elControl=jQuery(document.createElement("div")),$elInput=jQuery(document.createElement("input")),$elValue=void 0,showValue=void 0;$elControl.attr("id",this.name+"-body-"+varId).addClass("macro-"+this.name).appendTo(this.output),$elInput.attr({id:this.name+"-input-"+varId,name:this.name+"-input-"+varId,type:"range",min:minValue,max:maxValue,step:stepValue,tabindex:0}).on("change input."+Util.slugify(this.name),this.createShadowWrapper(function(){validateAndApply(this),"function"==typeof showValue&&showValue()})).on("keypress",function(ev){13===ev.which&&(ev.preventDefault(),$elInput.trigger("change"))}).appendTo($elControl),!Browser.isIE||Browser.ieVersion>9?($elValue=jQuery(document.createElement("span")).attr("id",this.name+"-value-"+varId).appendTo($elControl),showValue=function(){$elValue.text(Number($elInput.val()).toFixed(fracDigits))}):$elInput.off("input."+Util.slugify(this.name)),$elInput.val(defValue),validateAndApply($elInput.get(0)),"function"==typeof showValue&&showValue(),autofocus&&($elInput.attr("autofocus","autofocus"),jQuery(document).one(":passagedisplay",function(){return setTimeout(function(){return $elInput.focus()},Engine.minDomActionDelay)}))}})}();
