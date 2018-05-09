//Code taken from this tutorial: https://github.com/spring-guides/tut-react-and-spring-data-rest/tree/master/basic

define(function(require) {
	'use strict';

	var interceptor = require('rest/interceptor');

	return interceptor({
		request: function (request /*, config, meta */) {
			/* If the URI is a URI Template per RFC 6570 (http://tools.ietf.org/html/rfc6570), trim out the template part */
			if (request.path.indexOf('{') === -1) {
				return request;
			} else {
				request.path = request.path.split('{')[0];
				return request;
			}
		}
	});

});