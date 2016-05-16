(() => {
	class UrlTransformService {
		constructor($q, giphyService) {
			this.$q = $q;
			this.giphyService = giphyService;
			this.jiraRegEx = /^[a-z,A-Z]{3,4}-[0-9]+$/;
			this.urlRegex = /^https?:\/\//;
		}

		getUrl(search) {
			if (this.isUrl(search)) {
				return this.$q.when({type: 'url', url: search});
			}

			if (this.isJiraId(search)) {
				return this.$q.when({type: 'jira', url: `https://jira.trade.me/browse/${search}`});
			}

			return this.giphyService.getRandom(search).then(url =>{
				return {type: 'giphy', url: url};
			});
		}

		isJiraId(value) {
			return this.jiraRegEx.test(value);
		}

		isUrl(value) {
			return this.urlRegex.test(value);
		}
	}

	function factory($q, giphyService) {
		return new UrlTransformService($q, giphyService);
	}

	angular.module('app').service('urlTransformService', factory);
})();