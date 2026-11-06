import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BRAND } from '../../core/site-assets';
import { resolveSystemUrl } from '../../core/site.config';

interface MockRow {
    code: string;
    status: string;
    tone: 'gold' | 'teal';
}

@Component({
    selector: 'app-portal-section',
    templateUrl: './portal.section.html',
    styleUrl: './portal.section.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortalSection {
    readonly brand = BRAND;
    readonly systemUrl = resolveSystemUrl();

    readonly heading = {
        eyebrow: 'Sistema Maricevich',
        title: 'Tecnología propia.',
        highlight: 'Operación visible.',
        lead:
            'Nuestro sistema integra agenda, catálogo de partidas, cotizaciones y liquidaciones. El equipo autorizado ' +
            'accede con roles definidos y cada cambio queda registrado en una auditoría.',
        cta: 'Acceder al sistema'
    };

    readonly features = [
        'Datos centralizados y búsquedas rápidas',
        'Cálculos consistentes y trazables',
        'Exportaciones y respaldo documental'
    ];

    readonly mockStats = [
        { label: 'Agenda', value: 'Centralizada' },
        { label: 'Partidas', value: '2.195' },
        { label: 'Liquidaciones', value: '4' }
    ];

    readonly mockRows: MockRow[] = [
        { code: 'COT-2026-000001', status: 'Borrador', tone: 'gold' },
        { code: '2283N', status: 'Emitida', tone: 'teal' },
        { code: '2285P', status: 'Emitida', tone: 'teal' }
    ];
}
