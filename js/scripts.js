// BeerCamp '11 Global constructor
var Beercamper = function() {
  this.scrolled = 0;
  this.levels = 5;
  this.distance3d = 1000;
  
  this.$window = $(window);
  this.$document = $(document);
  
  this.getScrollTransform = Modernizr.csstransforms3d ? 
    this.getScroll3DTransform : this.getScroll2DTransform;
  
  
  window.addEventListener( 'scroll', this, false);
  
  // console.log( this )
  
};

Beercamper.prototype.handleEvent = function( event ) {
  if ( this[event.type] ) {
    this[event.type](event);
  }
};

Beercamper.prototype.getScroll2DTransform = function() {
  var scale = Math.pow( 3, this.scrolled * (this.levels - 1) );
      prop = 'scale(' + scale + ')',
      style = {
        WebkitTransform : prop,
        MozTransform : prop,
        OTransform : prop,
        transform : prop
      };
  return style;
};

Beercamper.prototype.getScroll3DTransform = function() {
  var style = {
    WebkitTransform : 'translate3d( 0, 0, ' + (this.scrolled * (this.levels - 1) * this.distance3d ) + 'px )'
  };
  return style;
};

Beercamper.prototype.scroll = function( event ) {
  this.getScroll();
  
  this.$content.css( this.getScrollTransform() )
  
};

Beercamper.prototype.getScroll = function() {

  // console.log( this )

  this.scrolled = this.$window.scrollTop() / ( $(document).height() - $(window).height() ); 

  // console.log( this.scrolled );
  
};

Beercamper.prototype.jQueryReady = function() {


  
  // console.log( this.$window.scrollTop() )

};

if ( Modernizr.csstransforms ) {
  // BeerCamp '11 Global object
  var BCXI = new Beercamper();
  
}


$(function(){
  
  if ( BCXI ) {
    
    BCXI.$content = $('#content');

  }
  
  var section = 'intro';

  $('.nav a').click(function(){
    
    var oldSection = section;
    section = $(this).attr('href').slice(1);
    
    $(document.body).removeClass( oldSection ).addClass( section );

    // window.location.hash = '#' + section;    
    
    return false;

  });
  
  // console.log( Modernizr )
  
  
});