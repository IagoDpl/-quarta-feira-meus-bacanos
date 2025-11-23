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
            // 1. Pega a data atual do servidor
            var dataAtual = DateTime.Now;

            // 2. Verifica se o dia da semana é Quarta-feira (Wednesday)
            bool eQuartaFeira = dataAtual.DayOfWeek == DayOfWeek.Wednesday;
            // 3. Retorna um objeto JSON para o React
            return Ok(new
            {
                diaDaSemana = dataAtual.DayOfWeek.ToString(),
                ehDiaDoSapinho = eQuartaFeira,
                mensagem = eQuartaFeira ? "Quartou!" : "Ainda não, meu chapa."
            });
        }
    }
}