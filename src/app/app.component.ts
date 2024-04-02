import { Component, Signal, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { ModelService } from './core/services/model.service';
import { Model } from './core/model/model';
import { Color } from './core/model/color';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterModule, NavbarComponent],
	templateUrl: './app.component.html'
})
export class AppComponent {
	title = 'tesla-configurator';

	private modelService = inject(ModelService);

	model: Signal<Model | null>;
	color: Signal<Color | null>;

	constructor() {
		this.model = computed(() => this.modelService.model());
		this.color = computed(() => this.modelService.color());
	}

	getImagePath(): string {
		return `https://interstate21.com/tesla-app/images/${this.model()?.code}/${this.color()?.code}.jpg`
	}
}
