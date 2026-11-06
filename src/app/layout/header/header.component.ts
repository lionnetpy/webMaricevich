import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BRAND } from '../../core/site-assets';
import { NAV_SECTIONS, resolveSystemUrl, SITE, SiteSection } from '../../core/site.config';

@Component({
    selector: 'app-header',
    imports: [RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    private readonly router = inject(Router);

    readonly brand = BRAND;
    readonly site = SITE;
    readonly sections = NAV_SECTIONS;
    readonly systemUrl = resolveSystemUrl();
    readonly isHome = signal(false);
    readonly menuOpen = signal(false);
    readonly scrolled = signal(false);
    readonly activeSection = signal(this.sections[0]?.id ?? 'inicio');

    constructor() {
        this.updateHomeState(this.router.url);
        this.router.events
            .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
            .subscribe((event) => {
                this.updateHomeState(event.urlAfterRedirects);
                this.closeMenu();
                if (this.isHome()) {
                    window.setTimeout(() => this.updateActiveSection(), 80);
                }
            });
    }

    @HostListener('window:scroll')
    onWindowScroll(): void {
        this.scrolled.set(window.scrollY > 12);
        if (this.isHome()) this.updateActiveSection();
    }

    @HostListener('window:resize')
    onResize(): void {
        if (window.innerWidth > 920) this.closeMenu();
    }

    @HostListener('document:keydown.escape')
    onEscape(): void {
        if (this.menuOpen()) this.closeMenu();
    }

    toggleMenu(): void {
        const open = !this.menuOpen();
        this.menuOpen.set(open);
        document.body.classList.toggle('nav-open', open);
    }

    closeMenu(): void {
        this.menuOpen.set(false);
        document.body.classList.remove('nav-open');
    }

    navigateTo(section: SiteSection, event: Event): void {
        event.preventDefault();
        this.closeMenu();
        const target = document.getElementById(section.id);
        if (this.isHome() && target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.replaceState(null, '', `#${section.id}`);
            this.activeSection.set(section.id);
            return;
        }
        this.router.navigate(['/'], { fragment: section.id });
    }

    isActive(section: SiteSection): boolean {
        return this.isHome() && this.activeSection() === section.id;
    }

    private updateHomeState(url: string): void {
        const clean = url.split('#')[0];
        this.isHome.set(clean === '/' || clean === '');
    }

    private updateActiveSection(): void {
        const offset = (document.querySelector('.site-header') as HTMLElement | null)?.offsetHeight ?? 78;
        const position = window.scrollY + offset + 48;
        let active = this.sections[0]?.id ?? '';
        for (const section of this.sections) {
            const element = document.getElementById(section.id);
            if (element && element.offsetTop <= position) active = section.id;
        }
        this.activeSection.set(active);
    }
}
