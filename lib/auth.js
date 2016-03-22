var redis = require('redis');
var shortid = require('shortid');


var redis_client = redis.createClient();

redis_client.on('connect', function() {
  console.log('Connected to redis..');
});




/**
 * [get_token description]
 * 
 * @param  {[type]} t [description]
 * 
 * @return {[type]}   [description]
 */
function get_token(t) {

  var t = (typeof t !== 'undefined') ?  t : false;

  if ( is_valid_token(t) ) {

    console.log('old token was legit.');

    token = t;

  } else {

    console.log('old token was bad.');

    var new_token = shortid.generate();

    token = set_token(new_token);

  }

  return token;

} // get_token









/**
 * [set_token description]
 * @param {[type]} t [description]
 */
function set_token(t) {

  var t = (typeof t !== 'undefined') ?  t : false;

  if ( shortid.isValid(t) ) {

    redis_client.set(t, 'SoonToBeHashedAndSaltedPassword');

    console.log('I set the token in redis.');

    return t;

  } else {

    console.log('The token stored in redis was invalid');

    return false;

  }

}





/**
 * [is_valid_token description]
 * @return {Boolean} [description]
 */
function is_valid_token(t) {

  var t = (typeof t !== 'undefined') ?  t : false;

  if ( shortid.isValid(t) ) {

    console.log('old token ('+ t +') was a valid shortid.. checking redis.');

    // Get the hashed value of our token
    // and test its validity.
    redis_client.get(t, function(err, reply) {

      console.log('redis value: ' + reply);

      if ( reply !== null ) {

        console.log('redis looked good. VALID TOKEN.');

        // !!!! This is where i need to validate
        // !!!! the hashed value.
        return true;

      } else {

        console.log('I didnt find this token in redis. Returning Invalid.');

        return false;

      }



    });

  } else {

    console.log('the old token ('+ t +') was an invalid shortid. Returning Invalid.');

    return false;

  }


}





module.exports.get_token = get_token;
