import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ModelService } from '../services/model.service';

export const thirdStepGuard: CanActivateFn = (route, state) => {
	const router = inject(Router);
	const modelService = inject(ModelService);

	if (!modelService.model() || !modelService.color() || !modelService.config()) {
		router.navigate(['/step2']);
	}
	return true;
};
