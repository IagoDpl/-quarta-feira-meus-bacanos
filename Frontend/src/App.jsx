import { useEffect, useState } from "react";
import axios from "axios";

const calcularDiferenca = () => {
  const agora = new Date();
  const diaDaSemana = agora.getDay(); // 0 = Domingo, 3 = Quarta
  
  let diasParaAdicionar = 3 - diaDaSemana;
  if (diasParaAdicionar <= 0) {
    diasParaAdicionar += 7;
  }

  const dataAlvo = new Date(agora);
  dataAlvo.setDate(agora.getDate() + diasParaAdicionar);
  dataAlvo.setHours(0, 0, 0, 0);

  const diferenca = dataAlvo - agora;

  return {
    dias: Math.floor(diferenca / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diferenca / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diferenca / 1000 / 60) % 60),
    segundos: Math.floor((diferenca / 1000) % 60)
  };
};

function App() {

  const [ehQuarta, setEhQuarta] = useState(false);
  const [mensagem, setMensagem] = useState("Verificando o calendário...");
  const [tempoRestante, setTempoRestante] = useState(calcularDiferenca);

  const apiUrl = import.meta.env.DEV
    ? "http://localhost:5000/QuartaFeira"
    : "https://e-quarta-feira-meus-bacanos.onrender.com/";

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        
        // O back-end nos diz se é verdade (true) ou mentira (false)
        const resultado =
          response.data.ehDiaDoSapinho || response.data.EhDiaDoSapinho;

        setEhQuarta(resultado);
        setMensagem(response.data.mensagem || response.data.Mensagem);
        
      })
      .catch((error) => {
        console.error("Ocorreu um erro:", error);
        setMensagem("Erro ao contatar o oráculo do tempo.");
      });
      
  }, [apiUrl]);
  


  useEffect(() => {
    // Se NÃO for quarta, liga o relógio
    if (!ehQuarta) {
      // Cria o intervalo que chama a função matemática a cada 1 segundo
      const timer = setInterval(() => {
        setTempoRestante(calcularDiferenca());
      }, 1000);

      // Limpa o timer quando o componente desmonta ou quando ehQuarta muda
      return () => clearInterval(timer);
    }
  }, [ehQuarta]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <h2>{mensagem}</h2>
      {/* Renderização Condicional:
          Se ehQuarta for TRUE, mostra a imagem.
          Se for FALSE, mostra null (nada).
      */}
      {ehQuarta ? (
        <div className="festa-do-sapo" style={{ textAlign: "center" }}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzqudO73cStocKuXMcqoOWUEqXuvl_-MU-cQ&s"
            alt="É quarta feira meus bacanos"
            style={{
              width: "300px",
              borderRadius: "15px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
            }}
          />
          <h1 style={{ color: "green" }}>É QUARTA-FEIRA MEUS BACANOS!</h1>
        </div>
      ) : (
        <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <h2 style={{color: '#666'}}>Quanto tempo pra quarta feira?</h2>
            
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#333', margin: '20px 0' }}>
              <span>{tempoRestante.dias}d </span>
              <span>{tempoRestante.horas.toString().padStart(2, '0')}h </span>
              <span>{tempoRestante.minutos.toString().padStart(2, '0')}m </span>
              <span style={{fontSize: '1.5rem', color: '#999'}}>{tempoRestante.segundos.toString().padStart(2, '0')}s</span>
            </div>
            
        </div>
      )}
    </div>
  );
}
export default App;