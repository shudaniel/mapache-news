/*
Utility script to handle authentication in timelines
(Will be) Used By: Timeline.js, ArticleForm.js
*/

/**
 * checks whether the user has access to the given timeline id, attempts to authenticate them if they do not
 * @param {string} timelineid  
 * @return {boolean}
 */
function authenticate(timelineid){
	console.info('authenticating...')
	return getCorrectPassword(timelineid).then((correct) => {
		
		//if there is no password
		if(correct == ''){
			return true;
		}
		
		//check to see if the user has already authenticated or not (caching)
		
		
		//if there is a password, and the user has not already authenticated
		//then prompt them for the password
		var password=prompt('Enter the password for this timeline:',' ');
		if(password == correct){
			return true;
		}
		return false;
	});
}



/**
 * Queries the database to find the correct password
 * @param {string} timelineid  
 * @return {string}
 */
function getCorrectPassword(timelineid){
	var url = window.location.origin?window.location.origin+'/':window.location.protocol+'/'+window.location.host+'/';
    url = url + "all";
	return fetch(url)
      .then((response) => response.json())
      .then((findresponse)=>findresponse.timelines['password']);
}

export default authenticate;