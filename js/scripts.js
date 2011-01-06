


// BeerCamp '11 Global constructor
// don't necessarily need the constructor, but I like using the 'this' keyword
var Beercamper = function() {
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
  
  // adjustment for faux 3d
  this.levelAdjust = Modernizr.csstransforms && !Modernizr.csstransforms3d ? 0.4 : 0;
  console.log( this.levelAdjust )
  
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
  var z = ( scroll * (this.levels - 1) * this.distance3d ),
      leveledZ = this.distance3d / 2 - Math.abs( ( z % this.distance3d ) - this.distance3d / 2 ),
      style;
  
  if ( leveledZ < 5 ) {
    z = Math.round( z / this.distance3d ) * this.distance3d;
  }
  
  style = {
    WebkitTransform : 'translate3d( 0, 0, ' + z + 'px )'
  };
  return style;
};

Beercamper.prototype.scroll = function( event ) {

  this.scrolled = this.$window.scrollTop() / ( this.$document.height() - this.$window.height() );

  this.transformScroll( this.scrolled );


  // change current selection on nav
  this.currentLevel = Math.round( this.scrolled * this.levels - this.levelAdjust );
  
  if ( this.currentLevel !== this.previousLevel && this.$nav ) {
    this.$nav.find('.current').removeClass('current');
    if ( this.currentLevel < 5 ) {
      this.$nav.children().eq( this.currentLevel ).addClass('current');
    }
  }
  
};

Beercamper.prototype.transformScroll = function( scroll ) {
  // console.log('transform scroll ', scroll )
  this.$content.css( this.getScrollTransform( scroll ) );
};

Beercamper.prototype.click = function( event ) {
  this.navCursorStart( event.target );
};

// handle click events
Beercamper.prototype.click = function( event ) {

  console.log( event.target.getAttribute('href') )

  //  nav click event
  var targetLevel = this.levelGuide[ event.target.getAttribute('href') ],
      scroll = targetLevel / (this.levels-1);

  if ( Modernizr.csstransitions ) {
    console.log('transitions on')
    this.$content.addClass('transitions-on');
  
    this.content.addEventListener( 'webkitTransitionEnd', this, false );
    this.content.addEventListener( 'transitionend', this, false );
    this.content.addEventListener( 'oTransitionEnd', this, false );
  }


  this.$window.scrollTop( scroll * ( this.$document.height() - this.$window.height() ) );

  if ( this.isIOS ) {
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

Beercamper.prototype.transitionEnded = function( event ) {
  this.$content.removeClass('transitions-on');
  this.content.removeEventListener( 'webkitTransitionEnd', this, false );
  this.content.removeEventListener( 'transitionend', this, false );
  this.content.removeEventListener( 'oTransitionEnd', this, false );
};


// BeerCamp '11 Global object
var BCXI = new Beercamper();

BCXI.isIOS = !!('createTouch' in document);



$(function(){
  

  
  
  BCXI.$content = $('#content');
  BCXI.content = document.getElementById('content');
  BCXI.$nav = $('#nav');
  
  
  $body = $('body');
  
  var iOSclass = BCXI.isIOS ? 'ios' : 'no-ios';
  $body.addClass( iOSclass );

  if ( Modernizr.csstransforms ) {
    $('.page-nav').each(function(){
      this.addEventListener( 'click', BCXI, false );
    });
    
    $('#start-sign-up').click(function(){
      $body.addClass('sign-up');
      return false;
    })
    
    $('#sign-up-form .close a').click(function(){
      $body.removeClass('sign-up');
      return false;
    });
  }
    
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
      // $audio.remove();
    }, 4000, $audio );

    $('#intro h1').addClass('beerception').text('Beerception');
    $('#intro .blurb').text('A party within a dream');
  });
  
});