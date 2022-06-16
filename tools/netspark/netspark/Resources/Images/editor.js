(function() {function k(a){return 0===a.length||!a.trim()}function l(a){return a.charAt(0).toUpperCase()+a.slice(1)}function m(a){var b=0,d,c,e;if(0===a.length)return b;d=0;for(e=a.length;d<e;d++)c=a.charCodeAt(d),b=(b<<5)-b+c,b|=0;return b}function n(a){return $("<div/>").text(a).html()}function p(a){return $("<textarea/>").html(a).val()}function q(a,b){for(var d=a.toLowerCase(),c=0;c<b.length;c++)if(0===d.indexOf(b[c].toLowerCase()))return!0;return!1}
var r="critical",t=document.createElement("p"),u,v=null,x=new function(){var a=this;this.b=document.createElement("input");this.c=document.createElement("input");this.h=document.createElement("a");this.m=document.createElement("a");this.l=document.createElement("a");this.g=this.f=!1;this.o=this.u=this.a=null;this.w=["http://","https://"];this.K=function(b){var a=$(b),c=a.parent(),e=a.attr("href")||"",f=a.text()||"";this.a=b;a.hide();$(this.b).val(p(f)).attr("placeholder","Title").css("margin","5px").keypress(this.j).show();
$(this.c).val(p(e)).attr("placeholder","URL").css("margin","5px").keypress(this.j).show();$(c).append(this.b).append(this.c);this.N(c);this.M(c);this.L(c);$(this.b).focus()};this.D=function(){var b=$(x.a).parent("li");$(this.b).hide().unbind("keypress",this.j);$(this.c).hide().unbind("keypress",this.j);$(this.h).hide();b.children("input[placeholder]").remove();b.children("a[removeButton]").remove();b.children("a[moveUpButton]").remove();b.children("a[moveDownButton]").remove()};this.i=function(b){b&&
(this.g=!0);if(this.g&&(!this.f||this.a)&&(this.g=!1,(b=$(this.a))&&0!=b.length)){var d=n($(this.c).val()),c=q(d,a.w);c||b.attr("href")?(b.html(n($(this.b).val())).attr("href",c?d:b.attr("href")).show(),this.D(),d=b.html(),c=b.attr("href"),(k(d)||k(c))&&b.parent("li").remove(),this.f=!1):b.parent("li").remove()}};this.A=function(b){b.preventDefault();if(b.ctrlKey)try{var d=b.target.toString();if(!q(d,a.w))return;window.open(d,"_blank")}finally{return}a.f=!0;a.g=!0;a.i();a.K(this)};this.v=function(){var b=
document.createElement("li"),d=document.createElement("a");a.f=!0;$(d).click(a.A);$(b).append(d).insertBefore(this);$(d).trigger("click")};this.j=function(b){13==b.keyCode&&(b.target==a.c?(a.g=!0,a.i(),$(this).blur()):b.target==a.b&&$(a.c).focus())};this.s=function(){var b=document.createElement("li"),a=document.createElement("div");$(a).html("<i>Click here to add new reference.</i>");$(b).append(a).attr("tabindex",0).click(this.v).focus(this.v);return this.u=b};this.B=function(){$("div."+this.o).find("ul").each(function(){$(this).find("li").last().remove()})};
this.C=function(){$("div."+this.o).find("ul").each(function(){$(this).append(a.s())})};this.J=function(b){b.preventDefault();$(a.a).parent("li").remove()};this.H=function(b){var a=b.prev("li");a&&b.insertBefore(a)};this.F=function(b){var a=b.next("li");a&&a.text()!=$(this.u).text()&&b.insertAfter(a)};this.I=function(b){b.preventDefault();a.H($(a.a).parent("li"))};this.G=function(b){b.preventDefault();a.F($(a.a).parent("li"))};this.N=function(b){$(b).append(this.h);$(this.h).show();$(this.h).html("(remove)").css("margin",
"5px").attr("href","#").attr("removeButton","").click(this.J)};this.M=function(b){$(b).append(this.m);$(this.m).show();$(this.m).html("↑").css("margin","5px").css("text-decoration","none").attr("href","#").attr("moveUpButton","").click(this.I)};this.L=function(b){$(b).append(this.l);$(this.l).show();$(this.l).html("↓").css("margin","5px").css("text-decoration","none").attr("href","#").attr("moveDownButton","").click(this.G)};this.init=function(b){this.o=b;$("div."+b).each(function(){0==$(this).find("ul").length&&
$(this).append(document.createElement("ul"))});$("div."+b).find("ul").each(function(){$(this).append(a.s())});$("div."+b).find("a").click(this.A);$(document).keyup(function(b){9==(b.keyCode||b.which)&&"A"==document.activeElement.tagName&&document.activeElement!=a.a&&document.activeElement!=a.h&&document.activeElement!=a.m&&document.activeElement!=a.l&&$(document.activeElement).click()});$(document).click(function(d){var c=$("div."+b);c.is(d.target)||0!==c.has(d.target).length||a.i(!0)})}};
function y(){$("#severity").width($("#severity input[type=radio]:checked").width())}function z(){null!=v&&v.attr("class","option");$("#container").attr("class",r+"-severity");$("#header").attr("class","header-"+r);v=$("#severity input[type=radio]:checked+label");$("#severity input[type=radio]:checked+label").attr("class","option "+r);$(".severity-svg").hide();$("#"+r+"-svg").show()}
function A(a){var b={PolicyId:policyId,VulnerabilityType:vulnerabilityType,ProfileGuid:profileGuid,Severity:l(r),Classification:{Pci32:$("input[name=pci32]").val(),Wasc:$("input[name=wasc]").val(),Cwe:$("input[name=cwe]").val(),Capec:$("input[name=capec]").val(),Owasp2013:$("input[name=owasp2013]").val(),Owasp2017:$("input[name=owasp2017]").val(),Hipaa:$("input[name=hipaa]").val(),Iso27001:$("input[name=iso27001]").val(),OwaspProactiveControls:$("input[name=owaspProactiveControls]").val()},Sections:[],
CvssVectorString:B("cvssLayout","3.0"),Cvss31VectorString:B("cvss31Layout","3.1")},d=$("div[data-type=section-body]");for(i=0;i<d.length;i++){var c=l(d[i].id.replace("Field","")),e=tinyMCE.get(d[i].id),e=null!=e?e.getContent({format:"html"}):$(d[i]).html(),f=e.replace(/[&]nbsp[;]/gi,"").replace(/[<]br[^>]*[>]/gi,""),g=$("#"+c).prop("checked");if("Ref"==c.substring(c.length-3)){var e=e.replace(/\n|\t/g,""),h="<div><ul>";$(e).find("a").each(function(b,a){$(a).attr("order",b);h+="<li>"+$(a)[0].outerHTML+
"</li>"});h+="</ul></div>";a&&0>e.indexOf("<li")&&(g=!1);e=h}k($(e).text())&&(e="");b.Sections.push({Identifier:c,Body:f!=t.outerHTML?e:"",Enabled:g})}return JSON.stringify(b)}function C(a){x.i(a);x.B();a=A(a);x.C();return a}
$("body").ready(function(){z();y();$("#severity").change(function(){y();r=$("#severity input[type=radio]:checked").attr("severity-value");z();window.external.EditorFormDataChanged("")});$("input[data-type=section-switch]").click(function(){$(this).parent().css("opacity",this.checked?1:.5)});window.external.WebBrowserDocumentLoaded();var a={selector:"div.editable",skin:"lightgray",menu:{edit:{title:"Edit",items:"undo redo | cut copy paste pastetext | selectall | searchreplace"},insert:{title:"Insert",
items:"link | charmap insertdatetime"},view:{title:"View",items:"visualblocks visualaid"},format:{title:"Format",items:"bold italic underline strikethrough superscript subscript | removeformat"},tools:{title:"Tools",items:"code"}},inline:!0,plugins:["advlist autolink lists link charmap","searchreplace visualblocks code fullscreen","insertdatetime paste spellchecker"],toolbar:"undo redo | styleselect | bold italic | bullist numlist outdent indent | link | spellchecker",entity_encoding:"raw",removeformat:[{selector:"b,strong,em,i,font,u,strike,br,hr,div,p",
remove:"all",split:!0,expand:!1,block_expand:!0,deep:!0}],init_instance_callback:function(){u=m(C())},spellchecker_callback:function(b,a,c){a=a.match(this.getWordCharPattern());if("spellcheck"==b){b={___hackforsuccesspopup___:"___hackforsuccesspopup___"};for(var e=0;e<a.length;e++){var f=window.external.CheckSpelling(a[e]);f&&(b[a[e]]=f.split(","))}c(b)}},spellchecker_languages:"English=en",setup:function(b){b.on("focus",function(){var a=$("#"+b.id).parent().find("h2").first().html();if(a.indexOf(">"))var c=
a.split(">"),a=c[c.length-1];var e=setTimeout(function(){var b=$(".mce-menubtn[role=menuitem]").parent().parent().parent().parent();b.prepend($('<span class="mce-label" section-header style="font-weight: bold; width:100%; text-align:center;text-transform:none;">'+a+"</span>"));b.css("height","85px");b.animate({top:"-=18"},1,function(){});clearTimeout(e)},100)});b.on("blur",function(){var a=$(".mce-menubtn[role=menuitem]").parent().parent().parent().parent();$("span[section-header]").remove();a.animate({top:"+=18"},
1,function(){})})}};editorEnabled?(tinymce.init(a),x.init("editableReference"),D()):($("input").prop("readonly",!0),$("input[data-type=section-switch]").remove(),$("div.editable").css("border-style","none"),$("select").attr("disabled",!0),$(document).click(function(a){a.preventDefault()}));E()});function F(){$("select[metric-code]").css("width","100%").css("padding","2px 4px 2px 4px")}
function E(){$("#cvss30Button").click(function(){$("#cvssLayout").toggle();$("#cvss31Layout").hide();F()});$("#cvss31Button").click(function(){$("#cvss31Layout").toggle();$("#cvssLayout").hide();F()});advancedModeEnabled?$("tr[metric-type]").change(F):$("tr[metric-type=base]").children("td.val").children("select[metric-code]").attr("disabled",!0)}
function B(a,b){for(var d=$("#"+a+" select[metric-code]"),c=["CVSS:"+b],e=1,f=0;f<d.length;f++){var g=$(d[f]),h=g.attr("metric-code"),g=g.val();null!=g&&"X"!=g&&(c[e++]=h+":"+g)}return c.join("/")}function G(){$("tr[undefined cvss-row]").hide();$("#undefined").hide()}function H(){if(!x.f){K();var a=C();m(a)!=u?window.external.EditorFormDataChanged(a):D()}}function D(){setTimeout(function(){$("#container").bind("DOMSubtreeModified",function(){H()})},50);$("input").change(H);$("select").change(H)}
function K(){$("#container").unbind("DOMSubtreeModified");$("input").unbind("change",H);$("select").unbind("change",H)}window.saveChanges=function(){var a=C(!0);window.external.SaveTemplateChanges(a)};
window.setupEditor=function(a,b,d,c,e,f,g,h,I,J,L,w){$("#vulnerabilityDescription").html(a);null!=w&&0<w.length?$("#customVulnerabilityGuidField").html(w):$("#customVulnerabilityGuidDiv").hide();"information"==b.toLowerCase()?$("tr[information-only]").show():$("tr[information-only]").hide();a=$("#severity input[type=radio][severity-value="+b.toLowerCase()+"]");a.prop("checked",!0);$("#severity").val(a.val());y();r=a.attr("severity-value");z();$("input[name=pci32]").val(d);$("input[name=wasc]").val(h);
$("input[name=cwe]").val(f);$("input[name=capec]").val(g);$("input[name=owasp2013]").val(c);$("input[name=owasp2017]").val(e);$("input[name=hipaa]").val(I);$("input[name=iso27001]").val(J);$("input[name=owaspProactiveControls]").val(L)};window.setSectionEnabled=function(a,b){$("#"+a).prop("checked",b);$("#"+a).parent().css("opacity",b?1:.5)};window.unregisterOnChangeHandlers=K;
window.setCvssMetrics=function(a,b,d){if(a||advancedModeEnabled)if(a=a.split("/"),!advancedModeEnabled&&(1>=a.length||a[0]!=b))G();else for(b=1;b<a.length;b++){var c=a[b].split(":");$("#"+d+" select[metric-code="+c[0]+"]").val(c[1])}else G()};window.getCvssVectorString=B;})(window);