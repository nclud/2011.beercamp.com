// BeerCamp at SXSW 2011
// by nclud

/*jshint undef: true, curly: true, asi: false, browser: true, eqeqeq: true */

(function( window, document, $, Modernizr ){

// check if browser is iOS -> iPhone / iPad / iPod Touch
var isIOS = !!('createTouch' in document);

var transformProp = Modernizr.prefixed('transform');

// BeerCamp '11 Global constructor
// don't necessarily need the constructor, but I like using the 'this' keyword
function Beercamper() {
  // properties
  this.scrolled = 0;
  this.currentLevel = 0;
  this.levels = 7;
  this.distance3d = 1000;
  this.levelGuide = {
    '#intro' : 0,
    '#featuring' : 1,
    '#sponsorz' : 2,
    '#flip-cup' : 3,
    '#teams' : 4
  };
  
  // cache some jQuery objects
  this.$window = $(window);
  this.$document = $(document);
  
  // which method should be used to return CSS transform styles
  this.getScrollTransform = Modernizr.csstransforms3d ? 
    this.getScroll3DTransform : this.getScroll2DTransform;
  
  // bind constructor to window.scroll event
  if ( Modernizr.csstransforms ) {
    window.addEventListener( 'scroll', this, false);
  }
  
}

// enables constructor to be used within event listener
// like obj.addEventListener( eventName, this, false )
Beercamper.prototype.handleEvent = function( event ) {
  if ( this[event.type] ) {
    this[event.type](event);
  }
};

Beercamper.prototype.getScroll2DTransform = function( scroll ) {
  // 2D scale is exponential
  var scale = Math.pow( 3, scroll * (this.levels - 1) );
  return 'scale(' + scale + ')';
};

Beercamper.prototype.getScroll3DTransform = function( scroll ) {
  var z = ( scroll * (this.levels - 1) * this.distance3d ),
      // how close are we to the nearest level
      leveledZ = this.distance3d / 2 - Math.abs( ( z % this.distance3d ) - this.distance3d / 2 ),
      style;
  
  // if close to nearest level, 
  // ensures that text doesn't get fuzzy after nav is clicked
  if ( leveledZ < 5 ) {
    z = Math.round( z / this.distance3d ) * this.distance3d;
  }
  
  return 'translate3d( 0, 0, ' + z + 'px )';
};

Beercamper.prototype.scroll = function( event ) {

  // normalize scroll value from 0 to 1
  this.scrolled = this.$window.scrollTop() / ( this.$document.height() - this.$window.height() );

  this.transformScroll( this.scrolled );

  // change current selection on nav
  this.currentLevel = Math.round( this.scrolled * (this.levels-1) );
  
  if ( this.currentLevel !== this.previousLevel && this.$nav ) {
    this.$nav.find('.current').removeClass('current');
    if ( this.currentLevel < 5 ) {
      this.$nav.children().eq( this.currentLevel ).addClass('current');
    }
    this.previousLevel = this.currentLevel;
  }
  
};

// where the magic happens
// applies transform to content from position of scroll
Beercamper.prototype.transformScroll = function( scroll ) {
  // bail out if content is not there yet
  if ( !this.$content ) {
    return;
  }

  var style = {};
  style[ transformProp ] = this.getScrollTransform( scroll );
  this.$content.css( style );
};

// handle click events
Beercamper.prototype.click = function( event ) {
  //  get scroll based on href of clicked nav item
  var hash = event.target.hash || event.target.parentNode.hash,
      targetLevel = this.levelGuide[ hash ],
      scroll = targetLevel / (this.levels-1);

  // turn on transitions and add event listeners for its end
  if ( Modernizr.csstransitions ) {
    this.$content.addClass('transitions-on');
    this.$content[0].addEventListener( 'webkitTransitionEnd', this, false );
    this.$content[0].addEventListener( 'oTransitionEnd', this, false );
    this.$content[0].addEventListener( 'transitionend', this, false );
  }

  // set scrollbar position
  // this will trigger window scroll event -> Beercamper.prototype.scroll
  this.$window.scrollTop( scroll * ( this.$document.height() - this.$window.height() ) );

  // iOS doesn't have scrollbar, so we have to manually trigger it
  if ( isIOS ) {
    this.transformScroll( scroll );
  }

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

// disables transition after nav click
Beercamper.prototype.transitionEnded = function( event ) {
  this.$content.removeClass('transitions-on');
  this.$content[0].removeEventListener( 'webkitTransitionEnd', this, false );
  this.$content[0].removeEventListener( 'transitionend', this, false );
  this.$content[0].removeEventListener( 'oTransitionEnd', this, false );
};


$(function(){

  // BeerCamp '11 Global object
  // initialize Beercamper
  var BCXI = new Beercamper();

  BCXI.$content = $('#content');
  BCXI.$nav = $('#nav');

  var $body = $('body'),
      iOSclass = isIOS ? 'ios' : 'no-ios';

  $body.addClass( iOSclass );

  if ( Modernizr.csstransforms ) {
    $('.page-nav').each(function(){
      this.addEventListener( 'click', BCXI, false );
    });
  }
   
  //  INCEPTION
  $('#totem').click(function(){
    var $audio = $('<audio />', { 
      autoPlay : 'autoplay'
    });

    $('<source>', {
      src : 'audio/inception.mp3'
    }).appendTo( $audio );

    $('<source>', {
      src : 'audio/inception.ogg'
    }).appendTo( $audio );

    $body.append( $audio );
    setTimeout( function( $audio ){
      $audio.remove();
    }, 4000, $audio );

    $('#intro h1').addClass('beerception').text('Beerception');
    $('#intro .blurb').text('A party within a dream');
  });
  
});


})( window, window.document, window.jQuery, window.Modernizr );