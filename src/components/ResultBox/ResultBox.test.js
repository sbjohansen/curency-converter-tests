import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
  const testCasesPLNUSD = [
    { amount: 100, expected: 'PLN 100.00 = $28.57' },
    { amount: 20, expected: 'PLN 20.00 = $5.71' },
    { amount: 200, expected: 'PLN 200.00 = $57.14' },
    { amount: 345, expected: 'PLN 345.00 = $98.57' },
  ];

  const testCasesUSDPLN = [
    { amount: 100, expected: '$100.00 = PLN 350.00' },
    { amount: 200, expected: '$200.00 = PLN 700.00' },
    { amount: 150, expected: '$150.00 = PLN 525.00' },
    { amount: 17, expected: '$17.00 = PLN 59.50' },
  ];

  it('should render without crashing', () => {
    render(<ResultBox from='PLN' to='USD' amount={100} />);
  });

  for (const testObj of testCasesPLNUSD) {
    it('should render proper info about conversion PLN -> USD', () => {
      render(<ResultBox from='PLN' to='USD' amount={testObj.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(testObj.expected);
    });
    cleanup();
  }

  for (const testObj of testCasesUSDPLN) {
    it('should render proper info about conversion USD -> PLN', () => {
      render(<ResultBox from='USD' to='PLN' amount={testObj.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(testObj.expected);
    });
    cleanup();
  }

  it('should render proper info about conversion PLN -> PLN', () => {
    render(<ResultBox from='PLN' to='PLN' amount={350} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent('PLN 350.00 = PLN 350.00');
  });

  it('should render proper info about conversion USD -> USD', () => {
    render(<ResultBox from='USD' to='USD' amount={150} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent('$150.00 = $150.00');
  });

  it('should return wrong value if value is < 0', () => {
    render(<ResultBox from='USD' to='PLN' amount={-1} />);
    const output = screen.getByTestId('outputWrong');
    expect(output).toHaveTextContent('Wrong value...');
  });
});
