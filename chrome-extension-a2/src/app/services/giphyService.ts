import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class GiphyService {
	constructor(private _http: Http) {
	}

	getRandom(search) : Promise<string> {
		var url = `http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${search}&rating=pg`;

		return this._http.get(url)
			.map(response => {
				return response.json().data.url ? response.json().data.url + '/fullscreen' : null;
			})
			.toPromise()
			.catch(this.handleError);
	}
	
	private handleError(error: Response){
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}