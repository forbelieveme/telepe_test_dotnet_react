using System;
using System.IO;
using Newtonsoft.Json.Linq;

namespace Reglas_negocio
{
    public class Actualizacion
    {
        public JObject actualizar(long id, String usuario)
        {

            JObject user = JObject.Parse(usuario);
            JObject database = JObject.Parse(File.ReadAllText("/Users/macbookair/Documents/codigo/dotnet-tp-test/Reglas_negocio/user.json"));

            String user_id_db;
            JObject resp = new JObject();

            for (int i = 0; i < database.Value<JArray>("users").Count; i++)
            {
                user_id_db = database.Value<JArray>("users")[i].Value<String>("id");

                if (user_id_db == id.ToString())
                {
                    database.Value<JArray>("users")[i] = user;
                    resp["id_number"] = database.Value<JArray>("users")[i].Value<String>("id_number");
                    resp["error"] = 0;
                    resp["message"] = "Actualizado";
                    File.WriteAllText(@"/Users/macbookair/Documents/codigo/dotnet-tp-test/Reglas_negocio/user.json", database.ToString());
                    return resp;
                }
            }
            resp["id_number"] = user.Value<String>("id_number");
            resp["error"] = 1;
            resp["message"] = "Error en la actualizacion";

            return resp;
        }
    }
}
