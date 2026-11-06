# Web Maricevich

Sitio corporativo de Maricevich construido con **Angular 22**, **Tailwind CSS 4** y **Optimus UI 2**.

La página está separada por secciones independientes, cada una con su componente, HTML y SCSS. El orden de las secciones se controla desde un único archivo para que puedas reorganizar el sitio sin tocar el layout.

## Inicio rápido

```bash
npm install
npm start -- --port 4300
```

Abrir `http://localhost:4300`.

Build de producción:

```bash
npm run build
```

Salida: `dist/webMaricevich/browser`.

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Angular 22 (standalone, zoneless) |
| Estilos | Tailwind CSS 4 + SCSS por componente |
| Componentes UI | Optimus UI 2 (MIT), tema Aura |
| Iconos | OpenNG Icons |
| Formularios | Reactive Forms |
| Testing | Vitest (Angular CLI 22) |

Optimus UI se usa para el acordeón de preguntas frecuentes y para los campos de texto del formulario. Tailwind se usa para utilidades de layout y el resto del sistema visual está en SCSS encapsulado por componente.

## Estructura

```
src/app/
├── core/
│   ├── site.config.ts       # orden de secciones, textos globales, contacto
│   └── site-assets.ts       # rutas de logos e imágenes
├── layout/
│   ├── header/              # navbar responsive
│   └── footer/
├── sections/
│   ├── hero/                # inicio
│   ├── services/            # servicios
│   ├── process/             # cómo trabajamos
│   ├── portal/              # sistema
│   ├── about/               # nosotros
│   ├── faq/                 # preguntas frecuentes (Optimus Accordion)
│   └── contact/             # contacto
├── pages/
│   ├── home/                # renderiza las secciones en orden
│   ├── privacy/
│   ├── terms/
│   └── not-found/
├── app.ts
├── app.html
├── app.config.ts
└── app.routes.ts
```

## Reordenar secciones

Editar `src/app/core/site.config.ts`:

```ts
export const SITE_SECTIONS: SiteSection[] = [
    { id: 'inicio', label: 'Inicio', enabled: true },
    { id: 'servicios', label: 'Servicios', enabled: true },
    // mover, ocultar o agregar objetos
];
```

- **Mover** un objeto cambia el orden de la página y del navbar.
- **Ocultar** una sección: `enabled: false`.
- El navbar se genera automáticamente desde la misma lista.

Para **agregar una sección**:

1. Crear `src/app/sections/mi-seccion/mi-seccion.ts`, `.html` y `.scss`.
2. Agregar `{ id: 'mi-seccion', label: 'Mi sección', enabled: true }` en `SITE_SECTIONS`.
3. Registrar el componente en `src/app/pages/home/home.page.ts`:

```ts
const SECTION_COMPONENTS = {
    // ...
    'mi-seccion': MiSeccionComponent
};
```

## Editar contenido e items

Cada sección guarda sus datos en su propio `.ts`:

- `services.section.ts` → array `services`
- `process.section.ts` → array `steps`
- `portal.section.ts` → `features`, `mockStats`, `mockRows`
- `about.section.ts` → array `values`
- `faq.section.ts` → array `faqs`
- `contact.section.ts` → `details` y lógica del formulario
- `core/site.config.ts` → `CONTACT_SERVICE_OPTIONS` con `label`, `description`, `icon` y `value` de cada servicio

Para agregar o quitar tarjetas, pasos, preguntas, valores, filas de la maqueta u opciones del selector, solo se modifica el array correspondiente. La plantilla usa `@for`, por lo que no hay que duplicar HTML.

## Logos, imágenes y favicon

Están en `public/brand/` y sus rutas se centralizan en `src/app/core/site-assets.ts`:

```ts
export const BRAND = {
    logoLightAvif: 'brand/logo-light.avif',
    logoLightWebp: 'brand/logo-light.webp',
    // ...
};
```

Los logos del header/footer son AVIF/WebP con `width`/`height` explícitos y `loading="lazy"` donde corresponde. El logo del portal también vive en el componente de la sección.

Para cambiar un logo: reemplazar el archivo en `public/brand/` y, si cambia el nombre, actualizar `site-assets.ts`.

