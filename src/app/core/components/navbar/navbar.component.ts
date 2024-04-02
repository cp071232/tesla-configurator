import { Component, Signal, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModelService } from '../../services/model.service';
import { Model } from '../../model/model';
import { Color } from '../../model/color';
import { Config } from '../../model/config';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [RouterModule],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

	private modelService = inject(ModelService);

	model: Signal<Model | null>;
	color: Signal<Color | null>;
	config: Signal<Config | null>;

	constructor() {
		this.model = computed(() => this.modelService.model());
		this.color = computed(() => this.modelService.color());
		this.config = computed(() => this.modelService.config());
	}

}
