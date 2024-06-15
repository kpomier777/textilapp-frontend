Ovillado se deriva de un devanado
denominado lote,
este tiene una cantidad y
cada unidad tiene un peso y un precio


Despacho:
podemos vender
- Paquete de 5 ovillados -(%)
- Bolsas 72kg -> Paquetes -(%)
- Unidad -(%)

Despacho_Obillada:
- id_ovillado
- id_despacho




Devanado/Ovillado:
  Producto:
    - nombre
    - lote

    - titulo_id
    - color_id
    - peso_neto -> calculo de bolsas/bolsitas/ovillo

guardar-calculos
  - bolsas
  - bolsitas
  - ovillos

cambia
    - area_id
    - operador_id
      - cod_operador
      - nombre_operador
      - turno_id
        - turno_nombre


operador_id
  - cod_operador
  - nombre_operador
  - turno_id
    - turno_nombre

cliente_id
  - nombre_cliente

fecha


Tintoreria-estampado-vaporizado

cod_tina
cod_maquina
--- cambia
  - area
  - operador_id
    - cod_operador
    - nombre_operador
    - turno_id
      - turno_nombre


Historial de proceso
  - id_producto
  - id_tintoreria
  - id_devanado/ovillado