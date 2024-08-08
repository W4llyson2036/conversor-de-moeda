import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event'
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vitest } from 'vitest';

import ConversionResult from './ConversionResult';

describe('ConversionResult Component', () => {
    it.skip('Should display button back', () => {
        const props = {
            total: {
                valueInReal: 123.45,
                msg: 'Test message',
                dollarQuote: '5.25'
            },
        };
        render(<ConversionResult {...props} />);
        const button_back = screen.getByRole('button');

        expect(button_back).toBeInTheDocument();
        expect(button_back).toHaveTextContent('Voltar');
    })

    it('Should activate the back function when button is clicked', () => {
        const mockOnToggle = vitest.fn();
        
        render(<ConversionResult onToggle={mockOnToggle} />);

        const button_back = screen.getAllByRole('button', { name: /Voltar/i });
        userEvent.click(button_back);
        expect(mockOnToggle).toHaveBeenCalledTimes(1);
    })

    it.skip('should display the calculation result text', () => {
        const props = {
            total: {
                valueInReal: 123.45,
                msg: 'Test message',
                dollarQuote: '5.25'
            },
        };
        render(<ConversionResult {...props} />);
        expect(screen.getByText('O resultado do cálculo ')).toBeInTheDocument();
    });
});