import React, { useState } from "react";
import Swal from "sweetalert2";

function OnlinePaymentModal({ onCancel, onConfirm }) {
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardHolder, setCardHolder] = useState("");
    const [loading, setLoading] = useState(false);

    const validateCardNumber = (num) => /^\d{16}$/.test(num.replace(/\s/g, ""));
    const validateExpiry = (exp) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(exp);
    const validateCVV = (value) => /^\d{3,4}$/.test(value);
    const validateHolder = (name) => name.trim().length >= 3;

    const handleSubmit = async (event) => {
        event.preventDefault();

        const normalizedCardNumber = cardNumber.replace(/\s/g, "");

        if (!validateCardNumber(normalizedCardNumber)) {
            Swal.fire("Invalid card number", "Card number must be 16 digits.", "warning");
            return;
        }

        if (!validateExpiry(expiry)) {
            Swal.fire("Invalid expiry", "Use MM/YY format.", "warning");
            return;
        }

        if (!validateCVV(cvv)) {
            Swal.fire("Invalid CVV", "CVV must be 3 or 4 digits.", "warning");
            return;
        }

        if (!validateHolder(cardHolder)) {
            Swal.fire("Invalid name", "Card holder name is required.", "warning");
            return;
        }

        setLoading(true);
        await onConfirm({
            cardNumber: normalizedCardNumber,
            expiry,
            cvv,
            cardHolder: cardHolder.trim(),
        });
        setLoading(false);
    };

    return (
        <div className="payment-overlay">
            <div className="payment-modal">
                <h3>Online Payment</h3>
                <form onSubmit={handleSubmit} className="payment-form">
                    <input
                        placeholder="Card Number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        maxLength={19}
                    />
                    <div className="payment-row">
                        <input
                            placeholder="MM/YY"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            maxLength={5}
                        />
                        <input
                            placeholder="CVV"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            maxLength={4}
                        />
                    </div>
                    <input
                        placeholder="Card Holder Name"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                    />
                    <button type="submit" className="payment-confirm-btn" disabled={loading}>
                        {loading ? "Processing..." : "Pay & Confirm Booking"}
                    </button>
                    <button type="button" className="payment-cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default OnlinePaymentModal;
