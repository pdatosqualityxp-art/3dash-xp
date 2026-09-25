-- ==========================================
-- 0. BORRAR TABLAS SI EXISTEN (Orden inverso)
-- ==========================================
DROP TABLE IF EXISTS intervenciones CASCADE;
DROP TABLE IF EXISTS ventas CASCADE;
DROP TABLE IF EXISTS compras CASCADE;
DROP TABLE IF EXISTS stock CASCADE;
DROP TABLE IF EXISTS almacen CASCADE;
DROP TABLE IF EXISTS estadoIntervencion CASCADE;
DROP TABLE IF EXISTS servicios CASCADE;
DROP TABLE IF EXISTS productos CASCADE;
DROP TABLE IF EXISTS proveedores CASCADE;
DROP TABLE IF EXISTS clientes CASCADE;

-- ==========================================
-- 1. CREACIÓN DE TABLAS (Con IDs de texto)
-- ==========================================
CREATE TABLE clientes (
    idCliente VARCHAR(10) PRIMARY KEY,
    nomCliente VARCHAR(150) NOT NULL,
    paisCliente VARCHAR(100) DEFAULT 'España',
    comAutonomaCliente VARCHAR(100),
    provinciaCliente VARCHAR(100),
    poblacionCliente VARCHAR(100)
);

CREATE TABLE proveedores (
    idProveedor VARCHAR(10) PRIMARY KEY,
    nomProveedor VARCHAR(150) NOT NULL,
    paisProveedor VARCHAR(100) DEFAULT 'España',
    comAutonomaProveedor VARCHAR(100),
    provinciaProveedor VARCHAR(100),
    poblacionProveedor VARCHAR(100)
);

CREATE TABLE productos (
    idProd VARCHAR(10) PRIMARY KEY,
    nomProd VARCHAR(150) NOT NULL,
    descProd TEXT,
    precioProd NUMERIC(10, 2) NOT NULL DEFAULT 0.00
);

CREATE TABLE almacen (
    idAlmacen VARCHAR(10) PRIMARY KEY,
    nomAlmacen VARCHAR(150) NOT NULL,
    descAlmacen TEXT
);

CREATE TABLE stock (
    idProd VARCHAR(10) NOT NULL,
    idAlmacen VARCHAR(10) NOT NULL,
    cantidadStock INT NOT NULL DEFAULT 0,
    PRIMARY KEY (idProd, idAlmacen),
    FOREIGN KEY (idProd) REFERENCES productos(idProd) ON DELETE CASCADE,
    FOREIGN KEY (idAlmacen) REFERENCES almacen(idAlmacen) ON DELETE CASCADE
);

CREATE TABLE compras (
    idCompra VARCHAR(10) PRIMARY KEY,
    idProveedor VARCHAR(10) NOT NULL,
    idProd VARCHAR(10) NOT NULL,
    unidadesCompra INT NOT NULL,
    precioUnidadCompra NUMERIC(10, 2) NOT NULL,
    totalCompra NUMERIC(10, 2) NOT NULL,
    fechaCompra TIMESTAMP NOT NULL,
    FOREIGN KEY (idProveedor) REFERENCES proveedores(idProveedor),
    FOREIGN KEY (idProd) REFERENCES productos(idProd)
);

CREATE TABLE ventas (
    idVenta VARCHAR(10) PRIMARY KEY,
    idProd VARCHAR(10) NOT NULL,
    idCliente VARCHAR(10) NOT NULL,
    unidadesVenta INT NOT NULL,
    precioUnidadVenta NUMERIC(10, 2) NOT NULL,
    totalVenta NUMERIC(10, 2) NOT NULL,
    fechaVenta TIMESTAMP NOT NULL,
    FOREIGN KEY (idProd) REFERENCES productos(idProd),
    FOREIGN KEY (idCliente) REFERENCES clientes(idCliente)
);

CREATE TABLE estadoIntervencion (
    idEstado VARCHAR(10) PRIMARY KEY,
    nomEstado VARCHAR(100) NOT NULL,
    descEstado TEXT
);

