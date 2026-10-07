import styled from 'styled-components';
import banner from '../assets/casasHeader.webp';

const Topo = styled.header`
  margin-bottom: 40px;
`;

const Banner = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 24px;
  border-radius: ${({ theme }) => theme.raio};
`;

const Subtitulo = styled.p`
  max-width: 560px;
  margin: 0 auto;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.cores.textoSuave};
`;

function Cabecalho() {
  return (
    <Topo>
      <Banner src={banner} alt="Brasões de Gryffindor, Hufflepuff, Ravenclaw e Slytherin" />
      <h1>Casas de Hogwarts</h1>
      <Subtitulo>
        Conheça as quatro casas e faça o quiz do Chapéu Seletor para descobrir a sua.
      </Subtitulo>
    </Topo>
  );
}

export default Cabecalho;
