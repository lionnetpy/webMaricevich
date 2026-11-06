import { describe, expect, it } from 'vitest';
import { NAV_SECTIONS, SITE_SECTIONS, SITE } from './site.config';

describe('site.config', () => {
    it('keeps section ids unique', () => {
        const ids = SITE_SECTIONS.map((section) => section.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it('exposes only enabled sections to the navigation', () => {
        expect(NAV_SECTIONS).toEqual(SITE_SECTIONS.filter((section) => section.enabled));
        expect(NAV_SECTIONS.length).toBeGreaterThan(0);
    });

    it('has the expected contact data', () => {
        expect(SITE.email).toContain('@');
        expect(SITE.systemUrl.startsWith('https://')).toBe(true);
    });
});
