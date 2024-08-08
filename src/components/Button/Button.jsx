// Lib
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

export default function Button(props) {
    let refBtn = useRef(null);

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === 'Enter') {
                console.log(event.key);
                refBtn.current.click();
            }
        }
        
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <ButtonConvertCurrency 
            ref={refBtn} 
            margin={props.margin} 
            onClick={props.res || props.back} 
            bg={props.bg}
            color={props.color}
            border={props.border}
        >
            <svg className="icon">
                <use xlinkHref={props.svg}> </use>
            </svg>
            <p>{props.value}</p>
        </ButtonConvertCurrency>
    );
}

const ButtonConvertCurrency = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 156px;
    height: 56px;
    padding: 1rem;
    margin: ${props => props.margin || 0};
    color: ${props => props.color || 'white'};
    cursor: pointer;
    border-radius: 8px;
    border: ${props => props.border || 'none'};
    background-color: ${props => props.bg || '#8C9CAD'};

    svg {
        width: 20px;
        height: 20px;
        margin-right: 1rem;
    }

    p {
        font-size: var(--ff-txt-input);
        font-weight: 600;
    }
`;