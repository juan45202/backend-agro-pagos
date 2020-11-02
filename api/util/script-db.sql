CREATE TABLE agropagos.usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre varchar(15) NULL,
    apellido varchar(15) NULL,
    telefono varchar(10) NULL,
    correo varchar(20) NULL,
    rol varchar(15) NULL
);

CREATE TABLE agropagos.producto (
    id_producto SERIAL primary key,
    id_usuario integer NOT NULL,
    nombre varchar(15) NULL,
    precio_base varchar(10) NULL,
    fecha DATE NULL,
    descripcion text null
   
);

CREATE TABLE agropagos.video (
    id_video SERIAL PRIMARY KEY,
    id_usuario integer NOT NULL,
    id_producto integer NOT NULL,
    categoria varchar(30) NULL,
    video varchar(20) NULL
);

CREATE TABLE agropagos.ofertas (
    id_oferta varchar(20) PRIMARY key,
    ValorOferta varchar(20) NULL,
    id_producto integer NULL,
    cliente integer NULL
);

CREATE TABLE agropagos.usuarioProducto (
    id SERIAL PRIMARY KEY,
    id_usuario integer NOT null,
    id_producto integer NOT NULL
);

CREATE TABLE agropagos.usuarioOferta (
	id SERIAL PRIMARY key,
    id_oferta varchar(20) NOT NULL,
    id_usuario integer NOT NULL
);

ALTER TABLE agropagos.producto ADD CONSTRAINT usuario FOREIGN KEY (id_usuario) REFERENCES agropagos.usuario(id_usuario) ON UPDATE CASCADE;

ALTER TABLE agropagos.video ADD CONSTRAINT id_usuario FOREIGN KEY (id_usuario) REFERENCES agropagos.usuario(id_usuario) ON UPDATE CASCADE;
ALTER TABLE agropagos.video ADD CONSTRAINT id_producto FOREIGN KEY (id_producto) REFERENCES agropagos.producto(id_producto) ON UPDATE CASCADE;

ALTER TABLE agropagos.usuarioOferta ADD CONSTRAINT id_usuario FOREIGN KEY (id_usuario) REFERENCES agropagos.usuario(id_usuario) ON UPDATE CASCADE;
ALTER TABLE agropagos.usuarioOferta ADD CONSTRAINT id_oferta FOREIGN KEY (id_oferta) REFERENCES agropagos.ofertas(id_oferta) ON UPDATE CASCADE;

ALTER TABLE agropagos.usuarioProducto ADD CONSTRAINT id_usuario FOREIGN KEY (id_usuario) REFERENCES agropagos.usuario(id_usuario) ON UPDATE CASCADE;
ALTER TABLE agropagos.usuarioProducto ADD CONSTRAINT id_producto FOREIGN KEY (id_producto) REFERENCES agropagos.producto(id_producto) ON UPDATE CASCADE;

ALTER TABLE agropagos.ofertas ADD CONSTRAINT id_cliente FOREIGN KEY (cliente) REFERENCES agropagos.usuario(id_usuario) ON UPDATE CASCADE;
ALTER TABLE agropagos.ofertas ADD CONSTRAINT id_producto FOREIGN KEY (id_producto) REFERENCES agropagos.producto(id_producto) ON UPDATE CASCADE;
