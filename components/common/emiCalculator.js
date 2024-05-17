import React, { useState } from 'react';

const PersonalLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [repaymentResult, setRepaymentResult] = useState('');
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);

  const calculateRepayment = () => {
    if (!loanAmount || !interestRate || !loanTerm) {
      setErrorMessageVisible(true);
      return;
    }
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment =
      loanAmount *
      monthlyInterestRate /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;
    setRepaymentResult(
      `Monthly Payment: ₹ ${monthlyPayment.toFixed(2)}\n` +
      `Total Payment: ₹ ${totalPayment.toFixed(2)}\n` +
      `Total Interest: ₹${totalInterest.toFixed(2)}`
    );
    setErrorMessageVisible(false);
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <div className="max-w-md w-full bg-grey p-8 rounded-lg shadow-xl border-2">
        <div className="mb-4">
          <label htmlFor="loanAmount" className="block text-gray-700">Loan Amount:</label>
          <input
            type="number"
            id="loanAmount"
            name="loanAmount"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Enter loan amount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="interestRate" className="block text-gray-700">Interest Rate (%):</label>
          <input
            type="number"
            id="interestRate"
            name="interestRate"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Enter interest rate"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="loanTerm" className="block text-gray-700">Loan Term (years):</label>
          <input
            type="number"
            id="loanTerm"
            name="loanTerm"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Enter loan term in years"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
          />
        </div>
        <div className="mb-8">
          <button
            id="calculateButton"
            className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none"
            onClick={calculateRepayment}
          >
            Calculate Repayment
          </button>
        </div>
        <div id="repaymentResult" className="text-lg font-semibold text-center">
          {repaymentResult}
        </div>
        <div
          id="errorMessage"
          className={`text-red-500 text-sm mt-4 ${errorMessageVisible ? '' : 'hidden'}`}
        >
          Please fill in all fields.
        </div>
      </div>
    </div>
  );
};

export default PersonalLoanCalculator;
