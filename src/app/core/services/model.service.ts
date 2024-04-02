import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Model } from '../model/model';
import { Options } from '../model/options';
import { Color } from '../model/color';
import { Config } from '../model/config';

@Injectable({
	providedIn: 'root'
})
export class ModelService {

	private http = inject(HttpClient);

	private _color = signal<Color | null>(null);
	get color(): Signal<Color | null> {
		return this._color;
	}
	set color(color: Color | null) {
		this._color.set(color);
	}

	private _model = signal<Model | null>(null);
	get model(): Signal<Model | null> {
		return this._model;
	}
	set model(model: Model | null) {
		this._model.set(model);
	}

	private _config = signal<Config | null>(null);
	get config(): Signal<Config | null> {
		return this._config;
	}
	set config(config: Config | null) {
		this._config.set(config);
	}

	private _towHitch = signal<boolean>(false);
	get towHitch(): Signal<boolean> {
		return this._towHitch;
	}
	set towHitch(towHitch: boolean) {
		this._towHitch.set(towHitch);
	};

	private _yoke = signal<boolean>(false);
	get yoke(): Signal<boolean> {
		return this._yoke;
	};
	set yoke(yoke: boolean) {
		this._yoke.set(yoke);
	};

	getModels(): Observable<Model[]> {
		return this.http.get<Model[]>(`/models`);
	}

	getOptionsByModelCode(modelCode: string | undefined): Observable<Options> {
		return this.http.get<Options>(`options/${modelCode}`)
	}
}
