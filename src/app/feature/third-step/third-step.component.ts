import { Component, Signal, computed, inject } from '@angular/core';
import { ModelService } from '../../core/services/model.service';
import { CurrencyPipe } from '@angular/common';
import { Color } from '../../core/model/color';
import { Model } from '../../core/model/model';
import { Config } from '../../core/model/config';

@Component({
	selector: 'app-third-step',
	standalone: true,
	imports: [CurrencyPipe],
	templateUrl: './third-step.component.html',
	styleUrl: './third-step.component.scss'
})
export class ThirdStepComponent {

	private modelService = inject(ModelService);

	color: Signal<Color | null>;
	model: Signal<Model | null>;
	config: Signal<Config | null>;
	hasTowHitch: Signal<boolean | null>;
	hasYoke: Signal<boolean | null>;
	total: Signal<number>;

	constructor() {
		this.color = computed(() => this.modelService.color());
		this.model = computed(() => this.modelService.model());
		this.config = computed(() => this.modelService.config());
		this.hasTowHitch = computed(() => this.modelService.towHitch());
		this.hasYoke = computed(() => this.modelService.yoke());

		this.total = computed(() => {
			const configPrice = this.config()?.price ?? 0;
			const colorPrice = this.color()?.price ?? 0;
			const towHitch = this.hasTowHitch() ? 1000 : 0;
			const yoke = this.hasYoke() ? 1000 : 0;
			return configPrice + colorPrice + towHitch + yoke;
		});
	}
}