## Datos de contacto y acceso al sistema

En `src/app/core/site.config.ts`:

```ts
export const SITE = {
    email: 'contacto@maricevich.com.py',
    systemUrl: 'https://app.maricevich.com.py/#/auth/login',
    localSystemUrl: 'http://localhost:4200/#/auth/login'
};
```

`resolveSystemUrl()` detecta `localhost` y usa el frontend de desarrollo; en producción usa `systemUrl`.

> Reemplazar `contacto@maricevich.com.py` y el dominio de producción por los datos reales antes de publicar.

## Formulario de contacto

El formulario es una demostración estática: valida los campos y arma un `mailto:` con el mensaje. No envía datos a un backend.

Si luego se integra un API, modificar únicamente `submit()` en `contact.section.ts` para llamar al endpoint correspondiente.

## Tailwind + SCSS

- `src/tailwind.css`: importa Tailwind 4, el plugin de Optimus UI y los iconos.
- `src/styles.scss`: variables de marca, reset, utilidades compartidas y estilos legales.
- Cada componente tiene su `.scss` encapsulado para mantener el mantenimiento localizado.

Los estilos usan las variables globales `--ink`, `--navy`, `--teal`, `--gold`, `--cream`, `--paper`, etc.

## Responsive

- Navbar con menú móvil, cierre por navegación, `Escape` y bloqueo de scroll.
- Hero, servicios, proceso, portal, valores, FAQ y contacto se apilan en tablets/móviles.
- Imágenes con dimensiones explícitas.
- `prefers-reduced-motion` desactiva animaciones.
- Foco visible y enlaces de salto para accesibilidad.

## Optimus UI

El tema se configura en `app.config.ts`:

```ts
provideOptimus({
    theme: {
        preset: Aura,
        options: {
            cssLayer: { name: 'optimus', order: 'theme, base, optimus' }
        }
    }
});
```

Componentes utilizados:

- `AccordionModule` en preguntas frecuentes.
- `SelectModule` en el selector de servicio del formulario, con plantillas personalizadas para el valor seleccionado y cada opción.
- `InputTextModule` y `TextareaModule` en el formulario.
- Tema Aura + Tailwind plugin de Optimus.

## Deploy

El build genera archivos con hash. Servir `dist/webMaricevich/browser` en CDN/Nginx con:

- Rewrites de SPA a `index.html`.
- Cache largo para JS/CSS/assets.
- `no-cache` para `index.html`.
- HTTPS, HSTS, CSP y Brotli/Gzip.
- Actualizar canonical, OG y dominio en `src/index.html` y `public/sitemap.xml`.

Archivos listos para desplegar:

- `public/robots.txt` y `public/sitemap.xml` (actualizar el dominio).
- `public/manifest.webmanifest` para instalación como app.
- `public/_headers` para Netlify/Cloudflare Pages.
- `netlify.toml` para Netlify.
- `vercel.json` para Vercel.
- `nginx.conf.example` como referencia para servidor propio.

Los cuatro toman como salida `dist/webMaricevich/browser`. Si cambiás el nombre del proyecto en `angular.json`, actualizá esa ruta en los archivos de deploy.

### CSP y CSS crítico

El build de producción usa `"inlineCritical": false` en `angular.json`. Angular, cuando inlinea CSS crítico, inserta un script inline que cambia el `media` de la hoja de estilos principal; un CSP estricto con `script-src 'self'` bloquea ese script y la página queda sin estilos. Mantené `inlineCritical` desactivado mientras uses el CSP de `netlify.toml`/`_headers`, o ajustá el CSP si algún día lo volvés a activar.

### Netlify

- Si el repositorio contiene la carpeta `webMaricevich/` en la raíz, configurá **Base directory** = `webMaricevich`.
- Si el repositorio ya es el contenido de la web, dejá **Base directory** vacío.
- Build command: `npm run build`.
- Publish directory: `dist/webMaricevich/browser`.


## Testing

```bash
npm test
```

El proyecto usa el builder de tests de Angular 22 con Vitest. Las pruebas actuales validan la configuración central de secciones y navegación en `src/app/core/site.config.spec.ts`.
