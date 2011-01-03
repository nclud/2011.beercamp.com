$(function(){
  
  var section = 'intro';
  
  $('.nav a').click(function(){
    
    var oldSection = section;
    section = $(this).attr('href').slice(1);
    
    $(document.body).removeClass( oldSection ).addClass( section );

    window.location.hash = '#' + section;    
    
    return false;

  });
  
  
});