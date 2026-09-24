# AGENTS.md - Directivas de Desarrollo para el Proyecto (React + Vite)

## 1. Stack Tecnológico y Configuración Inicial
- **Framework/Build Tool:** React + Vite (con TypeScript).
- **Estilos:** Tailwind CSS (para asegurar flexibilidad en modo oscuro/claro y diseño responsive).
- **Iconos:** `lucide-react`.
- **Instalación:** Si el proyecto no está inicializado, el agente debe asumir la creación mediante Vite (`npm create vite@latest . -- --template react-ts`), instalación de dependencias (`npm install tailwindcss postcss autoprefixer`, `npm install lucide-react`) y configuración inicial.

## 2. Arquitectura (Feature-Driven Architecture)
El proyecto se organiza de forma modular y limpia:
- `/config`: Configuración global, variables de entorno y constantes.
- `/design`: Tokens de diseño, estilos globales y configuración de Tailwind.
- `/shared`: Elementos reutilizables en toda la app:
  - `/components`: Componentes tontos o genéricos (botones, layouts base).
  - `/i18n`: Sistema de traducción multi-idioma.
  - `/context`: Contextos globales (ThemeContext, LanguageContext).
- `/features/`: Directorios exclusivos por cada sección del menú:
  - `home/` (Inicio) -> Componentes, hooks y contenido de prueba.
  - `info/` (Información) -> Componentes, hooks y contenido de prueba.
  - `description/` (Descripción) -> Componentes, hooks y contenido de prueba.
- `/assets`: Recursos estáticos (ej: `logo.png`).

## 3. Especificaciones de Diseño Visual & Comportamiento (Basado en Mockups)
El layout principal consta de una barra de navegación lateral adaptable (`Sidebar`) y un área de contenido principal.

### Comportamiento Responsive:
- **Desktop (Pantallas grandes):**
  - **Desplegado:** Muestra logo con texto "MiWeb", selector de tema (luna/sol), items del menú con icono y texto, línea separadora, selector de idioma, y texto inferior "Ver 1.1" junto al avatar de usuario. Incluye un botón de colapsar en la esquina superior derecha del menú.
  - **Plegado:** La barra se estrecha mostrando únicamente los iconos (logo abreviado o icono minimal, sol/luna, iconos de secciones, idioma y avatar).
- **Smartphone (Pantallas pequeñas):**
  - **Plegado:** Barra superior fija con botón de hamburguesa, logo "MiWeb" y selector rápido de tema. El menú está oculto.
  - **Desplegado:** Se abre un panel lateral tipo *Drawer* con fondo traslúcido que contiene la estructura completa del menú desplegado y un botón de cierre "X".

### Elementos del Menú:
1. **Logo:** Ubicado arriba (`src/assets/logo.png`) acompañado del texto "MiWeb".
2. **Botón Dark/Light Mode:** Interruptor deslizante (Toggle) con iconos de luna y sol.
3. **Items de Navegación:**
   - **Inicio** (Icono casa) -> Ruta / vista Home
   - **Información** (Icono información) -> Ruta / vista Info
   - **Descripción** (Icono documento) -> Ruta / vista Description
4. **Pie de Menú:**
   - Barra separadora horizontal sutil.
   - Selector de Idioma (Desplegable con las opciones: Español, Català, English).
   - Bloque de configuración / Perfil de usuario (`xp qe`).
   - Texto inferior de versión: **"Ver 1.1"**.

## 4. Sistema de Modo Oscuro / Claro (Theme System)
- Crear un `ThemeContext` global en `src/shared/context/ThemeContext.tsx`.
- Debe escuchar en tiempo real el cambio del botón de tema (Luna/Sol).
- Aplicar la clase `dark` de Tailwind al elemento raíz (`<html>` o contenedor principal) y persistir la preferencia en `localStorage`.

## 5. Sistema Multi-idioma (i18n)
- Crear un sistema ligero en `src/shared/i18n/`.
- Soportar tres idiomas estrictos: **Català (ca)**, **Español (es)** y **English (en)**.
- Implementar un `LanguageContext` que permita cambiar el idioma de toda la interfaz dinámicamente desde el selector del menú. Los textos de los items del menú y las vistas deben traducirse a través de este sistema.

