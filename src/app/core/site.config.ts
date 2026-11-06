/**
 * Configuración central del sitio.
 *
 * Para reordenar secciones: mover los objetos dentro de SITE_SECTIONS.
 * Para ocultar una sección: enabled = false.
 * Para agregar una sección: crear su componente, agregar el id/label aquí
 * y registrarlo en pages/home/home.page.ts.
 */
export interface SiteSection {
    id: string;
    label: string;
    enabled: boolean;
}

export const SITE_SECTIONS: SiteSection[] = [
    { id: 'inicio', label: 'Inicio', enabled: true },
    { id: 'servicios', label: 'Servicios', enabled: true },
    { id: 'proceso', label: 'Cómo trabajamos', enabled: true },
    { id: 'portal', label: 'Sistema', enabled: true },
    { id: 'nosotros', label: 'Nosotros', enabled: true },
    { id: 'preguntas', label: 'Preguntas', enabled: true },
    { id: 'contacto', label: 'Contacto', enabled: true }
];

export const NAV_SECTIONS = SITE_SECTIONS.filter((section) => section.enabled);

export const SITE = {
    name: 'Maricevich',
    legalName: 'Maricevich',
    description: 'Gestión aduanera y comercio exterior en Asunción, Paraguay.',
    city: 'Asunción, Paraguay',
    email: 'contacto@maricevich.com.py',
    systemUrl: 'https://app.maricevich.com.py/#/auth/login',
    localSystemUrl: 'http://localhost:4200/#/auth/login'
} as const;

export function resolveSystemUrl(): string {
    if (typeof window === 'undefined') return SITE.systemUrl;
    const local = ['localhost', '127.0.0.1', ''].includes(window.location.hostname);
    return local ? SITE.localSystemUrl : SITE.systemUrl;
}

export interface ContactServiceOption {
    value: string;
    label: string;
    description: string;
    icon: string;
}

export const CONTACT_SERVICE_OPTIONS: ContactServiceOption[] = [
    {
        value: 'Cotización de importación',
        label: 'Cotización de importación',
        description: 'Estimación de costos y tributos',
        icon: 'pi-calculator'
    },
    {
        value: 'Clasificación arancelaria',
        label: 'Clasificación arancelaria',
        description: 'Partida, aforo y tratamiento',
        icon: 'pi-tags'
    },
    {
        value: 'Desglose de costos',
        label: 'Desglose de costos',
        description: 'FOB, flete, seguro e impuestos',
        icon: 'pi-chart-line'
    },
    {
        value: 'Liquidación de despacho',
        label: 'Liquidación de despacho',
        description: 'Cálculo y documentación',
        icon: 'pi-file-edit'
    },
    {
        value: 'Exportación',
        label: 'Exportación',
        description: 'Gestión y seguimiento',
        icon: 'pi-globe'
    },
    {
        value: 'Otra consulta',
        label: 'Otra consulta',
        description: 'Contanos qué necesitás',
        icon: 'pi-comments'
    }
];

