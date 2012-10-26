$(document).ready(function(){
    var path="/Camaras/";
    //var path = "/videovigilancia/Camaras/";
  var UsuarioModel = Backbone.Model.extend({
    initialize: function(){

    }
  });
  var CamaraModel = Backbone.Model.extend({
  initialize: function(){
  }

  });
	
 // COLECCIONES ===============================================
  var UsuarioColeccion= Backbone.Collection.extend({
    model: UsuarioModel
  });

  var CamaraColeccion = Backbone.Collection.extend({
  model: CamaraModel
  });



  var ColeccionShopping = new CamaraColeccion();
    ColeccionShopping.url = path + 'getCamaras/Shopping';
  var ColeccionHipercentro = new CamaraColeccion();
    ColeccionHipercentro.url = path +  'getCamaras/Hipercentro';
  var ColeccionPlaza = new CamaraColeccion();
    ColeccionPlaza.url = path +  'getCamaras/Plaza';
  var ColeccionNorte = new CamaraColeccion();
    ColeccionNorte.url = path +  'getCamaras/Norte';
  
   
  //var CargarModal = '<div class="modal hide fade" id="mimodal"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button><h3>Bienvenido.</h3></div><div class="modal-body"><form class="form-horizontal"><div class="control-group"><label class="control-label" for="inputEmail">Usuario</label><div class="controls"><input type="text" id="inputEmail" placeholder="Usuario"></div></div><div class="control-group"><label class="control-label" for="inputPassword">Contraseña</label><div class="controls"><input type="password" id="inputPassword" placeholder="Contraseña"></div></div><div class="control-group"><div class="controls"><label class="checkbox"><input type="checkbox"> Recordame</label><!--<button type="submit" class="btn" id="sesion">Iniciar Sesión</button>--></div></div></form><div class="modal-footer"><a href="#" class="btn">Iniciar Sesión</a><a href="#" class="btn btn-primary id="cerrarModal">Cerrar</a></div></div>';
  //$('#Aplicacion').html(CargarModal);
  $('#modalLogin').modal();
  
  var ColeccionUsuarios = new UsuarioColeccion();
    ColeccionUsuarios.url = 'getUsuarios';
    
  
  

//CONTROLADORES=======================================================
var CamaraController = Backbone.Router.extend({
  routes:{
  	'MostrarCamaras/:sucursal': 'MostrarCamaras', 
    'Visor/:accion': 'EjecutarAccion',
    'login': 'Login',
    'logout': 'Logout'
  },
  	MostrarCamaras:function(suc){
  			switch (suc){
  			case 'Shopping':
  				VistaListado.listadoNuevo(ColeccionShopping);
          Backbone.history.navigate('#');
  			break;
  			case 'Hipercentro':
  				VistaListado.listadoNuevo(ColeccionHipercentro);
          Backbone.history.navigate('#');
  			break;
  			case 'Plaza': 
  				VistaListado.listadoNuevo(ColeccionPlaza);
          Backbone.history.navigate('#');
  			break;
  			case 'Norte':
  				VistaListado.listadoNuevo(ColeccionNorte);
          Backbone.history.navigate('#');
  			break;
  		}
  	},
    EjecutarAccion:function(accion){
      switch (accion){
        case 'LimpiarVisor':
          VistaVisor.LimpiarVisor();
          Backbone.history.navigate('#');
        break;

      }
    },
//LOGIN DE USUARIO=====================================================================
    Login:function(){
      
      $.ajax({
        type: 'POST',
        url: path+'Login',
        data: {usuario: $('#inputEmail').val(), password: $('#inputPassword').val()},
      success: function(data) {
        if (data.Estado){
          alert('hola');
          $('#modalLogin').modal('hide');
          $('#contenedor').fadeIn();
          ColeccionShopping.fetch({data:{Rol: data.Rol}});
          ColeccionHipercentro.fetch({data:{Rol: data.Rol}});
          ColeccionPlaza.fetch({data:{Rol: data.Rol}});
          ColeccionNorte.fetch({data:{Rol: data.Rol}});
        }else{
          alert("No existe el usuario ingresado.");
        }
      }
      });
      Backbone.history.navigate('#');
    },

//LOGOUT DE USUARIO=====================================================================
    Logout:function(){
      $('#contenedor').fadeOut();
      $('#modalLogin').modal();

      Backbone.history.navigate('#');
    }
});
var controlador = new CamaraController();



//VISTAS =============================================================

//MODELO DE VISTA DEL LISTADO DE CAMARAS POR SUCURSAL
var CamarasView = Backbone.View.extend({
  initialize:function(){
    _.bindAll(this,'render', 'listadoNuevo');
		//this.render();
  },
  el:'#ListaCamaras',
  render:function(){
    algo=this;
  	_(this.collection.models).each(function(Camara){
  	  var cam = new CamaraItemView({model:Camara});
  	  $('#' + algo.el.id + ' ul').append(cam.render().el);
      $('#' + algo.el.id + '#ListaCamaras ul').addClass('nav nav-list');
    }); 
  },
 listadoNuevo:function(CamarasSucursal){
 	this.collection= CamarasSucursal;
 	$('#' + this.el.id + ' ul').empty();
 	this.render();
  }
});

var CamarasVisorView = Backbone.View.extend({
 initialize:function(){
 	_.bindAll(this, 'render', 'CargarCamara', 'AgregarCamaraAlVisor', 'QuitarCamaraDelVisor', 'LimpiarVisor');
 	this.render();
  this.ColeccionCamarasVisor = new CamaraColeccion();

 },
 el:'#Visor',
 render:function(){
 	 },
 CargarCamara:function(camara){
  
  $('#' + this.el.id + ' #PanelCamaras').empty();
  vista = new VistaCamaraDelVisor({model:camara});
  $('#' + this.el.id + ' #PanelCamaras').append(vista.render('640', '520').el);
  $('#ListaCamaras ul li input').removeAttr('checked');
  $('#botones').show();
 },

AgregarCamaraAlVisor:function(camara){
  
  vista = new VistaCamaraDelVisor({model:camara});
  if (this.ColeccionCamarasVisor.length < 1){
    $('#' + this.el.id + ' #PanelCamaras').append(vista.render('640', '520').el);
  }else{
    if(this.ColeccionCamarasVisor.length == 1) this.ColeccionCamarasVisor.at(0).trigger('change');  

    $('#' + this.el.id + ' #PanelCamaras').append(vista.render('320', '260').el);
    $('#' + this.el.id + ' #PanelCamaras div').addClass('span4');
  }
  $('#botones').show();
  this.ColeccionCamarasVisor.add(camara);
  },

QuitarCamaraDelVisor:function(camara){

  var token=_.find(this.ColeccionCamarasVisor.models, function(c){
    return c.get('Nombre')==camara.get('Nombre');
  });
  if (typeof(token)=='undefined'){
    alert("Camara no existe en la panel.");
  }else{
    token.trigger('destroy');
    this.ColeccionCamarasVisor.remove(camara); 
  }
   
},
LimpiarVisor:function(){
  this.ColeccionCamarasVisor.reset();
  $('#' + this.el.id + ' #PanelCamaras').empty();
  $('#ListaCamaras ul li input').removeAttr('checked');
  $('#botones').hide();
}


});

//MODELO de VISTA de CADA ITEM DEL LISTADO
var CamaraItemView = Backbone.View.extend({
	tagName: 'li',

  initialize:function(){
	_.bindAll(this,'render', 'AgregarAlVisor', 'CargarVisor');
	},
	render:function(){
		$(this.el).html('<input type="checkbox"><label>' + this.model.get('Nombre') + '</label>');
		return this;
	},
	events:{
		'click label': 'CargarVisor',
    'click input': 'AgregarAlVisor'
	},
  AgregarAlVisor:function(){
    
    var cadena = $(this.el).find('input');
    
    if ($(cadena).is(":checked")){
     VistaVisor.AgregarCamaraAlVisor(this.model);
    }
    else{
      VistaVisor.QuitarCamaraDelVisor(this.model);
    }
  },
	CargarVisor:function(){
   
		VistaVisor.CargarCamara(this.model);
	}

});

var VistaCamaraDelVisor = Backbone.View.extend({
  initialize:function(){
    _.bindAll(this, 'render', 'unrender');
    this.model.bind('change',this.render);
    this.model.bind('destroy', this.unrender);
  },
  events: {
    'click': 'testing'
  },

  testing:function(){
    
  },

  render:function(largo, ancho){
    if (typeof(largo) == "undefined"){
      largo= '320';
      ancho= '260';
    }
  switch(this.model.get('Marca')){
    case 'Trendnet':
      var html;
        switch (this.model.get('Sucursal')){
          case 1:
            html= "<h5>" +"Shopping - " + this.model.get('Nombre') + "</h5>";
          break;
          case 2:
            html= "<h5>" +"Plaza - " + this.model.get('Nombre') + "</h5>";
          break;
          case 3:
            html= "<h5>" +"Hipercentro - " + this.model.get('Nombre') + "</h5>";
          break;
          case 4:
            html= "<h5>" +"Plaza - " + this.model.get('Nombre') + "</h5>";
          break;
        }
      html= html + "<embed type='application/x-java-applet' code='xplug.class' archive='xplug.jar' name='cvcs' width=" + largo + "' height='"+ ancho +"' codebase='http://" + this.model.get("Ip") + "' menuheight='40' RemotePort='80' Timeout='10000' RotateAngle='0' PreviewFrameRate='2' DeviceSerialNo='' mayscript='true' scriptable='true' xmode='view' bg='0xd5dfea' inittrigger='false' pluginspage='http://java.sun.com/javase/downloads/index.jsp'></embed>";
    
    break;
    case 'TP-Link':
      switch (this.model.get('Sucursal')){
          case 1:
            html= "<h5>" +"Shopping - " + this.model.get('Nombre') + "</h5>";
          break;
          case 2:
            html= "<h5>" +"Plaza - " + this.model.get('Nombre') + "</h5>";
          break;
          case 3:
            html= "<h5>" +"Hipercentro - " + this.model.get('Nombre') + "</h5>";
          break;
          case 4:
            html= "<h5>" +"Plaza - " + this.model.get('Nombre') + "</h5>";
          break;
        }
    //html="<h5>" + this.model.get('Nombre') +"</h5>";
    html=html + "<embed src='rtsp://"+ this.model.get('Ip') + ":80/video.h264' width=" + largo + " height=" + ancho + " volume=100 autostart=true loop=1  type='application/x-mplayer2' pluginspage='http://www.microsoft.com/Windows/MediaPlayer/download/default.asp'></embed>";
      
    break;
  }
  $(this.el).html(html);
  return this;
  },
  
  unrender:function(){
    $(this.el).remove();
  }
});



var VistaListado = new CamarasView();
var VistaVisor = new CamarasVisorView();


Backbone.history.start();
});
	