import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AccordionModule } from '@openng/optimus-ui/accordion';

interface FaqItem {
    question: string;
    answer: string;
}

@Component({
    selector: 'app-faq-section',
    imports: [AccordionModule],
    templateUrl: './faq.section.html',
    styleUrl: './faq.section.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqSection {
    readonly heading = {
        eyebrow: 'Preguntas frecuentes',
        title: 'Antes de empezar,',
        highlight: 'lo que necesitás saber.',
        lead: 'Si tu consulta no está acá, escribinos y la revisamos con tu operación concreta.',
        link: 'Hacer una consulta'
    };

    readonly faqs: FaqItem[] = [
        {
            question: '¿Qué datos necesito para una cotización?',
            answer:
                'Descripción de la mercadería, origen, valor FOB, flete, seguro y la documentación disponible. ' +
                'Con eso podemos clasificar y armar el desglose.'
        },
        {
            question: '¿Cómo se calculan los tributos?',
            answer:
                'Se parte de la clasificación arancelaria, el aforo, el IVA y la base CIF, incorporando los gastos ' +
                'aplicables. Emitimos el detalle para que puedas revisarlo.'
        },
        {
            question: '¿Puedo seguir el estado de mi operación?',
            answer:
                'Sí. El equipo comparte los avances y el sistema registra cada cambio, dejando un historial ' +
                'consultable y auditable.'
        },
        {
            question: '¿También trabajan con exportaciones?',
            answer:
                'Sí. Acompañamos operaciones de importación y exportación con gestión aduanera, documentación y ' +
                'liquidación.'
        }
    ];
}