CREATE TABLE servicios (
    idServicio VARCHAR(10) PRIMARY KEY,
    nomServicio VARCHAR(150) NOT NULL,
    descServicio TEXT,
    precioServicioProveedor NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    precioServicioCliente NUMERIC(10, 2) NOT NULL DEFAULT 0.00
);

CREATE TABLE intervenciones (
    idIntervencion VARCHAR(10) PRIMARY KEY,
    idProd VARCHAR(10),
    idServicio VARCHAR(10) NOT NULL,
    idEstado VARCHAR(10) NOT NULL,
    idCliente VARCHAR(10) NOT NULL,
    FOREIGN KEY (idProd) REFERENCES productos(idProd),
    FOREIGN KEY (idServicio) REFERENCES servicios(idServicio),
    FOREIGN KEY (idEstado) REFERENCES estadoIntervencion(idEstado),
    FOREIGN KEY (idCliente) REFERENCES clientes(idCliente)
);

-- ==========================================
-- 2. INSERCIÓN DE DATOS MAESTROS
-- ==========================================

-- Clientes (20 en Cataluña y Madrid)
INSERT INTO clientes VALUES 
('CL0001', 'Hostelería Catalana S.L.', 'España', 'Cataluña', 'Barcelona', 'Barcelona'),
('CL0002', 'Restaurantes del Vallès', 'España', 'Cataluña', 'Barcelona', 'Granollers'),
('CL0003', 'Frit Ravich Industrial', 'España', 'Cataluña', 'Girona', 'Riudellots de la Selva'),
('CL0004', 'Catering Metropolitano', 'España', 'Comunidad de Madrid', 'Madrid', 'Madrid'),
('CL0005', 'Hoteles Diagonal', 'España', 'Cataluña', 'Barcelona', 'Barcelona'),
('CL0006', 'Panaderías Artesanas Sabadell', 'España', 'Cataluña', 'Barcelona', 'Sabadell'),
('CL0007', 'Grup Somiatcuits', 'España', 'Cataluña', 'Barcelona', 'Terrassa'),
('CL0008', 'Logística Frigorífica Madrid', 'España', 'Comunidad de Madrid', 'Madrid', 'Alcalá de Henares'),
('CL0009', 'Cafeterías de Badalona', 'España', 'Cataluña', 'Barcelona', 'Badalona'),
('CL0010', 'Asador Castellano', 'España', 'Comunidad de Madrid', 'Madrid', 'Alcorcón'),
('CL0011', 'Comercial Hostelera Maresme', 'España', 'Cataluña', 'Barcelona', 'Mataró'),
('CL0012', 'Restaurante El Celler del Nord', 'España', 'Cataluña', 'Girona', 'Figueres'),
('CL0013', 'Buffet Libre Plaza', 'España', 'Comunidad de Madrid', 'Madrid', 'Madrid'),
('CL0014', 'Industrias Cárnicas Osona', 'España', 'Cataluña', 'Barcelona', 'Vic'),
('CL0015', 'Distribuciones Horeca BCN', 'España', 'Cataluña', 'Barcelona', 'L''Hospitalet de Llobregat'),
('CL0016', 'Gastrobar El Tubo', 'España', 'Comunidad de Madrid', 'Madrid', 'Getafe'),
('CL0017', 'Comedor Escolar Sant Cugat', 'España', 'Cataluña', 'Barcelona', 'Sant Cugat del Vallès'),
('CL0018', 'Pizzería Napoletana Express', 'España', 'Cataluña', 'Barcelona', 'Badalona'),
('CL0019', 'Hotel Ritz Paseo de Gracia', 'España', 'Cataluña', 'Barcelona', 'Barcelona'),
('CL0020', 'Catering Aeropuerto Barajas', 'España', 'Comunidad de Madrid', 'Madrid', 'Madrid');

