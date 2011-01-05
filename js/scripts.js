// BeerCamp '11 Global constructor
// don't necessarily need the constructor, but I like using the 'this' keyword
var Beercamper = function() {
  this.scrolled = 0;
  this.levels = 5;
  this.distance3d = 1000;
  
  this.$window = $(window);
  this.$document = $(document);
  
  this.getScrollTransform = Modernizr.csstransforms3d ? 
    this.getScroll3DTransform : this.getScroll2DTransform;
  
  if ( Modernizr.csstransforms ) {
    window.addEventListener( 'scroll', this, false);
  }
  
};

Beercamper.prototype.handleEvent = function( event ) {
  if ( this[event.type] ) {
    this[event.type](event);
  }
};

Beercamper.prototype.getScroll2DTransform = function( scroll ) {
  var scale = Math.pow( 3, scroll * (this.levels - 1) );
      prop = 'scale(' + scale + ')',
      style = {
        WebkitTransform : prop,
        MozTransform : prop,
        OTransform : prop,
        transform : prop
      };
  return style;
};

Beercamper.prototype.getScroll3DTransform = function( scroll ) {
  var style = {
    WebkitTransform : 'translate3d( 0, 0, ' + ( scroll * (this.levels - 1) * this.distance3d ) + 'px )'
  };
  return style;
};

Beercamper.prototype.scroll = function( event ) {
  this.getScroll();
  this.transformScroll( this.scrolled );
};

Beercamper.prototype.transformScroll = function( scroll ) {
  // console.log('transform scroll ', scroll )
  this.$content.css( this.getScrollTransform( scroll ) );
};

Beercamper.prototype.getScroll = function() {

  this.scrolled = this.$window.scrollTop() / ( this.$document.height() - this.$window.height() ); 
  
};

// handle click events
Beercamper.prototype.click = function( event ) {

  //  nav click event
  var targetLevel = $(event.target).parent().index(),
      scroll = targetLevel / (this.levels-1);

  if ( Modernizr.csstransitions ) {
    this.$content.addClass('transitions-on');
  
    this.content.addEventListener( 'webkitTransitionEnd', this, false );
    this.content.addEventListener( 'transitionend', this, false );
    this.content.addEventListener( 'oTransitionEnd', this, false );
  }


  this.$window.scrollTop( scroll * ( this.$document.height() - this.$window.height() ) );


  event.preventDefault();
  
};


Beercamper.prototype.webkitTransitionEnd = function( event ) {
  this.transitionEnded( event );
};

Beercamper.prototype.transitionend = function( event ) {
  this.transitionEnded( event );
};

Beercamper.prototype.oTransitionEnd = function( event ) {
  this.transitionEnded( event );
};

Beercamper.prototype.transitionEnded = function( event ) {
  this.$content.removeClass('transitions-on');
  this.content.removeEventListener( 'webkitTransitionEnd', this, false );
  this.content.removeEventListener( 'transitionend', this, false );
  this.content.removeEventListener( 'oTransitionEnd', this, false );
};


// BeerCamp '11 Global object
var BCXI = new Beercamper();



$(function(){
  
  BCXI.$content = $('#content');
  BCXI.content = document.getElementById('content');

  if ( Modernizr.csstransforms ) {
    $('.nav a').each(function(){
      this.addEventListener( 'click', BCXI, false );
    });
    
  }
    
  var section = 'intro';


  // $('.nav a').click(function(){
  //   
  //   var oldSection = section;
  //   section = $(this).attr('href').slice(1);
  //   
  //   $(document.body).removeClass( oldSection ).addClass( section );
  // 
  //   // window.location.hash = '#' + section;
  //   
  //   return false;
  // 
  // });
  
  // console.log( Modernizr )
  
  
});