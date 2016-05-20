import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

import {UrlTransformService, IUrlResult} from '../services/urlTransformService';

@Component({
	selector: 'broadcast-bar',
	templateUrl: '/app/popup/broadcastBarComponent.html'
})
export class BroadcastBarComponent implements OnInit {
	@Output() broadcast = new EventEmitter<IUrlResult>();
	currentUrl: string;
	broadcastValue: string;

	constructor(private urlTransformService: UrlTransformService) {
	}

	ngOnInit() {
		this.getCurrentTabUrl(url => {
			  this.currentUrl = url;
		});
	}

	sendUrl(value) {
		
		this.urlTransformService.getUrl(value || this.currentUrl).then(transformedValue => {
			this.broadcast.emit(transformedValue);
		});
	}

	getCurrentTabUrl(callback) {
		// Query filter to be passed to chrome.tabs.query - see
		// https://developer.chrome.com/extensions/tabs#method-query
		var queryInfo = {
			active: true,
			currentWindow: true
		};

		chrome.tabs.query(queryInfo, function (tabs) {
			// chrome.tabs.query invokes the callback with a list of tabs that match the
			// query. When the popup is opened, there is certainly a window and at least
			// one tab, so we can safely assume that |tabs| is a non-empty array.
			// A window can only have one active tab at a time, so the array consists of
			// exactly one tab.
			var tab = tabs[0];

			// A tab is a plain object that provides information about the tab.
			// See https://developer.chrome.com/extensions/tabs#type-Tab
			var url = tab.url;

			// tab.url is only available if the "activeTab" permission is declared.
			// If you want to see the URL of other tabs (e.g. after removing active:true
			// from |queryInfo|), then the "tabs" permission is required to see their
			// "url" properties.
			console.assert(typeof url == 'string', 'tab.url should be a string');

			callback(url);
		});
	}
}