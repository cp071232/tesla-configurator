import { Routes } from '@angular/router';
import { FirstStepComponent } from './feature/first-step/first-step.component';
import { SecondStepComponent } from './feature/second-step/second-step.component';
import { ThirdStepComponent } from './feature/third-step/third-step.component';
import { secondStepGuard } from './core/guards/second-step.guard';
import { thirdStepGuard } from './core/guards/third-step.guard';

export const routes: Routes = [
	{ path: 'step1', component: FirstStepComponent },
	{ path: 'step2', component: SecondStepComponent, canActivate: [secondStepGuard] },
	{ path: 'step3', component: ThirdStepComponent, canActivate: [thirdStepGuard] },
	{ path: '**', redirectTo: 'step1', pathMatch: 'full' }
];