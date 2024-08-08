// Lib
import styled from 'styled-components';
import { NumericFormat } from 'react-number-format';
import { useState, useRef, useEffect } from 'react';

// Components
import Button from '../Button/Button';

// Api
import useCurrencyData from '../../service/currency';

export default function CurrencyCard(props) {
    const { data } = useCurrencyData();
    const [currencyValue, setCurrencyValue] = useState({
        rate: '',
        dollar: '',
        cotacao: null,
        typeOfPurchase: 'money',
    })

    let inputRefRate = useRef(null);
    let inputRefDollar = useRef(null);
    let buttonIsActive = currencyValue.dollar !== '' && currencyValue.rate !== '';

    useEffect(() => {
        if (data) { 
            setCurrencyValue(old => ({...old, cotacao: data}));
        }
    }, [data]);

    function handleInputCurrency(Event) {
        const { name, value } = Event.target; 

        setCurrencyValue(prevValue => ({
            ...prevValue,
            [name]: value
        }))
    }

    function handleRadio(value) {
        setCurrencyValue(old => ({
            ...old, 
            typeOfPurchase: value.target.id
        }))
    }

    function convertValueToReal() {
        const dollar = Number(currencyValue.dollar.replace('$', '').replace(/\./g, ''));
        const rate = Number(currencyValue.rate.replace('%', '').replace(/\./g, ''));

        if (currencyValue.typeOfPurchase === 'money') {
            // dolar com imposto do estado
            const totalDollarValue = dollar + (dollar * rate / 100);
            
            // dólar incluindo o IOF
            const dollarWithIOF = currencyValue.cotacao;
            const finalValue = (totalDollarValue * dollarWithIOF).toFixed(2);
            
            props.setTotal({
                msg: `Compra no dinheiro e taxa de ${rate}%`,
                dollarQuote: `Cotação do dólar: $1,00 = R$ ${currencyValue.cotacao}`,
                valueInReal: finalValue, 
            });
        }
        
        if (currencyValue.typeOfPurchase === 'card') {
            // dolar com imposto
            const totalDollarValue = dollar + (dollar * rate / 100);
            
            // dólar incluindo o IOF
            const dollarWithIOF = currencyValue.cotacao * (1 + 0.064);
            const finalValue = (totalDollarValue * dollarWithIOF).toFixed(2);

            props.setTotal({
                msg: `Compra no cartão e taxa de ${rate}%`,
                dollarQuote: `Cotação do dólar: $1,00 = R$ ${currencyValue.cotacao}`,
                valueInReal: finalValue, 
            });
        }

        props.onTogle();
    }

    function dontAllowTypingDotAndComma(e) {
        const { name } = e.target;

        if (name == 'dollar' && (e.key == '.' || e.key == ',')) {
            inputRefDollar.current.style.border = 'red 1px solid';
            setTimeout(() => {
                inputRefDollar.current.style.border = 'none';
            }, 250);
            e.preventDefault();
        }
        
        if (name == 'rate' && (e.key == '.' || e.key == ',')) {
            inputRefRate.current.style.border = 'red 1px solid';
            setTimeout(() => {
                inputRefRate.current.style.border = 'none';
            }, 250);
            e.preventDefault();
        }
    }

    return (
        <Div>
            <Form action="#">
                <InputCurrency>
                    <div>
                        <label htmlFor="">Dólar</label>
                        <NumericFormat 
                            prefix='$ '
                            name='dollar'
                            maxLength={13}
                            displayType='input'
                            decimalSeparator=","
                            thousandSeparator="."
                            allowNegative={false}
                            fixedDecimalScale={true}
                            getInputRef={inputRefDollar}
                            value={currencyValue.dollar}
                            onKeyDown={e => dontAllowTypingDotAndComma(e)}
                            onChange={(event) => handleInputCurrency(event)}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Taxa do Estado</label>
                        <NumericFormat 
                            name='rate'
                            suffix=' %'
                            maxLength={5}
                            decimalScale={1}
                            displayType='input'
                            decimalSeparator=","
                            allowNegative={false}
                            fixedDecimalScale={false}
                            value={currencyValue.rate}
                            getInputRef={inputRefRate}
                            onKeyDown={e => dontAllowTypingDotAndComma(e)}
                            onChange={(event) => handleInputCurrency(event)}
                        />
                    </div>
                </InputCurrency>            

                <InputRadio>
                    <p>Tipo de compra</p>
                    <div>
                        <input 
                            id="money" 
                            type="radio" 
                            value='payWithMoney'
                            name='typeOfPurchase'
                            defaultChecked={true}
                            onChange={(event) => handleRadio(event)}
                            />
                        <label htmlFor="money">Dinheiro</label>
                    </div>
        
                    <div>
                        <input 
                            id="card" 
                            type="radio"
                            value='payWithCard'
                            name='typeOfPurchase'
                            onChange={(event) => handleRadio(event)}
                        />
                        <label htmlFor="card">Cartão</label>
                    </div>
                </InputRadio>
            </Form>
            
            <Button 
                value='Converter' 
                svg='icons.svg#transfer' 
                border='1px solid #008B57'
                bg={buttonIsActive === true ? 'green' : null}
                res={buttonIsActive === true ? convertValueToReal : null}
            />
        </Div>
    );
}

export const Div = styled.div`
    margin-top: 105px;
    width: fit-content;
    margin: 1rem;
    font-family: var(--ff-roboto);
`;

const Form = styled.form`
    margin: 105px 0px 32px 0px;
    font-family: var(--ff-roboto);
`;

const InputCurrency = styled.div`
    gap: 1rem;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 2rem;

    div {
        display: flex;
        flex-direction: column;

        @media (max-width: 555px) {
            width: 100%;
        }
    }
    
    div input {
        height: 56px;
        width: 100%;
        padding: 1rem;
        margin-top: 10px;
        border-radius: 4px;
        border: 1.2px #9e9d9d solid;
        box-shadow: 1px 7px 3px #0000001f;
    }
`;

const InputRadio = styled.div`
    div {
        display: inline-flex;
        align-items: center;
    }

    p { margin-bottom: 1rem; }

    input { 
        margin-right: 0.5rem; 
        width: 24px;
        height: 24px;
        background-color: red;
    }

    input[type='radio'] {
        accent-color: #008B57;
    }
    
    label { margin-right: 1rem; }
`;