-- Proveedores (20)
INSERT INTO proveedores VALUES 
('PR0001', 'Industrial Equipments BCN', 'España', 'Cataluña', 'Barcelona', 'Barcelona'),
('PR0002', 'FrioIndustrial Madrid', 'España', 'Comunidad de Madrid', 'Madrid', 'Madrid'),
('PR0003', 'Maquinaria Hostelería Sabadell', 'España', 'Cataluña', 'Barcelona', 'Sabadell'),
('PR0004', 'Tecnología Hotelera Global', 'España', 'Cataluña', 'Barcelona', 'Cornellà de Llobregat'),
('PR0005', 'Electro-Industrial Levante', 'España', 'Comunidad Valenciana', 'Valencia', 'Valencia'),
('PR0006', 'Fornitures i Maquinaria Girona', 'España', 'Cataluña', 'Girona', 'Girona'),
('PR0007', 'Inox Industrial del Vallès', 'España', 'Cataluña', 'Barcelona', 'Granollers'),
('PR0008', 'Sistemas de Cocción Madrid', 'España', 'Comunidad de Madrid', 'Madrid', 'Leganés'),
('PR0009', 'Comercial Maquinaria Horeca', 'España', 'Cataluña', 'Barcelona', 'Badalona'),
('PR0010', 'Equipamientos Térmicos Sur', 'España', 'Andalucía', 'Sevilla', 'Sevilla'),
('PR0011', 'Distribuciones Friasur', 'España', 'Comunidad de Madrid', 'Madrid', 'Getafe'),
('PR0012', 'Metalúrgica Hostelera Catalana', 'España', 'Cataluña', 'Barcelona', 'Vic'),
('PR0013', 'Hornos y Convección Ibérica', 'España', 'Comunidad de Madrid', 'Madrid', 'Madrid'),
('PR0014', 'Lavandería e Industrial BCN', 'España', 'Cataluña', 'Barcelona', 'L''Hospitalet de Llobregat'),
('PR0015', 'Soluciones Integrales Cocina', 'España', 'Cataluña', 'Tarragona', 'Reus'),
('PR0016', 'Maquinaria Norte de España', 'España', 'País Vasco', 'Vizcaya', 'Bilbao'),
('PR0017', 'Hostelería Automatizada S.A.', 'España', 'Cataluña', 'Barcelona', 'Terrassa'),
('PR0018', 'Aparatos de Precisión Industrial', 'España', 'Comunidad de Madrid', 'Madrid', 'Alcobendas'),
('PR0019', 'Frío Comercial Cataluña', 'España', 'Cataluña', 'Girona', 'Olot'),
('PR0020', 'Importaciones Industriales Madrileñas', 'España', 'Comunidad de Madrid', 'Madrid', 'Madrid');

-- Almacenes (3)
INSERT INTO almacen VALUES 
('ALM001', 'Almacén Central Barcelona', 'Depósito principal de distribución para Cataluña'),
('ALM002', 'Almacén Norte Granollers', 'Centro logístico secundario y repuestos'),
('ALM003', 'Almacén Central Madrid', 'Plataforma logística zona centro');

-- Servicios (3 tipos)
INSERT INTO servicios VALUES 
('SER001', 'Instalación', 'Instalación y puesta en marcha de maquinaria industrial en el local del cliente', 80.00, 150.00),
('SER002', 'Reparación', 'Servicio técnico correctivo por avería de componentes', 120.00, 220.00),
('SER003', 'Mantenimiento', 'Revisión preventiva periódica y limpieza de sistemas industriales', 60.00, 110.00);

-- Estados de Intervención (3 tipos)
INSERT INTO estadoIntervencion VALUES 
('EST001', 'Abierta', 'Incidencia registrada, pendiente de asignación de técnico'),
('EST002', 'En curso', 'Técnico desplazado o realizando la intervención in situ'),
('EST003', 'Terminada', 'Intervención completada con éxito y firmada por el cliente');

