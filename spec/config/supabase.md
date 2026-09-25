# Spec: Configuración y Esquema de Supabase

## 1. Conexión
- Cliente inicializado en `src/config/supabase.ts`.
- Utiliza la URL del proyecto[cite: 7] y la Publishable key[cite: 6].

## 2. Entidades Principales (Referencia rápida desde SQLcontent.sql)
- **clientes**: `idCliente` (PK), `nomCliente`, `paisCliente`, etc.
- **productos**: `idProd` (PK), `nomProd`, `descProd`, `precioProd`.
- **stock**: `idProd`, `idAlmacen`, `cantidadStock`.
- **ventas** / **compras** / **intervenciones**: Tablas transaccionales vinculadas por claves foráneas.

## 3. Pautas para el Agente
- Al implementar servicios en las features, reutilizar el cliente global de Supabase.
- Tipar siempre las respuestas utilizando interfaces de TypeScript basadas en estas tablas.