(function($){
  var cache = {},

  timeOut = 'timeOut',

  aps = Array.prototype.slice;

  $[timeOut] = function() {
    return out.apply( window, [ 0 ].concat( aps.call( arguments ) ) );
  };

  $.fn[timeOut] = function() {
    var args = aps.call( arguments ),
      result = out.apply( this, [ timeOut + args[0] ].concat( args ) );

    return typeof args[0] === 'number' || typeof args[1] === 'number'
      ? this
      : result;
  };

  function out( jquery_data_key ) {
    var that = this,elem,data = {},

      method_base = jquery_data_key ? $.fn : $,

      args = arguments,
      slice_args = 4,

      id        = args[1],
      delay     = args[2],
      callback  = args[3];

    if ( typeof id !== 'string' ) {
      slice_args--;

      id        = jquery_data_key = 0;
      delay     = args[1];
      callback  = args[2];
    }

    if ( jquery_data_key ) {

      elem = that.eq(0);
      elem.data( jquery_data_key, data = elem.data( jquery_data_key ) || {} );

    } else if ( id ) {
      data = cache[ id ] || ( cache[ id ] = {} );
    }

    data.id && clearTimeout( data.id );
    delete data.id;

    function clean() {
      if ( jquery_data_key ) {
        elem.removeData( jquery_data_key );
      } else if ( id ) {
        delete cache[ id ];
      }
    };

    function actually() {
      data.id = setTimeout( function(){ data.fn(); }, delay );
    };

    if ( callback ) {
      data.fn = function( no_polling_loop ) {

        if ( typeof callback === 'string' ) {
          callback = method_base[ callback ];
        }

        callback.apply( that, aps.call( args, slice_args ) ) === true && !no_polling_loop ? actually() : clean();
      };

      actually();

    } else if ( data.fn ) {

      delay === undefined ? clean() : data.fn( delay === false );
      return true;

    } else {

      clean();
    }

  };

})(jQuery);
