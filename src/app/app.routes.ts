import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'Maricevich | Gestión aduanera y comercio exterior',
        loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage)
    },
    {
        path: 'privacidad',
        title: 'Política de privacidad | Maricevich',
        loadComponent: () => import('./pages/privacy/privacy.page').then((m) => m.PrivacyPage)
    },
    {
        path: 'terminos',
        title: 'Términos de uso | Maricevich',
        loadComponent: () => import('./pages/terms/terms.page').then((m) => m.TermsPage)
    },
    {
        path: '**',
        title: 'Página no encontrada | Maricevich',
        loadComponent: () => import('./pages/not-found/not-found.page').then((m) => m.NotFoundPage)
    }
];
