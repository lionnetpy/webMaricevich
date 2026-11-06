import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { SelectModule } from '@openng/optimus-ui/select';
import { TextareaModule } from '@openng/optimus-ui/textarea';
import { CONTACT_SERVICE_OPTIONS, resolveSystemUrl, SITE } from '../../core/site.config';

interface ContactDetail {
    icon: string;
    label: string;
    value: string;
    href?: string;
    external?: boolean;
}

@Component({
    selector: 'app-contact-section',
    imports: [ReactiveFormsModule, RouterLink, InputTextModule, TextareaModule, SelectModule],
    templateUrl: './contact.section.html',
    styleUrl: './contact.section.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactSection {
    private readonly fb = inject(FormBuilder);

    readonly site = SITE;
    readonly services = CONTACT_SERVICE_OPTIONS;
    readonly systemUrl = resolveSystemUrl();
    readonly status = signal('');

    readonly heading = {
        eyebrow: 'Contacto',
        title: 'Hablemos de tu',
        highlight: 'próxima operación.',
        lead:
            'Contanos qué necesitás importar o exportar. Te respondemos con los próximos pasos y la información ' +
            'que necesitamos para avanzar.'
    };

    readonly details: ContactDetail[] = [
        { icon: 'pi-map-marker', label: 'Ubicación', value: SITE.city },
        { icon: 'pi-envelope', label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
        {
            icon: 'pi-shield',
            label: 'Sistema',
            value: 'Acceso para usuarios autorizados',
            href: resolveSystemUrl(),
            external: true
        }
    ];

    readonly form = this.fb.nonNullable.group({
        name: ['', [Validators.required, Validators.maxLength(120)]],
        company: ['', [Validators.maxLength(160)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(160)]],
        phone: ['', [Validators.maxLength(40)]],
        service: ['', [Validators.required]],
        message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(3000)]],
        privacy: [false, [Validators.requiredTrue]]
    });

    submit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const value = this.form.getRawValue();
        const lines = [
            'Consulta desde el sitio web de Maricevich',
            '',
            `Nombre: ${value.name}`,
            value.company ? `Empresa: ${value.company}` : '',
            `Email: ${value.email}`,
            value.phone ? `Teléfono: ${value.phone}` : '',
            `Servicio: ${value.service}`,
            '',
            'Mensaje:',
            value.message
        ].filter(Boolean);

        const subject = `Consulta web · ${value.service}`;
        const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
        this.status.set('Abrimos tu cliente de correo con la consulta preparada.');
        window.location.href = mailto;
    }
}
