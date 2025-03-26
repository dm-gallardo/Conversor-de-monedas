
const amountInput = document.getElementById('amount');
const currencySelect = document.getElementById('currency');
const resultParagraph = document.getElementById('result');
const convertButton = document.getElementById('convert');
const chartCanvas = document.getElementById('chart');

convertButton.addEventListener('click', async () => {

    const amount = parseFloat(amountInput.value);
    const currency = currencySelect.value;

    if (isNaN(amount) || amount <= 0) {
        alert('Por favor, ingrese un monto y seleccione una moneda');
        return;
    }

    try {
        const response = await fetch('https://mindicador.cl/api/');
        console.log("lo que responde",response);
        if (!response.ok) throw new Error('error en la api');
        const data = await response.json();
        console.log(data);

        const currencyMap = {
            usd: 'dolar',
            eur: 'euro',
            btc: 'bitcoin',
        };

        const rate = data[currency]?.valor;
        if (!rate) throw new Error("No se encontró la moneda");
    
        const convertedAmount = (amount / rate).toFixed(2);
        resultParagraph.textContent = `El monto en ${convertedAmount}${currency.toUpperCase()}`;
        
        const history = data[currencyMap[currency]]?.serie;
        if (history && Array.isArray(history)) {
            const last10Days = history.slice(0 , 10).reverse();
            renderChart(last10Days, currency);
        } 
    } catch (error) {
        resultParagraph.textContent = `Error: ${error.message}`;
    }
});

//no hubo manera de que pudises hacer el grafico , no se explico la manera de poder hacerlo :(
//se entrega el trbajo un poco atrasado devido a que estaba con trabajo y me atraso lo del grafico