-- Productos (50 electrodomésticos industriales)
INSERT INTO productos VALUES 
('PRD0001', 'Horno Convección Industrial 10 Bandejas', 'Horno rotativo de gran capacidad para panadería y pastelería', 3499.99),
('PRD0002', 'Lavavajillas Cúpula Profesional', 'Lavavajillas de capota con ciclo rápido de lavado', 2850.00),
('PRD0003', 'Abatidor de Temperatura 5 Bandejas', 'Abatidor rápido de temperatura para cocinas profesionales', 2150.50),
('PRD0004', 'Armario Refrigerado 2 Puertas Inox', 'Nevera industrial vertical en acero inoxidable', 1890.00),
('PRD0005', 'Congelador Vertical Industrial 600L', 'Congelador de gran capacidad con control digital', 1650.00),
('PRD0006', 'Cocina a Gas 4 Fuegos con Horno', 'Cocina industrial de pie a gas propano/natural', 1420.00),
('PRD0007', 'Freidora Doble Cuba 10L+10L', 'Freidora eléctrica de sobremesa industrial', 650.00),
('PRD0008', 'Plancha de Cromo Duro Gas 80cm', 'Plancha industrial para asados rápidos con placa de cromo', 980.00),
('PRD0009', 'Mesa Fría Pizzera 3 Puertas', 'Mesa refrigerada con encimera de granito y vitrina ingredientes', 2400.00),
('PRD0010', 'Cortadora de Fiambre de Gravedad 300mm', 'Cortafiambres profesional de disco de acero templado', 520.00),
('PRD0011', 'Batidora Planetaria 20 Litros', 'Batidora mezcladora amasadora industrial con caldero', 1150.00),
('PRD0012', 'Máquina de Hielo Escama 50kg/24h', 'Generador de hielo en escama para pescaderías y hostelería', 1780.00),
('PRD0013', 'Cafetera Espresso Industrial 2 Grupos', 'Cafetera profesional de alta presión para cafeterías', 2950.00),
('PRD0014', 'Molinillo de Café Profesional', 'Molinillo dosificador de muelas de acero', 380.00),
('PRD0015', 'Expositores Refrigerados Verticales Bebidas', 'Nevera expositora de puerta de cristal 400L', 1290.00),
('PRD0016', 'Microondas Industrial 1800W', 'Microondas de uso intensivo sin plato giratorio', 720.00),
('PRD0017', 'Baño María Sobremesa 4 GN', 'Contenedor térmico para mantener alimentos calientes', 450.00),
('PRD0018', 'Salamandra Elevable de Calor', 'Salamandra gratinadora industrial', 690.00),
('PRD0019', 'Exprimidor de Zumos Automático Industrial', 'Exprimidor continuo de naranjas para buffets', 1350.00),
('PRD0020', 'Vasco Triturador / Batidor de Inmersión', 'Triturador de mano industrial de brazo largo', 410.00),
('PRD0021', 'Horno de Pizza Doble Cámara', 'Horno eléctrico industrial para pizzas con piedra refractaria', 1980.00),
('PRD0022', 'Amasadora Espiral 30L', 'Amasadora de gancho para masas pesadas', 1550.00),
('PRD0023', 'Laminadora de Masa de Sobremesa', 'Laminadora para hojaldre y masas de pastelería', 2600.00),
('PRD0024', 'Vitrina Tapas Refrigerada 6 Bandejas', 'Vitrina expositora de barra para tapas', 850.00),
('PRD0025', 'Descongelador de Agua Caliente Industrial', 'Cuba para descongelación controlada', 1100.00),
('PRD0026', 'Envasadora al Vacío de Sobremesa', 'Envasadora profesional con barra de sellado 40cm', 1250.00),
('PRD0027', 'Carrito Hot-Dog / Estación Móvil', 'Carro autónomo para comida caliente', 2100.00),
('PRD0028', 'Fregadero Industrial con Escurridor 2 Senos', 'Mobiliario de acero inoxidable para lavado manual', 550.00),
('PRD0029', 'Campana Extractora Industrial 2m', 'Campana de extracción de humos con filtros laberinto', 1400.00),
('PRD0030', 'Corta Verduras Industrial con Discos', 'Procesador de alimentos y vegetales multifunción', 990.00),
('PRD0031', 'Peladora de Patatas 15kg', 'Máquina automática para pelado de tubérculos', 1200.00),
('PRD0032', 'Tostador de pan Industrial de Cintas', 'Tostadora continua para desayunos de hotel', 780.00),
('PRD0033', 'Chocolatera Dispensador 5L', 'Calentador y distribuidor de chocolate caliente', 390.00),
('PRD0034', 'Granizadora 2 Pilas 10L', 'Máquina para granizados y bebidas frías', 920.00),
('PRD0035', 'Fuente de Chocolate para Eventos', 'Fuente en cascada de acero inoxidable', 480.00),
('PRD0036', 'Armario Caliente para Banquetes', 'Carro isotermo calefactado para transporte de platos', 2300.00),
('PRD0037', 'Mesa de Trabajo Inox con Estante', 'Mueble neutro de preparación de alimentos 150cm', 340.00),
('PRD0038', 'Estantería Modular Inox 4 Baldas', 'Sistema de almacenamiento para cámaras frigoríficas', 290.00),
('PRD0039', 'Caja Registradora TPV Táctil', 'Terminal punto de venta para hostelería', 750.00),
('PRD0040', 'Impresora de Comandas Térmica', 'Impresora para cocina resistente a grasa y humedad', 250.00),
('PRD0041', 'Lavavasos Industrial 35x35', 'Lavavasos compacto de bajo mostrador', 1150.00),
('PRD0042', 'Generador de Ozono Purificador de Aire', 'Desinfectante de ambientes para cámaras y salas', 450.00),
('PRD0043', 'Enfriador de Botellas Bajo Mostrador', 'Botellero refrigerado 2 puertas correderas', 890.00),
('PRD0044', 'Barbacoa Volcánica a Gas', 'Asador industrial de piedra volcánica', 1600.00),
('PRD0045', 'Cuecepasta Profesional 2 Cubas', 'Cocedor de pasta industrial a gas o eléctrico', 1450.00),
('PRD0046', 'Marmita Industrial Fija 100L', 'Recipiente calefactado para cocción de grandes volúmenes', 3100.00),
('PRD0047', 'Sarten Basculante Industrial a Gas', 'Sartén de cocción basculante motorizada', 3800.00),
('PRD0048', 'Destructora de Insectos Eléctrica UV', 'Lámpara mata insectos industrial para cocinas', 160.00),
('PRD0049', 'Dispensador de Cerveza de Barril', 'Grifo enfriadizo para cerveza de presión', 950.00),
('PRD0050', 'Secador de Manos de Alta Velocidad', 'Secador eléctrico de aire para baños de locales', 220.00);


