import { Component, Signal, computed, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Model } from '../../core/model/model';
import { ModelService } from '../../core/services/model.service';
import { AsyncPipe } from '@angular/common';
import { Color } from '../../core/model/color';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'app-first-step',
	standalone: true,
	imports: [AsyncPipe, ReactiveFormsModule],
	templateUrl: './first-step.component.html',
	styleUrl: './first-step.component.scss'
})
export class FirstStepComponent {

	private modelService = inject(ModelService);

	models$: Observable<Model[]>;
	models: Model[] = [];
	colors: Signal<Color[]>;
	modelCode: FormControl<string | null>;
	colorCode: FormControl<string | null>;

	constructor() {
		this.modelCode = new FormControl(this.modelService.model()?.code ?? null);
		this.colorCode = new FormControl(this.modelService.color()?.code ?? null);
		this.colors = computed(() => this.modelService.model()?.colors ?? []);
		this.models$ = this.modelService.getModels().pipe(
			tap(models => this.models = models)
		);

		this.modelCode.valueChanges.pipe(takeUntilDestroyed())
			.subscribe(modelCode => {
				this.modelService.model = this.models.find(model => model.code == modelCode) ?? null;
				
				const newColors = this.modelService.model()?.colors ?? [];
				const newColor = newColors.find(color => color.code == this.modelService.color()?.code) ?? newColors[0] ?? null;
				this.colorCode.setValue(newColor?.code ?? null);

				this.modelService.color = newColor;
				this.modelService.config = null;
				this.modelService.towHitch = false;
				this.modelService.yoke = false;
			});

		this.colorCode.valueChanges.pipe(takeUntilDestroyed())
			.subscribe(colorCode => {
				this.modelService.color = this.colors()?.find(color => color.code == colorCode) ?? null;
			});
	}
}
