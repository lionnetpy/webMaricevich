import { ChangeDetectionStrategy, Component } from '@angular/core';

interface ServiceItem {
    number: string;
    icon: string;
    title: string;
    description: string;
    link: string;
    linkLabel: string;
}

@Component({
    selector: 'app-services-section',
    templateUrl: './services.section.html',
    styleUrl: './services.section.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesSection {
    readonly heading = {
        eyebrow: 'Servicios',
        title: 'Todo lo que tu operación necesita,',
        highlight: 'en un solo lugar.',
        lead:
            'Desde la consulta inicial hasta el cierre de la liquidación, trabajamos con información clara, ' +
            'criterios técnicos y un proceso que podés seguir.'
    };

    readonly services: ServiceItem[] = [
        {
            number: '01',
            icon: 'pi-box',
            title: 'Despacho y liquidación',
            description: 'Coordinamos la operación y liquidamos tributos, tasas y gastos con el detalle que tu empresa necesita.',
            link: '#contacto',
            linkLabel: 'Consultar'
        },
        {
            number: '02',
            icon: 'pi-file-edit',
            title: 'Clasificación arancelaria',
            description: 'Identificamos la partida correcta, el aforo, el IVA y el tratamiento Mercosur de cada producto.',
            link: '#contacto',
            linkLabel: 'Consultar'
        },
        {
            number: '03',
            icon: 'pi-chart-line',
            title: 'Desglose de importación',
            description: 'FOB, flete, seguro, CIF, derechos e IVA en una vista clara para decidir con precisión.',
            link: '#contacto',
            linkLabel: 'Consultar'
        },
        {
            number: '04',
            icon: 'pi-shield',
            title: 'Gestión y trazabilidad',
            description: 'Agenda, documentación y estados de cada operación centralizados, con historial auditable.',
            link: '#portal',
            linkLabel: 'Ver sistema'
        }
    ];
}
