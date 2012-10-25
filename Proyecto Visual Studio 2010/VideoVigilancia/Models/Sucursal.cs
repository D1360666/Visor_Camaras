using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VideoVigilancia.Models
{
    public class Sucursal
    {
        public int Codigo { get; set; }
        public string Nombre { get; set; }
        public List<Camara> Camaras;
    }
}