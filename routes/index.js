
/*
 * GET home page.
 */
 var _=require('underscore');

 var ColeccionShopping =[{Nombre:'CajaFuerte', Ip:'192.168.1.108', Marca: 'Trendnet', Sucursal: 1},
 					  	 {Nombre:'Cajeros', Ip:'192.168.1.109', Marca: 'Tplink', Sucursal: 1}, 
 					  	 {Nombre:'Carniceria', Ip:'192.168.1.106', Marca:'Tplink', Sucursal: 1}, 
 					  	 {Nombre:'CAtencion', Ip:'192.168.1.104', Marca: 'Trendnet', Sucursal: 1}, 
 					  	 {Nombre:'Deposito', Ip:'192.168.1.144', Marca:'Trendnet', Sucursal: 1}, 
  						 {Nombre:'Ent Fruteria', Ip:'192.168.1.137', Marca:'Trendnet', Sucursal: 1},
  						 {Nombre:'Ent Shopping', Ip:'192.168.1.142', Marca:'Trendnet', Sucursal: 1},
  						 {Nombre:'Revisacion', Ip:'192.168.1.151', Marca:'Trendnet', Sucursal: 1}, 
  						 {Nombre: 'Tienda', Ip:'192.168.1.162', Marca:'Trendnet', Sucursal: 1}, 
  						 {Nombre: 'Cajas1', Ip:'192.168.1.105', Marca:'Tplink', Sucursal: 1}, 
  						 {Nombre:'Cajas2', Ip:'192.168.1.107', Marca:'Tplink', Sucursal: 1}
  	];
  var ColeccionHipercentro = [{Nombre: 'Cajas2', Ip:'192.168.2.10', Marca: 'Tplink', Sucursal: 3}, 
  							  {Nombre:'Cajas4', Ip:'192.168.2.11', Marca: 'Tplink', Sucursal: 3}, 
  							  {Nombre:'Carniceria', Ip:'192.168.2.12', Marca: 'Tplink', Sucursal: 3},
  							  {Nombre:'Entrada Deposito', Ip:'192.168.2.13', Marca: 'Trendnet', Sucursal: 3}, 
  							  {Nombre: 'Entrada Deposito', Ip:'192.168.2.14', Marca: 'Trendnet', Sucursal: 3},
  							  {Nombre:'fiambreria', Ip:'192.168.2.15', Marca: 'Trendnet', Sucursal: 3}, 
  							  {Nombre:'reloj', Ip:'192.168.2.16', Marca: 'Trendnet', Sucursal: 3},
  							  {Nombre:'ropa', Ip:'192.168.2.17', Marca: 'Trendnet', Sucursal: 3}, 
  							  {Nombre:'salida carn', Ip:'192.168.2.18', Marca: 'Trendnet', Sucursal: 3}, 
  							  {Nombre:'fruteria', Ip:'192.168.2.19', Marca: 'Trendnet', Sucursal: 3}, 
  							  {Nombre:'Cajas3', Ip:'192.168.2.20', Marca: 'Tplink', Sucursal: 3},
  							  {Nombre:'Entrada Deposito2', Ip:'192.168.2.21', Marca: 'Trendnet', Sucursal: 3}, 
  							  {Nombre:'CAtencion', Ip:'192.168.2.22', Marca: 'Trendnet', Sucursal: 3}, 
  							  {Nombre:'caja fuerte', Ip:'192.168.2.23', Marca: 'Tplink', Sucursal: 3}, 
  							  {Nombre: 'Cajas1', Ip: '192.168.2.24', Marca: 'Tplink', Sucursal: 3},
  							  {Nombre:'inalambrica', Ip:'192.168.2.250', Marca: 'Trendnet', Sucursal: 3}, 
  							  {Nombre:'inacomputus', Ip:'192.168.2.251', Marca: 'Trendnet', Sucursal: 3}
  	//{Nombre:'inadeposito', Ip:'192.168.2.25'}, {Nombre:'bolsera', Ip:'192.168.2.26'}
  	];
  var ColeccionPlaza = [{Nombre:'Cajas 1', Ip:'192.168.4.10', Marca: 'Tplink', Sucursal: 2}, 
  				 	  	{Nombre:'Cajas 2', Ip:'192.168.4.11', Marca: 'Tplink', Sucursal: 2}, 
  				 	  	{Nombre:'Carniceria', Ip:'192.168.4.12', Marca: 'Trendnet', Sucursal: 2},
  				 	  	{Nombre:'cocina', Ip:'192.168.4.13', Marca: 'Tplink', Sucursal: 2},
  				 	  	{Nombre:'sistema', Ip:'192.168.4.14', Marca: 'Trendnet', Sucursal: 2}
  	];
  var ColeccionNorte = [{Nombre:'Caja fuerte', Ip:'192.168.3.18', Marca: 'Trendnet', Sucursal: 4}, 
  					  	{Nombre:'Deposito 1', Ip:'192.168.3.12', Marca: 'Trendnet', Sucursal: 4},
  					  	{Nombre:'Deposito 2', Ip:'192.168.3.13', Marca: 'Trendnet', Sucursal: 4},
  					  	{Nombre:'Deposito 3', Ip:'192.168.3.14', Marca: 'Trendnet', Sucursal: 4}, 
  					  	{Nombre:'Fiambreria', Ip:'192.168.3.16', Marca: 'Trendnet', Sucursal: 4}, 
  					  	{Nombre:'Ropa', Ip:'192.168.3.15', Marca: 'Trendnet', Sucursal: 4}, 
  					  	{Nombre:'Carniceria', Ip:'192.168.3.11', Marca: 'Tplink', Sucursal: 4},
  					  	{Nombre:'cAtencion', Ip:'192.168.3.19', Marca:'Trendnet', Sucursal: 4}, 
  					  	{Nombre:'Cajas', Ip:'192.168.3.10', Marca: 'Tplink', Sucursal: 4}, 
  					  	{Nombre:'Cajas 2', Ip:'192.168.3.20', Marca: 'Tplink', Sucursal: 4}
  	];
  var ColeccionUsuarios = [{Usuario:'diego', Contrasena:'1234', Rol:'admin'},
                {Usuario:'jesus', Contrasena:'5678', Rol: 'admin'},
                {Usuario:'laura', Contrasena:'1234', Rol:'Shopping'},
                {Usuario:'fiorella', Contrasena:'1234', Rol:'Plaza'},
                {Usuario:'fernando', Contrasena:'1234', Rol:'Hipercentro'},
                {Usuario:'alicia', Contrasena:'1234', Rol:'Norte'}
  ];
exports.index = function(req, res){
  res.render('index', { title: 'Sistema de Videovigilancia - Supermercados Superstar Ltda.' });
};
exports.Login = function(req, res){
  var usuario = _(ColeccionUsuarios).detect(function(usr){
    return usr.Usuario == req.body.usuario && usr.Contrasena == req.body.password;
  });
  if (typeof(usuario)!= 'undefined'){
    res.json({Estado: true, Rol: usuario.Rol});
  }else{
    res.json({Estado: false});
  }
}


exports.getCamaras = function(req, res){
  console.log(req.query.Rol);
  
  switch (req.params.Sucursal){
    case 'Shopping' :
        res.json(ColeccionShopping);
    break;
    case 'Hipercentro' :
      res.json(ColeccionHipercentro);
    break;
    case 'Plaza' :
      res.json(ColeccionPlaza);
    break;
    case 'Norte' :
      res.json(ColeccionNorte);
    break;
    default :
      res.json({Mensaje: 'No existe sucursal'});
    break;
}
};

