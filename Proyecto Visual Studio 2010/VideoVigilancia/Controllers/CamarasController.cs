using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VideoVigilancia.Models;
using Oracle.DataAccess.Client;

namespace VideoVigilancia.Controllers
{
    public class CamarasController : Controller
    {
        public string oradb = "Data Source=(DESCRIPTION=(ADDRESS_LIST="
  + "(ADDRESS=(PROTOCOL=TCP)(HOST=192.168.0.100)(PORT=1521)))"
  + "(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=sstar)));"
  + "User Id=tecnico;Password=santiago;";        
        //
        // GET: /Camaras/

        public ActionResult Index()
        {
            return View();
        }

        //
        // GET: /Camaras/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /Camaras/Create

        public ActionResult Create()
        {
            return View();
        } 

        //
        // POST: /Camaras/Create

        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
        
        //
        // GET: /Camaras/Edit/5
 
        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /Camaras/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here
 
                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Camaras/Delete/5
 
        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /Camaras/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here
 
                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
        [HttpGet]
        public JsonResult getCamaras(String id)
        {
            //var sucursal=id.Split('/');
            int Nro_Sucursal=-1;
            switch (id)
            {
                case "Shopping":
                    Nro_Sucursal = 1;
                break;
                case "Plaza":
                Nro_Sucursal = 2;
                break;
                case "Hipercentro":
                    Nro_Sucursal = 3;
                break;
                case "Norte":
                    Nro_Sucursal = 1;
                break;
                default :
//                  res.json({Mensaje: 'No existe sucursal'});
                Nro_Sucursal = 1;
                break;
            }


            OracleConnection conn = new OracleConnection(oradb);
            conn.Open();
            OracleCommand cmd = new OracleCommand();
            cmd.Connection = conn;
            cmd.CommandText = "select nombre,ip,marca from camaras where sucursal=" +Nro_Sucursal;
            OracleDataReader dr = cmd.ExecuteReader();
            List<Camara> Camaras = new List<Camara>();
            while (dr.Read())
            {
                Camara c = new Camara();
                c.Nombre = dr.GetString(0);
                c.Ip = dr.GetString(1);
                c.Marca = dr.GetString(2);
                c.Sucursal = Nro_Sucursal;
                Camaras.Add(c);
            }
            cmd.Dispose();
            conn.Dispose();
            return this.Json(Camaras,JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Login(string Usuario, string Contrasena)
        {

            Respuesta r=new Respuesta();
            r.Estado = true;
            r.Rol = "admin";
            return this.Json(r);

        }
        class Respuesta{
        public bool Estado;
        public string Rol;
        }

    }
}
