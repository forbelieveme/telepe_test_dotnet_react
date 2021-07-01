using System;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Reglas_negocio
{
    public class Validacion
    {
        public JObject validar(String user_id)
        {
            JObject data = JObject.Parse(File.ReadAllText("/Users/macbookair/Documents/codigo/dotnet-tp-test/Reglas_negocio/user.json"));

            //data.Value<JArray>("usuarios")[0]
            //data.Value<JArray>("usuarios").Count
            //data.Value<JArray>("users")[0].Value<String>("id_number");

            //String username_db = data.Value<JArray>("usuarios")[0].Value<String>("username");
            //String password_db = data.Value<JArray>("usuarios")[0].Value<String>("password");

            String user_id_db;
            Boolean user_auth_db;
            JObject resp = new JObject();


            for (int i = 0; i < data.Value<JArray>("users").Count; i++)
            {
                user_id_db = data.Value<JArray>("users")[i].Value<String>("id_number");
                user_auth_db = data.Value<JArray>("users")[i].Value<Boolean>("auth");
                resp = (JObject)data.Value<JArray>("users")[i];
                if (user_id_db == user_id)
                {
                    if (user_auth_db)
                    {
                        resp["error"] = 0;
                        resp["message"] = "Autorizado";
                        return resp;
                    }
                    resp.RemoveAll();
                    resp["id_number"] = user_id;
                    resp["error"] = 1;
                    resp["message"] = "El usuario no tiene autorización para modificar el registro";
                    return resp;
                }
            }
            resp.RemoveAll();
            resp["id_number"] = user_id;
            resp["error"] = 2;
            resp["message"] = "El usuario no se encuentra registrado en la base de datos";
            return resp;

        }
    }
}
