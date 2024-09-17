// import React from "react";
// import { useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import { useFinancialRecords } from "../../context/financial-record-context";

// function FinancialRecordForm() {
//   const [description, setDescription] = useState<string>("");
//   const [amount, setAmount] = useState<string>("");
//   const [type, setType] = useState<string>("");
//   const [category, setCategory] = useState<string>("");
//   const [paymentMethod, setPaymentMethod] = useState<string>("");
//   const { addRecord } = useFinancialRecords();

//   const { user } = useUser();

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const formattedAmount =
//     type === "expense" && parseFloat(amount) > 0
//       ? -Math.abs(parseFloat(amount))
//       : parseFloat(amount);

//     const newRecord = {
//       userId: user?.id ?? "",
//       date: new Date(),
//       description: description,
//       amount: formattedAmount,
//       type: type,
//       category: category,
//       paymentMethod: paymentMethod,
//     };

//     addRecord(newRecord);
//     setDescription("");
//     setAmount("");
//     setType("");
//     setCategory("");
//     setPaymentMethod("");
//   };

//   return (
//     <>
//       <div>FinancialRecordForm</div>
//       <div className="form-container">
//         <form onSubmit={handleSubmit}>
//           <div className="form-field">
//             <label>Description:</label>
//             <input
//               type="text"
//               required
//               className="input"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>
//           <div className="form-field">
//             <label>Amount:</label>
//             <input
//               type="number"
//               required
//               className="input"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//             />
//           </div>
//           <div>
//             <label>Type:</label>

//             <label>
//               <input
//                 type="radio"
//                 name="type"
//                 value="income"
//                 checked={type === "income"}
//                 onChange={(e) => setType(e.target.value)}
//               />
//               Income
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="type"
//                 value="expense"
//                 checked={type === "expense"}
//                 onChange={(e) => setType(e.target.value)}
//               />
//               Expense
//             </label>

//             {/* Display the selected option (optional) */}
//           </div>
//           <div className="form-field">
//             <label>Category:</label>
//             <select
//               required
//               className="input"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//             >
//               <option value="">Select a Category</option>
//               <option value="Food">Food</option>
//               <option value="Rent">Rent</option>
//               <option value="Salary">Salary</option>
//               <option value="Utilities">Utilities</option>
//               <option value="Entertainment">Entertainment</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <div className="form-field">
//             <label>Payment Method:</label>
//             <select
//               required
//               className="input"
//               value={paymentMethod}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             >
//               <option value="">Select a Payment Method</option>
//               <option value="Cash">Cash</option>
//               <option value="Credit Card">Credit Card</option>
//               <option value="Bank Transfer">Bank Transfer</option>
//             </select>
//           </div>
//           <button type="submit" className="button">
//             Add Record
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default FinancialRecordForm;


import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../context/financial-record-context";

const FinancialRecordForm = ({ onClose}) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const { addRecord } = useFinancialRecords();
  const { user } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedAmount =
      type === "expense" && parseFloat(amount) > 0
        ? -Math.abs(parseFloat(amount))
        : parseFloat(amount);

    const newRecord = {
      userId: user?.id ?? "",
      date: new Date(),
      description: description,
      amount: formattedAmount,
      type: type,
      category: category,
      paymentMethod: paymentMethod,
    };

    addRecord(newRecord);
    setDescription("");
    setAmount("");
    setType("");
    setCategory("");
    setPaymentMethod("");

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Add Financial Record</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description:</label>
            <input
              type="text"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Amount:</label>
            <input
              type="number"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Type:</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={type === "income"}
                  onChange={(e) => setType(e.target.value)}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Income</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  checked={type === "expense"}
                  onChange={(e) => setType(e.target.value)}
                  className="form-radio text-red-600"
                />
                <span className="ml-2">Expense</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category:</label>
            <select
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a Category</option>
              <option value="Food">Food</option>
              <option value="Rent">Rent</option>
              <option value="Salary">Salary</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Payment Method:</label>
            <select
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Select a Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Add Record
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const FinancialRecordManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
      >
        Add Expense
      </button>
      {isModalOpen && <FinancialRecordForm onClose={handleCloseModal} />}
    </div>
  );
};

export default FinancialRecordManager;