-- ==========================================
-- 3. GENERACIÓN AUTOMÁTICA DE STOCK (PL/pgSQL)
-- ==========================================
DO $$
DECLARE
    r_prod RECORD;
    almacenes TEXT[] := ARRAY['ALM001', 'ALM002', 'ALM003'];
    alm TEXT;
BEGIN
    FOR r_prod IN SELECT idProd FROM productos LOOP
        FOREACH alm IN ARRAY almacenes LOOP
            INSERT INTO stock (idProd, idAlmacen, cantidadStock)
            VALUES (r_prod.idProd, alm, FLOOR(RANDOM() * 25 + 2)::INT)
            ON CONFLICT DO NOTHING;
        END LOOP;
    END LOOP;
END $$;


-- ==========================================
-- 4. GENERACIÓN AUTOMÁTICA DE COMPRAS (200 ops)
-- ==========================================
DO $$
DECLARE
    i INT;
    v_idProv TEXT;
    v_idProd TEXT;
    v_unidades INT;
    v_precio NUMERIC(10,2);
    v_fecha TIMESTAMP;
    arr_prov TEXT[];
    arr_prod TEXT[];
BEGIN
    SELECT ARRAY_AGG(idProveedor) INTO arr_prov FROM proveedores;
    SELECT ARRAY_AGG(idProd) INTO arr_prod FROM productos;

    FOR i IN 1..200 LOOP
        v_idProv := arr_prov[1 + FLOOR(RANDOM() * ARRAY_LENGTH(arr_prov, 1))];
        v_idProd := arr_prod[1 + FLOOR(RANDOM() * ARRAY_LENGTH(arr_prod, 1))];
        v_unidades := FLOOR(RANDOM() * 10 + 1)::INT;
        
        SELECT ROUND(precioProd * 0.75, 2) INTO v_precio FROM productos WHERE idProd = v_idProd;
        v_fecha := TIMESTAMP '2025-01-01 00:00:00' + (RANDOM() * (TIMESTAMP '2026-09-25 23:59:59' - TIMESTAMP '2025-01-01 00:00:00'));

        INSERT INTO compras (idCompra, idProveedor, idProd, unidadesCompra, precioUnidadCompra, totalCompra, fechaCompra)
        VALUES (
            'COM' || LPAD(i::TEXT, 4, '0'),
            v_idProv,
            v_idProd,
            v_unidades,
            v_precio,
            ROUND(v_unidades * v_precio, 2),
            v_fecha
        )
        ON CONFLICT DO NOTHING;
    END LOOP;
