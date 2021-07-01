using System;
namespace dotnet_tp_test.Models
{
    public class Usuario
    {
        //public long Id { get; set; }
        //public string Name { get; set; }
        //public bool IsComplete { get; set; }


        public String id { get; set; }
        public String id_number { get; set; }
        public String id_type { get; set; }
        public String company_name { get; set; }
        public String first_name { get; set; }
        public String second_name { get; set; }
        public String first_lastName { get; set; }
        public String second_lastName { get; set; }
        public String email { get; set; }
        public Boolean sms_send { get; set; }
        public Boolean email_send { get; set; }
        public Boolean auth { get; set; }
    }
}
