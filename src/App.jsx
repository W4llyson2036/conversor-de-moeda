// Lib
import { useState } from 'react';
import styled from 'styled-components';

// JS
import { formatDate } from '../utils/time';

// Components
import CurrencyCard from './components/CurrencyCard/CurrencyCard';
import ConversionResult from './components/ConversionResult/ConversionResult';

// CSS 
import './style/index.css';
import './style/reset.css';
import './style/variables.css';

function App() {
    const [showCurrencyCard, setShowCurrencyCard] = useState(true);
    const [total, setTotal] = useState(0);

    return (
        <>
            <Nav>
                <Icon>
                    <svg className="icon">
                        <use xlinkHref="icons.svg#main-logo"></use>
                    </svg>
                </Icon>

                <TextWrapper>
                    <p>{formatDate(new Date())}</p>
                    <p>Dados de câmbio disponibilizados pela Morningstar.</p>
                </TextWrapper>
            </Nav>

            {showCurrencyCard 
                ? <CurrencyCard onTogle={() => setShowCurrencyCard(false)} setTotal={setTotal} />
                : <ConversionResult onTogle={() => setShowCurrencyCard(true)} total={total} />
            }
        </>
  )
}

export default App;

const Nav = styled.nav`
    display: flex;
    align-items: center;
    gap: 3rem;
    font-family: var(--ff-roboto);
    
    @media screen and (max-width: 540px) {
        gap: 1rem;
        flex-wrap: wrap;
        text-align: center;
        justify-content: center;
    }

`;

const Icon = styled.svg`
    width: 164px;
    height: 81px;
    /* margin-right: 48px; */
`;

const TextWrapper = styled.div`
    p:nth-child(1) {
        font-size: var(--fs-18);
        font-weight: var(--fw-medium);
    }

    p:nth-child(2) {
        font-size: var(--fs-14);
        font-weight: var(--fw-regular);
        color: var(--clr-text-sm);
    }
`;