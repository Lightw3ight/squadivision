(() => {
	class GiphyService {
		constructor($http) {
			this.$http = $http;
		}

		getRandom(search) {
			var url = `http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${search}&rating=pg`;

			return this.$http.get(url).then((result => {
				return result.data.data.url ? result.data.data.url + '/fullscreen' : null;
			}));

			// 		request('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + search + '&rating=pg', function (error, response, body) {
			//     if (!error && response.statusCode == 200) {
			//       var image = JSON.parse(body).data.image_original_url;
			//       res.render('index', { image: image });
			//     }

		}
	}

	function factory($http) {
		return new GiphyService($http);
	}

	angular.module('app').service('giphyService', factory);
})();