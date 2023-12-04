<<<<<<< HEAD
rutes:

***Autenticación de usuario (auth)***
POST: 
-Registro: "/auth/register" {name, email, password}
-Login: "/auth/login" {email, password}

PATCH
-Verificación: "/auth/verify" {email, code}

***Productos (products)***
POST
GET:
-Traer todos los productos de la DB: "/products"

POST:
-Agregar un nuevo producto a la DB: "/products" {id, title, desc, img, price, stock} (con token de ADMIN en headers)

PATCH:
-Modificar stock de un producto: "/products/changeStock" {id, stock} (con token de ADMIN)
-Editar alguna info de un producto. Va id y luego algun/os campo/s a editar: "/changeProduct" {id, {desc, img, price, title}} (requiere token de ADMIN en headers)


***Productos Favoritos (Favs)***
GET:
-Productos favoritos por usuario: 
"/favs" (token de usuario en headers)

POST:
-Aregar producto a favoritos
"/favs" {products: id} (token de usuario en headers)

***Ordenes de compra (orders)***
POST:
-Ejecutar órden de compra(tiene validación de stock, si no hay no se hace):
"/orders"
{ "totalPrice", "shippingCost", "shippingDetails": { "name", "cellphone", "location", "adress" },
    "items": [ {"desc", "id", "img", "price", "quantity", "title"} ]
}
GET:
-Órdenes por usuario: "/orders" ()


//USUARIO ADMIN
email: carlamail@mail.com
pass: carlaesadmin

//USUARIO COMUN
email: paulamail@mail.com
pass: paulapass
(SIN VERIFICAR)

//USURIO COMUN VERIFICADO
email: loremail@mail.com
pass: lorepass
=======
routes:

***Autenticación de usuario (auth)***
POST: 
-Registro: "/auth/register" {name, email, password}
-Login: "/auth/login" {email, password}

PATCH
-Verificación: "/auth/verify" {email, code}

***Productos (products)***
GET:
-Traer todos los productos de la DB: "/products"

POST:
-Agregar un nuevo producto a la DB: "/products" {id, title, desc, img, price, stock} (con token de ADMIN en headers)

PATCH:
-Modificar stock de un producto: "/products/changeStock" {id, stock} (con token de ADMIN)
-Editar alguna info de un producto. Va id y luego algun/os campo/s a editar: "/changeProduct" {id, {desc, img, price, title}} (requiere token de ADMIN en headers)


***Productos Favoritos (Favs)***
GET:
-Productos favoritos por usuario: 
"/favs" (token de usuario en headers)

POST:
-Aregar producto a favoritos
"/favs" {products: id} (token de usuario en headers)

***Ordenes de compra (orders)***
POST:
-Ejecutar órden de compra(tiene validación de stock, si no hay no se hace):
"/orders"
{ "totalPrice", "shippingCost", "shippingDetails": { "name", "cellphone", "location", "adress" },
    "items": [ {"desc", "id", "img", "price", "quantity", "title"} ]
}
GET:
-Órdenes por usuario: "/orders" ()


//USUARIO ADMIN
email: carlamail@mail.com
pass: carlaesadmin

//USUARIO COMUN
email: paulamail@mail.com
pass: paulapass
(SIN VERIFICAR)

//USURIO COMUN VERIFICADO
email: loremail@mail.com
pass: lorepass
>>>>>>> refs/remotes/origin/main
