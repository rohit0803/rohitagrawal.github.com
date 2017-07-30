/*!
* Blast.js: Blast text apart to make it manipulable.
* @version 1.1.1
* @dependency Works with both jQuery and Zepto.
* @docs julian.com/research/blast
* @license Copyright 2014 Julian Shapiro. MIT License: http://en.wikipedia.org/wiki/MIT_License
*/

!function($,e,t,a){var n=function(){if(t.documentMode)return t.documentMode;for(var e=7;e>0;e--){var n=t.createElement("div");if(n.innerHTML="<!--[if IE "+e+"]><span></span><![endif]-->",n.getElementsByTagName("span").length)return n=null,e;n=null}return a}(),r=e.console||{log:function(){},time:function(){}},i="blast",s={latinPunctuation:"–—′’'“″„\"(«.…¡¿′’'”″“\")».…!?",latinLetters:"\\u0041-\\u005A\\u0061-\\u007A\\u00C0-\\u017F\\u0100-\\u01FF\\u0180-\\u027F"},l={abbreviations:new RegExp("[^"+s.latinLetters+"](e\\.g\\.)|(i\\.e\\.)|(mr\\.)|(mrs\\.)|(ms\\.)|(dr\\.)|(prof\\.)|(esq\\.)|(sr\\.)|(jr\\.)[^"+s.latinLetters+"]","ig"),innerWordPeriod:new RegExp("["+s.latinLetters+"].["+s.latinLetters+"]","ig"),onlyContainsPunctuation:new RegExp("[^"+s.latinPunctuation+"]"),adjoinedPunctuation:new RegExp("^["+s.latinPunctuation+"]+|["+s.latinPunctuation+"]+$","g"),skippedElements:/(script|style|select|textarea)/i,hasPluginClass:new RegExp("(^| )"+i+"( |$)","gi")};$.fn[i]=function(d){function o(e){return e.replace(l.abbreviations,function(e){return e.replace(/\./g,"{{46}}")}).replace(l.innerWordPeriod,function(e){return e.replace(/\./g,"{{46}}")})}function c(e){return e.replace(/{{(\d{1,3})}}/g,function(e,t){return String.fromCharCode(t)})}function u(e,a){var n=t.createElement(a.tag);if(n.className=i,a.customClass&&(n.className+=" "+a.customClass,a.generateIndexID&&(n.id=a.customClass+"-"+f.blastedIndex)),a.generateValueClass===!0&&!a.search&&("character"===a.delimiter||"word"===a.delimiter)){var r,s=e.data;"word"===a.delimiter&&l.onlyContainsPunctuation.test(s)&&(s=s.replace(l.adjoinedPunctuation,"")),r=i+"-"+a.delimiter.toLowerCase()+"-"+s.toLowerCase(),n.className+=" "+r}return a.aria&&n.setAttribute("aria-hidden","true"),n.appendChild(e.cloneNode(!1)),n}function g(e,t){var a=-1,n=0;if(3===e.nodeType&&e.data.length){if(f.nodeBeginning&&(e.data=t.search||"sentence"!==t.delimiter?c(e.data):o(e.data),f.nodeBeginning=!1),a=e.data.search(p),-1!==a){var r=e.data.match(p),i=r[0],s=r[1]||!1;f.blastedIndex++,""===i?a++:s&&s!==i&&(a+=i.indexOf(s),i=s);var d=e.splitText(a);d.splitText(i.length),n=1,t.search||"sentence"!==t.delimiter||(d.data=c(d.data));var m=u(d,t,f.blastedIndex);d.parentNode.replaceChild(m,d),f.wrappers.push(m)}}else if(1===e.nodeType&&e.hasChildNodes()&&!l.skippedElements.test(e.tagName)&&!l.hasPluginClass.test(e.className))for(var h=0;h<e.childNodes.length;h++)f.nodeBeginning=!0,h+=g(e.childNodes[h],t);return n}function m(t,s){s.debug&&r.time("blast reversal");var l=!1;t.removeClass(i+"-root").removeAttr("aria-label").find("."+i).each(function(){var e=$(this);if(e.closest("."+i+"-root").length)l=!0;else{var t=this.parentNode;7>=n&&t.firstChild.nodeName,t.replaceChild(this.firstChild,this),t.normalize()}}),e.Zepto?t.data(i,a):t.removeData(i),s.debug&&(r.log(i+": Reversed Blast"+(t.attr("id")?" on #"+t.attr("id")+".":".")+(l?" Skipped reversal on the children of one or more descendant root elements.":"")),r.timeEnd("blast reversal"))}var h=$.extend({},$.fn[i].defaults,d),p,f={};if(h.search.length&&("string"==typeof h.search||/^\d/.test(parseFloat(h.search))))h.delimiter=h.search.toString().replace(/[-[\]{,}(.)*+?|^$\\\/]/g,"\\$&"),p=new RegExp("(?:^|[^-"+s.latinLetters+"])("+h.delimiter+"('s)?)(?![-"+s.latinLetters+"])","i");else switch("string"==typeof h.delimiter&&(h.delimiter=h.delimiter.toLowerCase()),h.delimiter){case"letter":case"char":case"character":p=/(\S)/;break;case"word":p=/\s*(\S+)\s*/;break;case"sentence":p=/(?=\S)(([.]{2,})?[^!?]+?([.…!?]+|(?=\s+$)|$)(\s*[′’'”″“")»]+)*)/;break;case"element":p=/(?=\S)([\S\s]*\S)/;break;default:if(!(h.delimiter instanceof RegExp))return r.log(i+": Unrecognized delimiter, empty search string, or invalid custom Regex. Aborting."),!0;p=h.delimiter}if(this.each(function(){var e=$(this),n=e.text();if(d!==!1){f={blastedIndex:0,nodeBeginning:!1,wrappers:[]},e.data(i)===a||"search"===e.data(i)&&h.search!==!1||(m(e,h),h.debug&&r.log(i+": Removed element's existing Blast call.")),e.data(i,h.search!==!1?"search":h.delimiter),h.aria&&e.attr("aria-label",n),h.stripHTMLTags&&e.html(n);try{t.createElement(h.tag)}catch(s){h.tag="span",h.debug&&r.log(i+": Invalid tag supplied. Defaulting to span.")}e.addClass(i+"-root"),h.debug&&r.time(i),g(this,h),h.debug&&r.timeEnd(i)}else d===!1&&e.data(i)!==a&&m(e,h);h.debug&&$.each(f.wrappers,function(e,t){r.log(i+" ["+h.delimiter+"] "+this.outerHTML),this.style.backgroundColor=e%2?"#f12185":"#075d9a"})}),d!==!1&&h.returnGenerated===!0){var b=$().add(f.wrappers);return b.prevObject=this,b.context=this.context,b}return this},$.fn.blast.defaults={returnGenerated:!0,delimiter:"word",tag:"span",search:!1,customClass:"",generateIndexID:!1,generateValueClass:!1,stripHTMLTags:!1,aria:!0,debug:!1}}(window.jQuery||window.Zepto,window,document);
!function(a,b){"use strict";"function"==typeof define&&define.amd?define(["jquery"],function(c){return b(c,a,a.document)}):"object"==typeof module&&module.exports?module.exports=b(require("jquery"),a,a.document):b(jQuery,a,a.document)}("undefined"!=typeof window?window:this,function(a,b,c,d){"use strict";function e(c,d,e,f){if(r===c&&(e=!1),z===!0)return!0;if(n[c]){if(w=!1,e&&G.before(c,o),s=1,E=m[c],C===!1&&r>c&&f===!1&&p[c]&&(s=parseInt(o[c].outerHeight()/u.height()),E=parseInt(m[c])+(o[c].outerHeight()-u.height())),G.updateHash&&G.sectionName&&(C!==!0||0!==c))if(history.pushState)try{history.replaceState(null,null,n[c])}catch(a){b.console&&console.warn("Scrollify warning: Page must be hosted to manipulate the hash value.")}else b.location.hash=n[c];if(C&&(G.afterRender(),C=!1),r=c,d)a(G.target).stop().scrollTop(E),e&&G.after(c,o);else{if(x=!0,a().velocity?a(G.target).stop().velocity("scroll",{duration:G.scrollSpeed,easing:G.easing,offset:E,mobileHA:!1}):a(G.target).stop().animate({scrollTop:E},G.scrollSpeed,G.easing),b.location.hash.length&&G.sectionName&&b.console)try{a(b.location.hash).length&&console.warn("Scrollify warning: ID matches hash value - this will cause the page to anchor.")}catch(a){}a(G.target).promise().done(function(){x=!1,C=!1,e&&G.after(c,o)})}}}function f(a){function b(b){for(var c=0,d=a.slice(Math.max(a.length-b,1)),e=0;e<d.length;e++)c+=d[e];return Math.ceil(c/b)}var c=b(10),d=b(70);return c>=d}function g(a,b){for(var c=n.length;c>=0;c--)"string"==typeof a?n[c]===a&&(q=c,e(c,b,!0,!0)):c===a&&(q=c,e(c,b,!0,!0))}var h,i,j,k,l,m=[],n=[],o=[],p=[],q=0,r=0,s=1,t=!1,u=a(b),v=u.scrollTop(),w=!1,x=!1,y=!1,z=!1,A=[],B=(new Date).getTime(),C=!0,D=!1,E=0,F="onwheel"in c?"wheel":c.onmousewheel!==d?"mousewheel":"DOMMouseScroll",G={section:".section",sectionName:"section-name",interstitialSection:"",easing:"easeOutExpo",scrollSpeed:1100,offset:0,scrollbars:!0,target:"html,body",standardScrollElements:!1,setHeights:!0,overflowScroll:!0,updateHash:!0,touchScroll:!0,before:function(){},after:function(){},afterResize:function(){},afterRender:function(){}},H=function(d){function g(b){a().velocity?a(G.target).stop().velocity("scroll",{duration:G.scrollSpeed,easing:G.easing,offset:b,mobileHA:!1}):a(G.target).stop().animate({scrollTop:b},G.scrollSpeed,G.easing)}function r(b){b&&(v=u.scrollTop());var c=G.section;p=[],G.interstitialSection.length&&(c+=","+G.interstitialSection),G.scrollbars===!1&&(G.overflowScroll=!1),a(c).each(function(b){var c=a(this);G.setHeights?c.is(G.interstitialSection)?p[b]=!1:c.css("height","auto").outerHeight()<u.height()||"hidden"===c.css("overflow")?(c.css({height:u.height()}),p[b]=!1):(c.css({height:c.height()}),G.overflowScroll?p[b]=!0:p[b]=!1):c.outerHeight()<u.height()||G.overflowScroll===!1?p[b]=!1:p[b]=!0}),b&&u.scrollTop(v)}function C(c,d){var f=G.section;G.interstitialSection.length&&(f+=","+G.interstitialSection),m=[],n=[],o=[],a(f).each(function(c){var d=a(this);c>0?m[c]=parseInt(d.offset().top)+G.offset:m[c]=parseInt(d.offset().top),G.sectionName&&d.data(G.sectionName)?n[c]="#"+d.data(G.sectionName).toString().replace(/ /g,"-"):d.is(G.interstitialSection)===!1?n[c]="#"+(c+1):(n[c]="#",c===a(f).length-1&&c>1&&(m[c]=m[c-1]+(parseInt(a(a(f)[c-1]).outerHeight())-parseInt(a(b).height()))+parseInt(d.outerHeight()))),o[c]=d;try{a(n[c]).length&&b.console&&console.warn("Scrollify warning: Section names can't match IDs - this will cause the browser to anchor.")}catch(a){}b.location.hash===n[c]&&(q=c,t=!0)}),!0===c&&e(q,!1,!1,!1)}function E(){return!p[q]||(v=u.scrollTop(),!(v>parseInt(m[q])))}function H(){return!p[q]||(v=u.scrollTop(),!(v<parseInt(m[q])+(o[q].outerHeight()-u.height())-28))}D=!0,a.easing.easeOutExpo=function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},j={handleMousedown:function(){return z===!0||(w=!1,void(y=!1))},handleMouseup:function(){return z===!0||(w=!0,void(y&&j.calculateNearest(!1,!0)))},handleScroll:function(){return z===!0||(h&&clearTimeout(h),void(h=setTimeout(function(){return y=!0,w!==!1&&(w=!1,void j.calculateNearest(!1,!0))},200)))},calculateNearest:function(a,b){v=u.scrollTop();for(var c,d=1,f=m.length,g=0,h=Math.abs(m[0]-v);d<f;d++)c=Math.abs(m[d]-v),c<h&&(h=c,g=d);(H()&&g>q||E())&&(q=g,e(g,a,b,!1))},wheelHandler:function(c){if(z===!0)return!0;if(G.standardScrollElements&&(a(c.target).is(G.standardScrollElements)||a(c.target).closest(G.standardScrollElements).length))return!0;p[q]||c.preventDefault();var d=(new Date).getTime();c=c||b.event;var g=c.originalEvent.wheelDelta||-c.originalEvent.deltaY||-c.originalEvent.detail,h=Math.max(-1,Math.min(1,g));if(A.length>149&&A.shift(),A.push(Math.abs(g)),d-B>200&&(A=[]),B=d,x)return!1;if(h<0){if(q<m.length-1&&H()){if(!f(A))return!1;c.preventDefault(),q++,x=!0,e(q,!1,!0,!1)}}else if(h>0&&q>0&&E()){if(!f(A))return!1;c.preventDefault(),q--,x=!0,e(q,!1,!0,!1)}},keyHandler:function(a){return z===!0||x!==!0&&void(38==a.keyCode||33==a.keyCode?q>0&&E()&&(a.preventDefault(),q--,e(q,!1,!0,!1)):40!=a.keyCode&&34!=a.keyCode||q<m.length-1&&H()&&(a.preventDefault(),q++,e(q,!1,!0,!1)))},init:function(){G.scrollbars?(u.on("mousedown",j.handleMousedown),u.on("mouseup",j.handleMouseup),u.on("scroll",j.handleScroll)):a("body").css({overflow:"hidden"}),u.on(F,j.wheelHandler),u.on("keydown",j.keyHandler)}},k={touches:{touchstart:{y:-1,x:-1},touchmove:{y:-1,x:-1},touchend:!1,direction:"undetermined"},options:{distance:30,timeGap:800,timeStamp:(new Date).getTime()},touchHandler:function(b){if(z===!0)return!0;if(G.standardScrollElements&&(a(b.target).is(G.standardScrollElements)||a(b.target).closest(G.standardScrollElements).length))return!0;var c;if("undefined"!=typeof b&&"undefined"!=typeof b.touches)switch(c=b.touches[0],b.type){case"touchstart":k.touches.touchstart.y=c.pageY,k.touches.touchmove.y=-1,k.touches.touchstart.x=c.pageX,k.touches.touchmove.x=-1,k.options.timeStamp=(new Date).getTime(),k.touches.touchend=!1;case"touchmove":k.touches.touchmove.y=c.pageY,k.touches.touchmove.x=c.pageX,k.touches.touchstart.y!==k.touches.touchmove.y&&Math.abs(k.touches.touchstart.y-k.touches.touchmove.y)>Math.abs(k.touches.touchstart.x-k.touches.touchmove.x)&&(b.preventDefault(),k.touches.direction="y",k.options.timeStamp+k.options.timeGap<(new Date).getTime()&&0==k.touches.touchend&&(k.touches.touchend=!0,k.touches.touchstart.y>-1&&Math.abs(k.touches.touchmove.y-k.touches.touchstart.y)>k.options.distance&&(k.touches.touchstart.y<k.touches.touchmove.y?k.up():k.down())));break;case"touchend":k.touches[b.type]===!1&&(k.touches[b.type]=!0,k.touches.touchstart.y>-1&&k.touches.touchmove.y>-1&&"y"===k.touches.direction&&(Math.abs(k.touches.touchmove.y-k.touches.touchstart.y)>k.options.distance&&(k.touches.touchstart.y<k.touches.touchmove.y?k.up():k.down()),k.touches.touchstart.y=-1,k.touches.touchstart.x=-1,k.touches.direction="undetermined"))}},down:function(){q<m.length-1&&(H()&&q<m.length-1?(q++,e(q,!1,!0,!1)):Math.floor(o[q].height()/u.height())>s?(g(parseInt(m[q])+u.height()*s),s+=1):g(parseInt(m[q])+(o[q].outerHeight()-u.height())))},up:function(){q>=0&&(E()&&q>0?(q--,e(q,!1,!0,!1)):s>2?(s-=1,g(parseInt(m[q])+u.height()*s)):(s=1,g(parseInt(m[q]))))},init:function(){c.addEventListener&&G.touchScroll&&(c.addEventListener("touchstart",k.touchHandler,!1),c.addEventListener("touchmove",k.touchHandler,!1),c.addEventListener("touchend",k.touchHandler,!1))}},l={refresh:function(a,b){clearTimeout(i),i=setTimeout(function(){r(!0),C(b,!1),a&&G.afterResize()},400)},handleUpdate:function(){l.refresh(!1,!1)},handleResize:function(){l.refresh(!0,!1)},handleOrientation:function(){l.refresh(!0,!0)}},G=a.extend(G,d),r(!1),C(!1,!0),!0===t?e(q,!1,!0,!0):setTimeout(function(){j.calculateNearest(!0,!1)},200),m.length&&(j.init(),k.init(),u.on("resize",l.handleResize),c.addEventListener&&b.addEventListener("orientationchange",l.handleOrientation,!1))};return H.move=function(b){return b!==d&&(b.originalEvent&&(b=a(this).attr("href")),void g(b,!1))},H.instantMove=function(a){return a!==d&&void g(a,!0)},H.next=function(){q<n.length&&(q+=1,e(q,!1,!0,!0))},H.previous=function(){q>0&&(q-=1,e(q,!1,!0,!0))},H.instantNext=function(){q<n.length&&(q+=1,e(q,!0,!0,!0))},H.instantPrevious=function(){q>0&&(q-=1,e(q,!0,!0,!0))},H.destroy=function(){return!!D&&(G.setHeights&&a(G.section).each(function(){a(this).css("height","auto")}),u.off("resize",l.handleResize),G.scrollbars&&(u.off("mousedown",j.handleMousedown),u.off("mouseup",j.handleMouseup),u.off("scroll",j.handleScroll)),u.off(F,j.wheelHandler),u.off("keydown",j.keyHandler),c.addEventListener&&G.touchScroll&&(c.removeEventListener("touchstart",k.touchHandler,!1),c.removeEventListener("touchmove",k.touchHandler,!1),c.removeEventListener("touchend",k.touchHandler,!1)),m=[],n=[],o=[],void(p=[]))},H.update=function(){return!!D&&void l.handleUpdate()},H.current=function(){return o[q]},H.disable=function(){z=!0},H.enable=function(){z=!1,D&&j.calculateNearest(!1,!1)},H.isDisabled=function(){return z},H.setOptions=function(c){return!!D&&void("object"==typeof c?(G=a.extend(G,c),l.handleUpdate()):b.console&&console.warn("Scrollify warning: setOptions expects an object."))},a.scrollify=H,H});

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
$("#scroll").click(function() {
    $('html,body').animate({
        scrollTop: $("#second").offset().top},
        'medium');
});
var element_position1 = $('#second').offset().top;
var screen_height1 = $(window).height();
var activation_offset1 = 0.5;//determines how far up the the page the element needs to be before triggering the function
var activation_point1 = element_position1 - (screen_height1 * activation_offset1);
var max_scroll_height1 = $('body').height() - screen_height1 - 5;//-5 for a little bit of buffer

//Does something when user scrolls to it OR
//Does it when user has reached the bottom of the page and hasn't triggered the function yet

$(window).on('scroll', function() {
    var y_scroll_pos1 = window.pageYOffset;

    var element_in_view1 = y_scroll_pos1 > activation_point1;
    var has_reached_bottom_of_page1 = max_scroll_height1 <= y_scroll_pos1 && !element_in_view1;

    if(element_in_view1 || has_reached_bottom_of_page1) {
        //Do something
        
      $(".second--para1").addClass("second--para1--active");
      $(".second--para2").addClass("second--para2--active");

    }
});

var element_position = $('#third').offset().top;
var screen_height = $(window).height();
var activation_offset = 0.5;//determines how far up the the page the element needs to be before triggering the function
var activation_point = element_position - (screen_height * activation_offset);
var max_scroll_height = $('body').height() - screen_height - 5;//-5 for a little bit of buffer

//Does something when user scrolls to it OR
//Does it when user has reached the bottom of the page and hasn't triggered the function yet
function clickplan22(){
  var answer = confirm ("The website is under development and will be available soon. Click OK to go to older version.");
  if (answer)
    window.open("http://plan22.in", "_blank");
}
$(window).on('scroll', function() {
    var y_scroll_pos = window.pageYOffset;

    var element_in_view = y_scroll_pos > activation_point;
    var has_reached_bottom_of_page = max_scroll_height <= y_scroll_pos && !element_in_view;

    if(element_in_view || has_reached_bottom_of_page) {
        //Do something
        
     circle1.animate(0.9);
     circle2.animate(0.75);
     circle3.animate(0.7);
     circle4.animate(0.8);
     $(".third--para").addClass("third--para--active");
    }
});
var width = screen.width;
if(width<"1200"){
  $("#work1").removeClass("work1--left");
  $("#work11").removeClass("work1--right");
  $("#work2").removeClass("work2--right");
  $("#work22").removeClass("work2--left");
  
}
if(width<"450"){
  $(".facebook").removeClass("col-xs-3");
  $(".github").removeClass("col-xs-3");
  $(".stack").removeClass("col-xs-3");
  $(".google").removeClass("col-xs-3");
  $(".facebook").addClass("col-xs-6");
  $(".github").addClass("col-xs-6");
  $(".stack").addClass("col-xs-6");
  $(".google").addClass("col-xs-6");
}

var element_position2 = $('#fourth').offset().top;
var screen_height2 = $(window).height();
var activation_offset2 = 0.5;//determines how far up the the page the element needs to be before triggering the function
var activation_point2 = element_position2 - (screen_height2 * activation_offset2);
var max_scroll_height2 = $('body').height() - screen_height2 - 5;//-5 for a little bit of buffer

//Does something when user scrolls to it OR
//Does it when user has reached the bottom of the page and hasn't triggered the function yet

$(window).on('scroll', function() {
    var y_scroll_pos2 = window.pageYOffset;

    var element_in_view2 = y_scroll_pos2 > activation_point2;
    var has_reached_bottom_of_page2 = max_scroll_height2 <= y_scroll_pos2 && !element_in_view2;

    if(element_in_view2 || has_reached_bottom_of_page2) {
        //Do something
        if(width>"1200"){
              $("#work1").addClass("work1--left--active");
              $("#work11").addClass("work1--right--active");
              $("#work22").addClass("work2--left--active");
              $("#work2").addClass("work2--right--active");
        }
        
    }
});
$(window).bind("load", function(){ 

});


// if(width > "768"){
//   console.log("width badi hai")
//   $(function() {
//     $.scrollify({
//         section : ".section",
//         scrollSpeed: 1100,
//         offset : 0,
//         scrollbars: false,
//         touchScroll:true,
//         overflowScroll: true,
//         setHeights: false,
//     });
//   });
// }
console.log(width);
if(width > "768"){
  $(".first--head1").blast({ delimiter: "character" });
  $(".first--head1").hover(

    function(){
      var $spans = $(this).find('span');
      $spans.each(function(){
        var offsetX = getRandom(-200, 200);
        var offsetY = getRandom(-20, 10);
        var scale = getRandom(.5, 3);
        $(this).velocity({translateX : offsetX, translateY: offsetY, scale: scale, color: '#fff'}, 300, [ 50, 5 ]);
      });
    },
    function(){
      var $spans = $(this).find('span');
      $spans.each(function(){;
                             $(this).velocity({translateX : 0, translateY: 0, scale: 1, color: '#fff'}, 100);
      });
    }
  );
};
$( ".picTranxact" )
  .mouseover(function() {
    $(".tranx2").addClass('tranx2--active');
    $(".tranx1").addClass('tranx1--active');
    $(".tranx3").addClass('tranx3--active');
  })
  .mouseout(function() {
    $(".tranx2").removeClass('tranx2--active');
    $(".tranx1").removeClass('tranx1--active');
    $(".tranx3").removeClass('tranx3--active');
  });
$( ".picPlan22" )
  .mouseover(function() {
    $(".plan2").addClass('plan2--active');
    $(".plan1").addClass('plan1--active');
    $(".plan3").addClass('plan3--active');
  })
  .mouseout(function() {
    $(".plan2").removeClass('plan2--active');
    $(".plan1").removeClass('plan1--active');
    $(".plan3").removeClass('plan3--active');
  });
// (function() {

//     var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

//     // Main
//     initHeader();
//     initAnimation();
//     addListeners();

//     function initHeader() {
//         width = window.innerWidth;
//         height = window.innerHeight;
//         target = {x: width/2, y: height/2};

//         largeHeader = document.getElementById('first');
//         largeHeader.style.height = height+'px';

//         canvas = document.getElementById('demo-canvas');
//         canvas.width = width;
//         canvas.height = height;
//         ctx = canvas.getContext('2d');

//         // create points
//         points = [];
//         for(var x = 0; x < width; x = x + width/20) {
//             for(var y = 0; y < height; y = y + height/20) {
//                 var px = x + Math.random()*width/20;
//                 var py = y + Math.random()*height/20;
//                 var p = {x: px, originX: px, y: py, originY: py };
//                 points.push(p);
//             }
//         }

//         // for each point find the 5 closest points
//         for(var i = 0; i < points.length; i++) {
//             var closest = [];
//             var p1 = points[i];
//             for(var j = 0; j < points.length; j++) {
//                 var p2 = points[j]
//                 if(!(p1 == p2)) {
//                     var placed = false;
//                     for(var k = 0; k < 5; k++) {
//                         if(!placed) {
//                             if(closest[k] == undefined) {
//                                 closest[k] = p2;
//                                 placed = true;
//                             }
//                         }
//                     }

//                     for(var k = 0; k < 5; k++) {
//                         if(!placed) {
//                             if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
//                                 closest[k] = p2;
//                                 placed = true;
//                             }
//                         }
//                     }
//                 }
//             }
//             p1.closest = closest;
//         }

//         // assign a circle to each point
//         for(var i in points) {
//             var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
//             points[i].circle = c;
//         }
//     }

//     // Event handling
//     function addListeners() {
//         if(!('ontouchstart' in window)) {
//             window.addEventListener('mousemove', mouseMove);
//         }
//         window.addEventListener('scroll', scrollCheck);
//         window.addEventListener('resize', resize);
//     }

//     function mouseMove(e) {
//         var posx = posy = 0;
//         if (e.pageX || e.pageY) {
//             posx = e.pageX;
//             posy = e.pageY;
//         }
//         else if (e.clientX || e.clientY)    {
//             posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
//             posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
//         }
//         target.x = posx;
//         target.y = posy;
//     }

//     function scrollCheck() {
//         if(document.body.scrollTop > height) animateHeader = false;
//         else animateHeader = true;
//     }

//     function resize() {
//         width = window.innerWidth;
//         height = window.innerHeight;
//         largeHeader.style.height = height+'px';
//         canvas.width = width;
//         canvas.height = height;
//     }

//     // animation
//     function initAnimation() {
//         animate();
//         for(var i in points) {
//             shiftPoint(points[i]);
//         }
//     }

//     function animate() {
//         if(animateHeader) {
//             ctx.clearRect(0,0,width,height);
//             for(var i in points) {
//                 // detect points in range
//                 if(Math.abs(getDistance(target, points[i])) < 4000) {
//                     points[i].active = 0.3;
//                     points[i].circle.active = 0.6;
//                 } else if(Math.abs(getDistance(target, points[i])) < 20000) {
//                     points[i].active = 0.1;
//                     points[i].circle.active = 0.3;
//                 } else if(Math.abs(getDistance(target, points[i])) < 40000) {
//                     points[i].active = 0.02;
//                     points[i].circle.active = 0.1;
//                 } else {
//                     points[i].active = 0;
//                     points[i].circle.active = 0;
//                 }

//                 drawLines(points[i]);
//                 points[i].circle.draw();
//             }
//         }
//         requestAnimationFrame(animate);
//     }

//     function shiftPoint(p) {
//         TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
//             y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
//             onComplete: function() {
//                 shiftPoint(p);
//             }});
//     }

//     // Canvas manipulation
//     function drawLines(p) {
//         if(!p.active) return;
//         for(var i in p.closest) {
//             ctx.beginPath();
//             ctx.moveTo(p.x, p.y);
//             ctx.lineTo(p.closest[i].x, p.closest[i].y);
//             ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
//             ctx.stroke();
//         }
//     }

//     function Circle(pos,rad,color) {
//         var _this = this;

//         // constructor
//         (function() {
//             _this.pos = pos || null;
//             _this.radius = rad || null;
//             _this.color = color || null;
//         })();

//         this.draw = function() {
//             if(!_this.active) return;
//             ctx.beginPath();
//             ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
//             ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
//             ctx.fill();
//         };
//     }

//     // Util
//     function getDistance(p1, p2) {
//         return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
//     }
    
// })();
// // console.log(width);
// particle.min.js hosted on GitHub
// Scroll down for initialisation code

!function(a){var b="object"==typeof self&&self.self===self&&self||"object"==typeof global&&global.global===global&&global;"function"==typeof define&&define.amd?define(["exports"],function(c){b.ParticleNetwork=a(b,c)}):"object"==typeof module&&module.exports?module.exports=a(b,{}):b.ParticleNetwork=a(b,{})}(function(a,b){var c=function(a){this.canvas=a.canvas,this.g=a.g,this.particleColor=a.options.particleColor,this.x=Math.random()*this.canvas.width,this.y=Math.random()*this.canvas.height,this.velocity={x:(Math.random()-.5)*a.options.velocity,y:(Math.random()-.5)*a.options.velocity}};return c.prototype.update=function(){(this.x>this.canvas.width+20||this.x<-20)&&(this.velocity.x=-this.velocity.x),(this.y>this.canvas.height+20||this.y<-20)&&(this.velocity.y=-this.velocity.y),this.x+=this.velocity.x,this.y+=this.velocity.y},c.prototype.h=function(){this.g.beginPath(),this.g.fillStyle=this.particleColor,this.g.globalAlpha=.7,this.g.arc(this.x,this.y,1.5,0,2*Math.PI),this.g.fill()},b=function(a,b){this.i=a,this.i.size={width:this.i.offsetWidth,height:this.i.offsetHeight},b=void 0!==b?b:{},this.options={particleColor:void 0!==b.particleColor?b.particleColor:"#fff",background:void 0!==b.background?b.background:"#1a252f",interactive:void 0!==b.interactive?b.interactive:!0,velocity:this.setVelocity(b.speed),density:this.j(b.density)},this.init()},b.prototype.init=function(){if(this.k=document.createElement("div"),this.i.appendChild(this.k),this.l(this.k,{position:"absolute",top:0,left:0,bottom:0,right:0,"z-index":1}),/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(this.options.background))this.l(this.k,{background:this.options.background});else{if(!/\.(gif|jpg|jpeg|tiff|png)$/i.test(this.options.background))return console.error("Please specify a valid background image or hexadecimal color"),!1;this.l(this.k,{background:'url("'+this.options.background+'") no-repeat center',"background-size":"cover"})}if(!/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(this.options.particleColor))return console.error("Please specify a valid particleColor hexadecimal color"),!1;this.canvas=document.createElement("canvas"),this.i.appendChild(this.canvas),this.g=this.canvas.getContext("2d"),this.canvas.width=this.i.size.width,this.canvas.height=this.i.size.height,this.l(this.i,{position:"relative"}),this.l(this.canvas,{"z-index":"20",position:"relative"}),window.addEventListener("resize",function(){return this.i.offsetWidth===this.i.size.width&&this.i.offsetHeight===this.i.size.height?!1:(this.canvas.width=this.i.size.width=this.i.offsetWidth,this.canvas.height=this.i.size.height=this.i.offsetHeight,clearTimeout(this.m),void(this.m=setTimeout(function(){this.o=[];for(var a=0;a<this.canvas.width*this.canvas.height/this.options.density;a++)this.o.push(new c(this));this.options.interactive&&this.o.push(this.p),requestAnimationFrame(this.update.bind(this))}.bind(this),500)))}.bind(this)),this.o=[];for(var a=0;a<this.canvas.width*this.canvas.height/this.options.density;a++)this.o.push(new c(this));this.options.interactive&&(this.p=new c(this),this.p.velocity={x:0,y:0},this.o.push(this.p),this.canvas.addEventListener("mousemove",function(a){this.p.x=a.clientX-this.canvas.offsetLeft,this.p.y=a.clientY-this.canvas.offsetTop}.bind(this)),this.canvas.addEventListener("mouseup",function(a){this.p.velocity={x:(Math.random()-.5)*this.options.velocity,y:(Math.random()-.5)*this.options.velocity},this.p=new c(this),this.p.velocity={x:0,y:0},this.o.push(this.p)}.bind(this))),requestAnimationFrame(this.update.bind(this))},b.prototype.update=function(){this.g.clearRect(0,0,this.canvas.width,this.canvas.height),this.g.globalAlpha=1;for(var a=0;a<this.o.length;a++){this.o[a].update(),this.o[a].h();for(var b=this.o.length-1;b>a;b--){var c=Math.sqrt(Math.pow(this.o[a].x-this.o[b].x,2)+Math.pow(this.o[a].y-this.o[b].y,2));c>120||(this.g.beginPath(),this.g.strokeStyle=this.options.particleColor,this.g.globalAlpha=(120-c)/120,this.g.lineWidth=.7,this.g.moveTo(this.o[a].x,this.o[a].y),this.g.lineTo(this.o[b].x,this.o[b].y),this.g.stroke())}}0!==this.options.velocity&&requestAnimationFrame(this.update.bind(this))},b.prototype.setVelocity=function(a){return"fast"===a?1:"slow"===a?.33:"none"===a?0:.66},b.prototype.j=function(a){return"high"===a?5e3:"low"===a?2e4:isNaN(parseInt(a,10))?1e4:a},b.prototype.l=function(a,b){for(var c in b)a.style[c]=b[c]},b});

// Initialisation

var canvasDiv = document.getElementById('particle-canvas');
var options = {
  particleColor: '#888',
  background: '#222',
  interactive: true,
  speed: 'medium',
  density: 'medium'
};
var particleCanvas = new ParticleNetwork(canvasDiv, options);

var circle1 = new ProgressBar.Circle(html, {
  strokeWidth: 6,
  color: '#FFEA82',
  trailColor: '#eee',
  trailWidth: 2,
  easing: 'easeInOut',
  duration: 1400,
  svgStyle: null,
  text: {
    value: 80,
    autoStyleContainer: false
  },
  from: {color: '#FFEA82',width: 2},
  to: {color: '#ED6A5A',width: 6},
  // Set default step function for all animate calls
  step: (state, circle1) => {
    circle1.path.setAttribute('stroke', state.color);
    circle1.path.setAttribute('stroke-width', state.width);
    var value = "HTML/CSS";
    if (value === 0) {
      circle1.setText('');
    } else {
      circle1.setText(value);
    }

    circle1.text.style.color = state.color;
  }
});
circle1.text.style.fontFamily = '"Nunito Sans", sans-serif';
circle1.text.style.fontSize = '2rem';

 

var circle2 = new ProgressBar.Circle(javascript, {
  strokeWidth: 6,
  color: '#FFEA82',
  trailColor: '#eee',
  trailWidth: 2,
  easing: 'easeInOut',
  duration: 1400,
  svgStyle: null,
  text: {
    value: 80,
    alignToBottom: false
  },
  from: {color: '#FFEA82',width: 2},
  to: {color: '#ED6A5A',width: 6},
  // Set default step function for all animate calls
  step: (state, circle2) => {
    circle2.path.setAttribute('stroke', state.color);
    circle1.path.setAttribute('stroke-width', state.width);

    var value = "Javascript";
    if (value === 0) {
      circle2.setText('');
    } else {
      circle2.setText(value);
    }

    circle2.text.style.color = state.color;
  }
});
circle2.text.style.fontFamily = '"Nunito Sans", sans-serif';
circle2.text.style.fontSize = '2rem';



var circle3 = new ProgressBar.Circle(React, {
  strokeWidth: 6,
  color: '#FFEA82',
  trailColor: '#eee',
  trailWidth: 2,
  easing: 'easeInOut',
  duration: 1400,
  svgStyle: null,
  text: {
    value: 80,
    alignToBottom: false
  },
  from: {color: '#FFEA82',width: 2},
  to: {color: '#ED6A5A',width: 6},
  // Set default step function for all animate calls
  step: (state, circle3) => {
    circle3.path.setAttribute('stroke', state.color);
    circle1.path.setAttribute('stroke-width', state.width);

    var value = "ReactJs";
    if (value === 0) {
      circle3.setText('');
    } else {
      circle3.setText(value);
    }

    circle3.text.style.color = state.color;
  }
});
circle3.text.style.fontFamily = '"Nunito Sans", sans-serif';
circle3.text.style.fontSize = '2rem';



var circle4 = new ProgressBar.Circle(angular, {
  strokeWidth: 6,
  color: '#FFEA82',
  trailColor: '#eee',
  trailWidth: 2,
  easing: 'easeInOut',
  duration: 1400,
  svgStyle: null,
  text: {
    value: 80,
    alignToBottom: false
  },
  from: {color: '#FFEA82',width: 2},
  to: {color: '#ED6A5A',width: 6},
  // Set default step function for all animate calls
  step: (state, circle4) => {
    circle4.path.setAttribute('stroke', state.color);
    circle1.path.setAttribute('stroke-width', state.width);

    var value = "AngularJs";
    if (value === 0) {
      circle4.setText('');
    } else {
      circle4.setText(value);
    }

    circle4.text.style.color = state.color;
  }
});
circle4.text.style.fontFamily = '"Nunito Sans", sans-serif';
circle4.text.style.fontSize = '2rem';



