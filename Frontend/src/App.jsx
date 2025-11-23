import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  // Estado para controlar se mostramos o sapo ou não
  const [ehQuarta, setEhQuarta] = useState(false);
  const [mensagem, setMensagem] = useState("Verificando o calendário...");

  useEffect(() => {
    axios.get('http://localhost:5000/QuartaFeira')
      .then(response => {
        // O back-end nos diz se é verdade (true) ou mentira (false)
        setEhQuarta(response.data.ehDiaDoSapinho);
        setMensagem(response.data.mensagem);
      })
      .catch(error => {
        console.error("Ocorreu um erro:", error);
        setMensagem("Erro ao contatar o oráculo do tempo.");
      });
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      marginTop: '50px',
      fontFamily: 'Arial' 
    }}>
      <h1>Já é quarta?</h1>
      
      <h3>Status: {mensagem}</h3>

      {/* Renderização Condicional:
          Se ehQuarta for TRUE, mostra a imagem.
          Se for FALSE, mostra null (nada).
      */}
      {ehQuarta ? (
        <div className="festa-do-sapo">
            {/* URL direta de uma imagem do sapo */}
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzqudO73cStocKuXMcqoOWUEqXuvl_-MU-cQ&s" 
              alt="É quarta feira meus bacanas" 
              style={{ width: '300px', borderRadius: '15px', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}
            />
            <h1 style={{color: 'green'}}>É QUARTA-FEIRA MEUS BACANAS!</h1>
        </div>
      ) : (
        <div style={{ padding: '20px', background: '#eee', borderRadius: '8px' }}>
            <p>Volte na quarta-feira.</p>
        </div>
      )}
    </div>
  );
}

export default App;