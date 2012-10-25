using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VideoVigilancia.Models
{
    public class Camara
    {
        public string Nombre { get; set; }
        public string Ip { get; set; }
        public string Marca { get; set; }
        public int Sucursal { get; set; }
    }
}