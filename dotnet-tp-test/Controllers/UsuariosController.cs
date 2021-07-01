using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnet_tp_test.Models;
using Reglas_negocio;
using System.Net.Http;
using Newtonsoft.Json;

namespace dotnet_tp_test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly TestContext _context;

        public UsuariosController(TestContext context)
        {
            _context = context;
        }


        // PUT: api/Usuarios/5
        [HttpPut("{id}")]
        public ContentResult PutUsuario(long id, Usuario usuario)
        {

            Actualizacion act = new Actualizacion();
            String output = JsonConvert.SerializeObject(usuario);

            ContentResult json = Content(act.actualizar(id, output).ToString(), "application/json");
            return json;
        }

        // POST: api/Usuarios
        [HttpPost]
        public ContentResult PostUsuario(Usuario usuario)
        {

            Validacion val = new Validacion();


            ContentResult json = Content(val.validar(usuario.id_number).ToString(), "application/json");


            return json;
        }

    }
}
