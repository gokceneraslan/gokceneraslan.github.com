//<![CDATA[
$(document).ready(function(){
  // Highlight the navbar link that corresponds to the current page
  // simply by making it not a link
  var pathname = window.location.pathname;

  if (pathname == "/") {
    $("a#home").replaceWith("Gökçen Eraslan");
  }
  else if (pathname.match("/notes/")) {
    $("a#notes").replaceWith("notlar");
  }
  else if (pathname.match("/about/")) {
    $("a#about").replaceWith("hakkımda");
  }
});
//]]>
