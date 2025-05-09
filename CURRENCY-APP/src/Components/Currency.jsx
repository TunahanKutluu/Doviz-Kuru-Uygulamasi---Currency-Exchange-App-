import React, { useState } from 'react'
import axios from 'axios';
import '../Css/Currency.css'

import { FaArrowRight } from "react-icons/fa6";


let BASE_URL = "https://api.freecurrencyapi.com/v1/historical";
let TOKEN = "fca_live_LH9ffK94FZdUMif1wSw12kipv4PIGN8W7Lyaz85C";

const Currency = () => {

    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('TRY');
    const [result, setResult] = useState(0);

    const exchange = async () => {
        // console.log(amount)
        // console.log(fromCurrency)
        // console.log(toCurrency)
        // console.log(result)


        const response = await axios.get(`${BASE_URL}?apikey=${TOKEN}&base_currency=${fromCurrency}`);

        const newCurrency = response.data.data;

        // İlk tarihi al (örneğin: "2025-05-08")
        const date = Object.keys(newCurrency)[0];

        // O tarihe ait kurları al
        const rates = newCurrency[date];

        // Seçilen hedef kurun oranını al
        const rate = rates[toCurrency];

        // Sonucu hesapla
        const result = (rate * amount).toFixed(2);
        setResult(result);




    }

    return (
        <div>
            <div className='c-row-01'>
                <div className='c-container-01'>
                    <h1>DÖVİZ KURU UYGULAMASI</h1>
                </div>
                <div className='c-container-02'>
                    <input type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className='c-item-01' />
                    <select onChange={(e) => setFromCurrency(e.target.value)} name="1" id="1" className='c-item-02'>
                        <option >USD</option>
                        <option >EUR</option>
                        <option >TRY</option>
                        <option >ZAR</option>
                    </select>
                    <FaArrowRight style={{ width: 30, height: 30 }} />

                    <select onChange={(e) => setToCurrency(e.target.value)} name="2" id="2" className='c-item-02'>
                        <option >TRY</option>
                        <option >USD</option>
                        <option >EUR</option>
                        <option >ZAR</option>
                    </select>
                    <input
                        value={result}
                        onChange={(e) => setResult(e.target.value)} type="number" className='c-item-03' />
                </div>
                <div className='c-container-03'>
                    <button onClick={exchange} className='btn'>ÇEVİR</button>
                </div>
            </div>

        </div>
    )
}

export default Currency