import { CanActivateFn, Router } from '@angular/router';
import { ModelService } from '../services/model.service';
import { inject } from '@angular/core';

export const secondStepGuard: CanActivateFn = (route, state) => {
	const router = inject(Router);
	const modelService = inject(ModelService);

	if (!modelService.model() || !modelService.color()) {
		router.navigate(['/step1']);
	}
	return true;
};
