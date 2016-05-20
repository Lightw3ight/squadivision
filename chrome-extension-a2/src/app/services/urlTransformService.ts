import {Injectable} from '@angular/core';
import {GiphyService} from './giphyService';

export interface IUrlResult {
	type: string;
	url: string;
}

@Injectable()
export class UrlTransformService {
	jiraRegEx = /^[a-z,A-Z]{3,4}-[0-9]+$/;
	urlRegex = /^https?:\/\//;
	youTubeRegex = /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.)?youtube\.com\/watch(?:\.php)?\?.*v=)([a-zA-Z0-9\-_]+)/;

	constructor(private giphyService: GiphyService) {
	}

	getUrl(search): Promise<IUrlResult> {
		if (this.isYouTube(search)) {
			var matches = this.youTubeRegex.exec(search);
			return Promise.resolve<IUrlResult>({ type: 'url', url: `https://www.youtube.com/embed/${matches[1]}?rel=0&autoplay=1` });
		}
		
		if (this.isUrl(search)) {
			return Promise.resolve<IUrlResult>({ type: 'url', url: search });
		}

		if (this.isJiraId(search)) {
			return Promise.resolve<IUrlResult>({ type: 'jira', url: `https://jira.trade.me/browse/${search}` });
		}

		return this.giphyService.getRandom(search).then(url => {
			return Promise.resolve<IUrlResult>({ type: 'url', url: url });
		});
	}

	isJiraId(value): boolean {
		return this.jiraRegEx.test(value);
	}

	isYouTube(value) {
		return this.youTubeRegex.test(value);
	}

	isUrl(value): boolean {
		return this.urlRegex.test(value);
	}
}