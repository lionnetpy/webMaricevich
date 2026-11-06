import { ChangeDetectionStrategy, Component } from '@angular/core';

interface ValueItem {
    number: string;
    title: string;
    description: string;
}

@Component({
    selector: 'app-about-section',
    templateUrl: './about.section.html',
    styleUrl: './about.section.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutSection {
    readonly heading = {
        eyebrow: 'Nosotros',
        title: 'Precisión técnica.',
        highlight: 'Cercanía real.',
        lead:
            'Maricevich combina conocimiento aduanero y herramientas propias para que cada operación sea clara, ' +
            'ordenada y verificable.'
    };

    readonly values: ValueItem[] = [
        {
            number: '01',
            title: 'Precisión',
            description: 'Cada partida, cada tributo y cada gasto se revisa antes de liquidar.'
        },
        {
            number: '02',
            title: 'Cercanía',
            description: 'Un interlocutor claro para explicar el proceso y responder tus dudas.'
        },
        {
            number: '03',
            title: 'Trazabilidad',
            description: 'Historial de contactos, cotizaciones y liquidaciones con auditoría.'
        }
    ];

    readonly statement = {
        quote: 'La tranquilidad de importar también se construye con información clara.',
        footer: 'Maricevich · Gestión aduanera'
    };
}
