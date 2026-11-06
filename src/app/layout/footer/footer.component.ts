import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BRAND } from '../../core/site-assets';
import { NAV_SECTIONS, resolveSystemUrl, SITE } from '../../core/site.config';

@Component({
    selector: 'app-footer',
    imports: [RouterLink],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
    readonly brand = BRAND;
    readonly site = SITE;
    readonly sections = NAV_SECTIONS;
    readonly systemUrl = resolveSystemUrl();
    readonly year = new Date().getFullYear();
}
