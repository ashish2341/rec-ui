import React, { useState, useEffect } from 'react';

const PersonalLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [interestRate, setInterestRate] = useState(2);
  const [loanTerm, setLoanTerm] = useState(1);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [emiPerMonth, setEmiPerMonth] = useState(0);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    calculateRepayment();
  }, [loanAmount, interestRate, loanTerm]);

  useEffect(() => {
    setEmiPerMonth(calculateInitialEmi());
  }, []); // Call only once when the component is mounted

  function calculateInitialEmi() {
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const initialMonthlyPayment =
      loanAmount *
      monthlyInterestRate /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    const initialEmiPerMonth = initialMonthlyPayment / numberOfPayments;
    return initialEmiPerMonth.toFixed(2);
  }

  const calculateRepayment = () => {
    if (!loanAmount || !interestRate || !loanTerm) {
      return;
    }
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment =
      loanAmount *
      monthlyInterestRate /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    setMonthlyPayment(monthlyPayment);
    calculateEmiPerMonth(); // Update EMI per month after setting monthly payment
    const totalAmount = monthlyPayment * numberOfPayments;
    const totalInterest = totalAmount - loanAmount;
    setTotalAmount(totalAmount);
    setTotalInterest(totalInterest);
  };

  const calculateEmiPerMonth = () => {
    const numberOfPayments = loanTerm * 12;
    const emiPerMonth = monthlyPayment / numberOfPayments;
    setEmiPerMonth(emiPerMonth.toFixed(2));
  };

  const handleLoanAmountChange = (e) => {
    setLoanAmount(parseInt(e.target.value));
  };

  const handleInterestRateChange = (e) => {
    setInterestRate(parseFloat(e.target.value));
  };

  const handleLoanTermChange = (e) => {
    setLoanTerm(parseInt(e.target.value));
  };

  const toggleBreakdown = () => {
    setShowBreakdown(!showBreakdown);
  };

  // Utility function to convert number to words
  const convertToWords = (num) => {
  if (num < 1000) {
    return num.toLocaleString(); // Display thousands separator
  } else if (num < 100000) {
    const thousand = Math.floor(num / 1000);
    const remainder = num % 1000;
    const formattedThousand = convertToWords(thousand); // Convert thousand part recursively
    const formattedRemainder = remainder.toLocaleString(); // Display thousands separator for remainder part
    if (remainder === 0) {
      return `${formattedThousand} Thousand`;
    } else {
      return `${formattedThousand} Thousand ${formattedRemainder}`;
    }
  } else {
    const lakh = Math.floor(num / 100000);
    const remainder = num % 100000;
    const formattedLakh = lakh.toLocaleString(); // Display thousands separator for lakh part
    if (remainder === 0) {
      return `${formattedLakh} Lakh`;
    } else {
      const formattedRemainder = convertToWords(remainder); // Convert remainder recursively
      return `${formattedLakh} Lakh ${formattedRemainder}`;
    }
  }
};

  return (
    <div className="flex justify-center items-center mt-4">
      <div className="max-w-md w-full p-8 rounded-lg shadow-xl border-2">
        <div className="mb-4">
          <label htmlFor="loanAmount" className="block text-gray-700 flex justify-between items-center">
            Loan Amount: <span>₹ {convertToWords(loanAmount)}</span>
          </label>
          <input
            type="range"
            id="loanAmount"
            name="loanAmount"
            className="w-full h-10 rounded-md overflow-hidden"
            min="10000"
            max="1000000"
            step="1000"
            value={loanAmount}
            onChange={handleLoanAmountChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="interestRate" className="block text-gray-700 flex justify-between items-center">
            Interest Rate (%): <span>{interestRate}%</span>
          </label>
          <input
            type="range"
            id="interestRate"
            name="interestRate"
            className="w-full h-10 rounded-md overflow-hidden"
            min="2"
            max="20"
            step="0.1"
            value={interestRate}
            onChange={handleInterestRateChange}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="loanTerm" className="block text-gray-700 flex justify-between items-center">
            Loan Term (years): <span>{loanTerm} years</span>
          </label>
          <input
            type="range"
            id="loanTerm"
            name="loanTerm"
            className="w-full h-10 rounded-md overflow-hidden"
            min="1"
            max="30"
            step="1"
            value={loanTerm}
            onChange={handleLoanTermChange}
          />
        </div>
        <div className="mb-6 flex justify-between p-3 border border-gray-300 rounded-lg mt-4">
          <span className="text-center text-gray-600">Monthly EMI: ₹ {emiPerMonth}</span>
          <button
            className="block text-center text-blue-500 underline"
            onClick={toggleBreakdown}
          >
            More
          </button>
        </div>

        {showBreakdown && (
          <div className="p-4 border border-gray-300 rounded-lg mt-4">
            <p>Total Amount: ₹ {totalAmount.toFixed(2)}</p>
            <p>Total Interest: ₹ {totalInterest.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalLoanCalculator;
