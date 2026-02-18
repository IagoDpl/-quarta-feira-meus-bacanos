using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuartaFeiraController : ControllerBase
    {
        [HttpGet]
        public IActionResult VerificarDia()
        {
            // Pega a hora UTC (universal) e subtrai 3 horas (Brasília)
            // Isso funciona em qualquer sistema operacional (Windows ou Linux)
            var dataBrasilia = DateTime.UtcNow.AddHours(-3);

            // Verifica se é quarta-feira
            bool eQuartaFeira = dataBrasilia.DayOfWeek == DayOfWeek.Wednesday;

            return Ok(new
            {
                diaDaSemana = dataBrasilia.DayOfWeek.ToString(),
                ehDiaDoSapinho = eQuartaFeira,
                mensagem = eQuartaFeira ? "Quartou!" : "Ainda não, meu chapa.",
                horaNoServidor = dataBrasilia.ToString("HH:mm:ss")
            });
        }
    }
}