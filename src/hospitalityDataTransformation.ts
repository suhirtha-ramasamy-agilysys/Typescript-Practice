// Guest Booking interface
interface GuestBooking {
    guestName: string;
    checkInDate: string;
    checkOutDate: string;
    roomType: string;
    totalAmount: number;
  }
  
  // Financial Transaction interface
  interface FinancialTransaction {
    guestName: string;
    transactionType: string;
    amount: number;
  }
  import fs from 'fs';

  // Function to read guest bookings from "guestBookings.json"
  function readGuestBookings(): GuestBooking[] {
    const data = fs.readFileSync('guestBookings.json', 'utf8');
    const guestBookings: GuestBooking[] = JSON.parse(data);
    return guestBookings;
  }
  
  // Function to read financial transactions from "financialTransactions.json"
  function readFinancialTransactions(): FinancialTransaction[] {
    const data = fs.readFileSync('financialTransactions.json', 'utf8');
    const financialTransactions: FinancialTransaction[] = JSON.parse(data);
    return financialTransactions;
  }
  console.log(readGuestBookings());
    console.log(readFinancialTransactions());   
  interface FinancialCharge {
    guestName: string;
    financialCharge: number;
    totalAmount: number;
    balance: number;
  }
  
  function generateFinancialCharges(guestBookings: GuestBooking[], financialTransactions: FinancialTransaction[]): FinancialCharge[] {
    // Implement the logic to generate financial charges here
    // You'll need to aggregate charges for each guest based on their financial transactions and guest bookings
    // Return an array of FinancialCharge objects
    // Sample implementation:
    const financialCharges: FinancialCharge[] = [];
  
    for (const guestBooking of guestBookings) {
      const guestName = guestBooking.guestName;
      const totalAmount = guestBooking.totalAmount;
  
      const guestTransactions = financialTransactions.filter(transaction => transaction.guestName === guestName);
      const financialCharge = guestTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
      const balance = totalAmount - financialCharge;
  
      financialCharges.push({ guestName, financialCharge, totalAmount, balance });
    }
  
    return financialCharges;
  }
  function generateFinancialPostings(financialTransactions: FinancialTransaction[]): Record<string, number[]> {
    // Implement the logic to generate financial postings here
    // Group financial transactions by type and return a dictionary with transaction types as keys and arrays of amounts as values
    // Sample implementation:
    const financialPostings: Record<string, number[]> = {};
  
    for (const transaction of financialTransactions) {
      const { transactionType, amount } = transaction;
  
      if (transactionType in financialPostings) {
        financialPostings[transactionType].push(amount);
      } else {
        financialPostings[transactionType] = [amount];
      }
    }
  
    return financialPostings;
  }
  console.log(generateFinancialCharges(readGuestBookings(), readFinancialTransactions()));
    console.log(generateFinancialPostings(readFinancialTransactions()));
    // You should take the outputs from generateFinancialCharges and generateFinancialPostings functions
// and create separate XML representations of the data.
// Your tasks are as follows:
// 1. Write a function convertFinancialChargesToXML that takes the financial charge data and converts it
// into an XML format
function convertFinancialChargesToXML(financialCharges: FinancialCharge[]): string {
    // Implement the logic to convert financial charges to XML here
    // Return the XML string
    // Sample implementation:
    let xml = '';
  
    xml += '\n<financialCharges>';
  
    for (const financialCharge of financialCharges) {
      const { guestName, financialCharge: charge, totalAmount, balance } = financialCharge;
  
      xml += '\n<financialCharge>';
      xml += `\n<guestName>${guestName}</guestName>`;
      xml += `\n<charge>${charge}</charge>`;
      xml += `\n<totalAmount>${totalAmount}</totalAmount>`;
      xml += `\n<balance>${balance}</balance>`;
      xml += '\n</financialCharge>';
    }
  
    xml += '\n</financialCharges>';
  
    return xml;
  }
    // 2. Write a function convertFinancialPostingsToXML that takes the financial posting data and converts it
// into an XML format
function convertFinancialPostingsToXML(financialPostings: Record<string, number[]>): string {
    // Implement the logic to convert financial postings to XML here
    // Return the XML string
    // Sample implementation:
    let xml = '';
  
    xml += '\n<financialPostings>';
  
    for (const [transactionType, amounts] of Object.entries(financialPostings)) {
      xml += '\n<financialPosting>';
      xml += `\n<transactionType>${transactionType}</transactionType>`;
      xml += '\n<amounts>';
  
      for (const amount of amounts) {
        xml += `\n<amount>${amount}</amount>`;
      }
  
      xml += '\n</amounts>';
      xml += '\n</financialPosting>';
    }
  
    xml += '\n</financialPostings>';
  
    return xml;
  }
  console.log(convertFinancialChargesToXML(generateFinancialCharges(readGuestBookings(), readFinancialTransactions())));
    console.log(convertFinancialPostingsToXML(generateFinancialPostings(readFinancialTransactions())));
    // Write the XML data to separate files named "financialCharges.xml" and "financialPostings.xml" in new line
// You can use the following code to write the XML data to files in new line
 fs.writeFileSync('financialCharges.xml', convertFinancialChargesToXML(generateFinancialCharges(readGuestBookings(), readFinancialTransactions())), 'utf8');
 fs.writeFileSync('financialPostings.xml', convertFinancialPostingsToXML(generateFinancialPostings(readFinancialTransactions())), 'utf8');

