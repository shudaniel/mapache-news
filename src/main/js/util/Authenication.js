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
	getCorrectPassword(timelineid)
}



/**
 * Queries the database to find the correct password
 * @param {string} timelineid  
 * @return {string}
 */
function getCorrectPassword(timelineid){
	fetch(url)
      .then((response) => response.json())
      .then((findresponse)=>{
        return findresponse.timelines['password'];
	})
}