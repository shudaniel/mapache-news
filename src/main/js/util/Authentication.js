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
		if(sessionStorage.getItem(timelineid)){
			return true;
		}
		//if there is no password
		if(correct == ''|| correct == undefined){
			return true;
		}
		
		
		//check to see if the user has already authenticated or not (caching)
		
		
		//if there is a password, and the user has not already authenticated
		//then prompt them for the password
		var password=prompt('Enter the password for this timeline:',' ');
		console.log("input: " + password);
		console.log("correct: " + correct);
		
		
		if(password == correct){
			return true;
			sessionStorage.setItem(timelineid,true);
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
      .then((findresponse)=>{
		  console.log(findresponse)
		  return findresponse.timelines[timelineid]['password']
	  });
}

export default authenticate;