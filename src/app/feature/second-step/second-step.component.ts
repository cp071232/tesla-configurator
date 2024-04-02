import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, Signal, computed, inject } from '@angular/core';
import { ModelService } from '../../core/services/model.service';
import { Observable, tap } from 'rxjs';
import { Options } from '../../core/model/options';
import { Config } from '../../core/model/config';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'app-second-step',
	standalone: true,
	imports: [AsyncPipe, CurrencyPipe, ReactiveFormsModule],
	templateUrl: './second-step.component.html',
	styleUrl: './second-step.component.scss'
})
export class SecondStepComponent {

	private modelService = inject(ModelService);

	options$: Observable<Options>;
	options?: Options;
	config: Signal<Config | null>;
	modelCode: string | undefined;
	configId: FormControl<number | null>;
	hasTowHitch: FormControl<boolean>;
	hasYoke: FormControl<boolean>;

	constructor() {
		this.configId = new FormControl<number | null>(this.modelService.config()?.id ?? null);
		this.hasTowHitch = new FormControl(this.modelService.towHitch(), { nonNullable: true });
		this.hasYoke = new FormControl(this.modelService.yoke(), { nonNullable: true });
		this.config = computed(() => this.modelService.config());
		this.modelCode = this.modelService.model()?.code;

		this.options$ = this.modelService.getOptionsByModelCode(this.modelCode).pipe(
			tap(options => this.options = options)
		);

		this.configId.valueChanges.pipe(takeUntilDestroyed())
			.subscribe(id => {
				this.modelService.config = this.options?.configs.find(config => config.id == id) ?? null;
			});

		this.hasTowHitch.valueChanges.pipe(takeUntilDestroyed())
			.subscribe(value => this.modelService.towHitch = value);

		this.hasYoke.valueChanges.pipe(takeUntilDestroyed())
			.subscribe(value => this.modelService.yoke = value);
	}
}
