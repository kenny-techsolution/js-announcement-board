/*************************************************
 * Time-Based Redirection
 *************************************************/

//modify this section to match your requirement.
var redirected_url = "http://www.yahoo.com";
var switch_time = new Date();
switch_time.setHours(20);
switch_time.setMinutes(41);
switch_time.setSeconds(0);

function checkTimeRedirect(url, time){
    setInterval(function(){
        var local_time = new Date();
        if(local_time>switch_time){
            window.location.href= url;
        }
    },1000);
}

checkTimeRedirect(redirected_url, switch_time);

/****************************************************
 * Prayer Transition
 *
 * Transition only works when html is organized
 * with correct class name in the right order as such:
 * "section"
 * --"prayer-item"
 * --"prayer-item"
 * ----"bullet"
 * ----"bullet"
 * --"prayer-item"
 ****************************************************/

var defaultIntervalTime =  5000;
var defaultFadeInTime = 1500;
var defaultLargeFontSize = "70px";
var defaultSmallFontSize = "50px";

function generateTransition() {
    iterateSection();
}

function calculateFramesForSection (section_ref) {
    var total = 0;
    $(section_ref).find(".prayer-item").each(function() {
        var bulletLength = $(this).find(".bullet").length;
        if(bulletLength>0) {
            total = total + bulletLength;
        } else {
            total++;
        }
    });
    return total;
}

function adjustFontSize(ref) {
    var length = $(ref).html().length;
    var fontSize = (length>140)? defaultSmallFontSize : defaultLargeFontSize;
    $(ref).find("p").css({"font-size":fontSize});
}

function iterateSection () {
    var sections = $(".section").toArray();
    var max = sections.length;
    var i = 0;
    var result;
    var intervalTime =  defaultIntervalTime;

    var transitSection = function () {
        var frames = calculateFramesForSection(sections[i]);
        if(i<max){
            $(sections).hide();
            $(sections[i]).fadeIn(defaultFadeInTime);
            result = iteratePrayerItem(sections[i]);
            i++
        } else {
            i =0 ;
        }
        setTimeout(function(){transitSection()}, intervalTime*frames);
    };
    transitSection();
}

function iteratePrayerItem (section_ref) {
    var prayerItems = $(section_ref).find(".prayer-item");
    var max = prayerItems.length;
    var result;
    var i = 0;
    var intervalTime;
    var transitItem = function () {
        intervalTime = defaultIntervalTime;
        if(i<max){
            $(prayerItems[i]).siblings("div").hide();
            adjustFontSize(prayerItems[i]);
            $(prayerItems[i]).fadeIn(defaultFadeInTime);
            var bulletLength = $(prayerItems[i]).find(".bullet").length;
            if(bulletLength>0){
                intervalTime = intervalTime * bulletLength;
                result = iteratePrayerBullet(prayerItems[i]);
            }
            i++;
        } else {
            return;
        }
        setTimeout(function(){transitItem()}, intervalTime);
    };
    return transitItem();
}

function iteratePrayerBullet (item_ref){
    var bullets = $(item_ref).find(".bullet");
    var max = bullets.length;
    var i = 0;
    var transitBullet = function () {
        if(i<max){
            $(bullets[i]).siblings("div").hide();
            $(bullets[i]).fadeIn(defaultFadeInTime);
            i++;
            setTimeout(function(){transitBullet()}, defaultIntervalTime);
        } else {
            return;
        }
    };
    return transitBullet();
}

generateTransition();
