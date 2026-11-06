import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    inject,
    Type
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { SITE_SECTIONS } from '../../core/site.config';
import { HeroSection } from '../../sections/hero/hero.section';
import { ServicesSection } from '../../sections/services/services.section';
import { ProcessSection } from '../../sections/process/process.section';
import { PortalSection } from '../../sections/portal/portal.section';
import { AboutSection } from '../../sections/about/about.section';
import { FaqSection } from '../../sections/faq/faq.section';
import { ContactSection } from '../../sections/contact/contact.section';

const SECTION_COMPONENTS: Record<string, Type<unknown>> = {
    inicio: HeroSection,
    servicios: ServicesSection,
    proceso: ProcessSection,
    portal: PortalSection,
    nosotros: AboutSection,
    preguntas: FaqSection,
    contacto: ContactSection
};

@Component({
    selector: 'app-home-page',
    imports: [NgComponentOutlet],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
    private readonly destroyRef = inject(DestroyRef);
    private observer?: IntersectionObserver;

    readonly sections = SITE_SECTIONS
        .filter((section) => section.enabled)
        .map((section) => ({ ...section, component: SECTION_COMPONENTS[section.id] }))
        .filter((section) => !!section.component);

    constructor() {
        afterNextRender(() => this.setupReveals());
        this.destroyRef.onDestroy(() => this.observer?.disconnect());
    }

    private setupReveals(): void {
        const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
        if (!elements.length) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
            elements.forEach((element) => element.classList.add('is-visible'));
            return;
        }
        this.observer = new IntersectionObserver(
            (entries, current) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-visible');
                    current.unobserve(entry.target);
                });
            },
            { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
        );
        elements.forEach((element) => this.observer?.observe(element));
    }
}