END $$;


-- ==========================================
-- 5. GENERACIÓN AUTOMÁTICA DE VENTAS (300 ops)
-- ==========================================
DO $$
DECLARE
    i INT;
    v_idCliente TEXT;
    v_idProd TEXT;
    v_unidades INT;
    v_precio NUMERIC(10,2);
    v_fecha TIMESTAMP;
    arr_client TEXT[];
    arr_prod TEXT[];
BEGIN
    SELECT ARRAY_AGG(idCliente) INTO arr_client FROM clientes;
    SELECT ARRAY_AGG(idProd) INTO arr_prod FROM productos;

    FOR i IN 1..300 LOOP
        v_idCliente := arr_client[1 + FLOOR(RANDOM() * ARRAY_LENGTH(arr_client, 1))];
        v_idProd := arr_prod[1 + FLOOR(RANDOM() * ARRAY_LENGTH(arr_prod, 1))];
        v_unidades := FLOOR(RANDOM() * 3 + 1)::INT;
        
        SELECT precioProd INTO v_precio FROM productos WHERE idProd = v_idProd;
        v_fecha := TIMESTAMP '2025-01-01 00:00:00' + (RANDOM() * (TIMESTAMP '2026-09-25 23:59:59' - TIMESTAMP '2025-01-01 00:00:00'));

        INSERT INTO ventas (idVenta, idProd, idCliente, unidadesVenta, precioUnidadVenta, totalVenta, fechaVenta)
        VALUES (
            'VEN' || LPAD(i::TEXT, 4, '0'),
            v_idProd,
            v_idCliente,
            v_unidades,
            v_precio,
            ROUND(v_unidades * v_precio, 2),
            v_fecha
        )
        ON CONFLICT DO NOTHING;
    END LOOP;
END $$;


-- ==========================================
-- 6. GENERACIÓN AUTOMÁTICA DE INTERVENCIONES (150 regs)
-- ==========================================
DO $$
DECLARE
    i INT;
    v_idProd TEXT;
    v_idServicio TEXT;
    v_idEstado TEXT;
    v_idCliente TEXT;
    arr_client TEXT[];
    arr_prod TEXT[];
    arr_serv TEXT[];
    arr_est TEXT[];
BEGIN
    SELECT ARRAY_AGG(idCliente) INTO arr_client FROM clientes;
    SELECT ARRAY_AGG(idProd) INTO arr_prod FROM productos;
    SELECT ARRAY_AGG(idServicio) INTO arr_serv FROM servicios;
    SELECT ARRAY_AGG(idEstado) INTO arr_est FROM estadoIntervencion;

    FOR i IN 1..150 LOOP
        v_idCliente := arr_client[1 + FLOOR(RANDOM() * ARRAY_LENGTH(arr_client, 1))];
        v_idProd := arr_prod[1 + FLOOR(RANDOM() * ARRAY_LENGTH(arr_prod, 1))];
        v_idServicio := arr_serv[1 + FLOOR(RANDOM() * ARRAY_LENGTH(arr_serv, 1))];
        v_idEstado := arr_est[1 + FLOOR(RANDOM() * ARRAY_LENGTH(arr_est, 1))];

        INSERT INTO intervenciones (idIntervencion, idProd, idServicio, idEstado, idCliente)
        VALUES (
            'INT' || LPAD(i::TEXT, 4, '0'),
            v_idProd,
            v_idServicio,
            v_idEstado,
            v_idCliente
        )
        ON CONFLICT DO NOTHING;
    END LOOP;
END $$;