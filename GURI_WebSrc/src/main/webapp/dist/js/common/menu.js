$(document).ready(function() {
$(".btn_menu").click(function() {
  $("#menu,.page_cover,html").addClass("open");
  //window.location.hash = "#open";
});

window.onhashchange = function() {
  if (location.hash != "#open") {
    $("#menu,.page_cover,html").removeClass("open");
  }
};
$("#menuClose").click(function(){
	$("#menu,.page_cover,html").removeClass("open");
})
});