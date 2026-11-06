import { ChangeDetectionStrategy, Component } from '@angular/core';

interface OperationRow {
    label: string;
    value: string;
    total?: boolean;
}

interface FloatingCard {
    position: 'top' | 'bottom';
    icon: string;
    tone: 'teal' | 'gold';
    title: string;
    subtitle: string;
}

@Component({
    selector: 'app-hero-section',
    templateUrl: './hero.section.html',
    styleUrl: './hero.section.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSection {
    readonly content = {
        eyebrow: 'Gestión aduanera · Asunción, Paraguay',
        titleTop: 'Comercio exterior',
        titleHighlight: 'sin fricción.',
        lead:
            'Acompañamos a empresas importadoras y exportadoras en cada etapa: clasificación arancelaria, ' +
            'desglose de costos, liquidación de tributos y seguimiento documental.',
        primaryCta: 'Solicitar una cotización',
        secondaryCta: 'Conocer servicios'
    };

    readonly points = [
        'Precisión en cada partida',
        'Cálculos auditables',
        'Un solo interlocutor'
    ];

    readonly trust = [
        'Operación integral',
        'Clasificación arancelaria',
        'Desglose de costos',
        'Liquidación de tributos',
        'Trazabilidad documental'
    ];

    readonly operation = {
        code: '#MVC-0284',
        status: 'En proceso',
        origin: 'Shanghái',
        destination: 'Asunción',
        rows: [
            { label: 'Partida arancelaria', value: '8471.30.10' },
            { label: 'Valor FOB', value: 'USD 25.000' },
            { label: 'Flete + seguro', value: 'USD 1.850' },
            { label: 'Total estimado', value: 'USD 30.240', total: true }
        ] satisfies OperationRow[]
    };

    readonly floatingCards: FloatingCard[] = [
        {
            position: 'top',
            icon: 'pi-check',
            tone: 'teal',
            title: 'Partida validada',
            subtitle: 'Clasificación revisada'
        },
        {
            position: 'bottom',
            icon: 'pi-file',
            tone: 'gold',
            title: 'Liquidación lista',
            subtitle: 'Documentación trazable'
        }
    ];
}
