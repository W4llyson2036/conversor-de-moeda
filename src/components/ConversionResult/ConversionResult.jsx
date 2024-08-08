// Components
import Button from "../Button/Button";

// Lib
import styled from "styled-components";

// CSS
import { Div } from "../CurrencyCard/CurrencyCard";

export default function ConversionResult(props) {
    function back() {
        props.onTogle();
    }

    return (
        <MensageResult>
            <Button 
                bg='white'
                back={back} 
                color='#2E3742'
                svg='icons.svg#arrow-left' 
                border='1px solid #8C9CAD'    
                margin='0 0 2rem 0' value='Voltar' 
            />
            <h1>O resultado do cálculo é</h1>
            <Price>&#82;&#36; {props.total.valueInReal}</Price>
           
            <Rate>
                {props.total.msg}<br />
                {props.total.dollarQuote}
            </Rate>        
        </MensageResult>
    )
}

const MensageResult = styled(Div)`
    width: fit-content;

    h1 {
        margin-bottom: 8px;
        font-size: var(--fs-20);
    }
`;

const Price = styled.p`
    font-size: clamp(5vw, 2rem, var(--fs-64));
    color: var(--clr-primary);
    font-weight: var(--fw-medium);
    
    @media (width <= 373px) {
        font-size: var(--fs-20);
    }
`;

const Rate = styled.p`
    line-height: 2rem;
    font-size: var(--fs-14);
`;