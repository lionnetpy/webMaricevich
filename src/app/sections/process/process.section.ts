import { ChangeDetectionStrategy, Component } from '@angular/core';

interface ProcessStep {
    number: string;
    title: string;
    description: string;
}

@Component({
    selector: 'app-process-section',
    templateUrl: './process.section.html',
    styleUrl: './process.section.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProcessSection {
    readonly heading = {
        eyebrow: 'Cómo trabajamos',
        title: 'Un proceso claro,',
        highlight: 'de principio a fin.',
        lead:
            'Cuidamos la técnica y la comunicación. Cada paso queda documentado para que sepas qué se está haciendo, ' +
            'con qué criterio y cuál es el siguiente movimiento.',
        cta: 'Empezar una conversación'
    };

    readonly steps: ProcessStep[] = [
        {
            number: '01',
            title: 'Relevamiento',
            description: 'Entendemos la mercadería, el origen, el destino y la documentación disponible.'
        },
        {
            number: '02',
            title: 'Clasificación',
            description: 'Definimos partida, aforo y tratamiento impositivo con criterio técnico.'
        },
        {
            number: '03',
            title: 'Desglose',
            description: 'Calculamos el costo de importación y validamos los números con tu equipo.'
        },
        {
            number: '04',
            title: 'Liquidación y seguimiento',
            description: 'Emitimos, registramos y acompañamos la operación hasta el cierre.'
        }
    ];
}
