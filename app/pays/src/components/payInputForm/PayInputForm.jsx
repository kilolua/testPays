import React, {useEffect, useState} from 'react';
import './PayInputForm.css'
import {Alert, Button, DatePicker, Space, message} from "antd";
import Input from "antd/es/input/Input";
import axios from "axios";


const PayInputForm = () => {

    const [cardNumber, setCardNumber] = useState("");
    const [expDate, setExpDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [amount, setAmount] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isValidCardNumber, setIsValidCardNumber] = useState(false);

    const createPay = async () => {
        try {
            var res = await axios.post('http://localhost:5000/pays/addPay', {
                CardNumber: cardNumber,
                ExpDate: expDate.format("MM/YYYY"),
                Cvv: cvv,
                Amount: parseInt(amount, 10)
            })
            console.log(res.data);
            message.success('Payment has been sent');
            setCvv('');
            setAmount('');
            setCardNumber('');
            setExpDate('');
        } catch (e) {
            message.error('Server error');
        }
    }

    const validateNumber = (value) => {
        return value.replace(/\D/, '');
    }

    const moonAlgorithm = (setValue) => {
        let ch = 0;
        const num = setValue.replace(/\D/g, '');
        const isOdd = num.length % 2 !== 0;

        if ('' === num || num.length !== 16) return false;

        for (let i = 0; i < num.length; i++) {
            let n = parseInt(num[i], 10);

            ch += (isOdd | 0) === (i % 2) && 9 < (n *= 2) ? (n - 9) : n;
        }

        return 0 === (ch % 10);
    };


    useEffect(() => {
        const isValidCardNumber = moonAlgorithm(cardNumber)
        setIsValid(cvv.length === 3 && !!expDate && !!amount && isValidCardNumber)
        if (cardNumber.length === 16) {
            setIsValidCardNumber(isValidCardNumber);
        }
    }, [amount, cvv, expDate, cardNumber])

    return (
        <div className="form-container">
            <Space direction="vertical">
                <Input
                    showCount
                    value={cardNumber}
                    maxLength={16}
                    status={(!isValidCardNumber && cardNumber.length === 16) ? 'error' : ''}
                    onChange={(e) => setCardNumber(validateNumber(e.target.value))}
                    addonBefore="Card number"
                />
                {(!isValidCardNumber && cardNumber.length === 16) &&
                <Alert message="Invalid card number" type="error" showIcon closable/>
                }
                <Space wrap>
                    <DatePicker
                        value={expDate}
                        onChange={(date) => setExpDate(date)}
                        picker="month"
                        format="MM/YYYY"
                    />
                    <Input
                        showCount
                        value={cvv}
                        maxLength={3}
                        onChange={(e) => setCvv(validateNumber(e.target.value))}
                        addonBefore="CVV"
                    />
                </Space>
                <Input
                    value={amount}
                    onChange={(e) => setAmount(validateNumber(e.target.value))}
                    addonBefore="Amount"
                    maxLength={15}
                />
                <Button disabled={!isValid} type="primary" onClick={createPay}>To pay</Button>
            </Space>
        </div>
    );
};

export default PayInputForm;