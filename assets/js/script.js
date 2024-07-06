let currencyChart;

document.getElementById('convert-btn').addEventListener('click', async function() {
    const amount = document.getElementById('amount').value;
    const currency = document.getElementById('currency-select').value;
    const resultElement = document.getElementById('result');
    const errorElement = document.getElementById('error');

    if (amount === '' || currency === '') {
        alert('Por favor ingrese un monto y seleccione una moneda');
        return;
    }
//Manejo de errores mediante Try catch
    try {
        const response = await fetch('https://mindicador.cl/api/' + currency);
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        
        const conversionRate = data.serie[0].valor;
        const convertedAmount = (amount / conversionRate).toFixed(2);
        resultElement.textContent = `Resultado: ${convertedAmount} ${currency.toUpperCase()}`;
        errorElement.textContent = '';

        // Muestra el gráfico con los últimos 10 días
        const labels = data.serie.slice(0, 10).map(item => new Date(item.fecha).toLocaleDateString()).reverse();
        const values = data.serie.slice(0, 10).map(item => item.valor).reverse();

        if (currencyChart) {
            currencyChart.destroy();
        }

        const ctx = document.getElementById('currencyChart').getContext('2d');
        currencyChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `Valor de ${currency.toUpperCase()} en los últimos 10 días`,
                    data: values,
                    borderColor: 'rgba(0, 191, 255, 1)',
                    backgroundColor: 'rgba(0, 191, 255, 0.2)',
                    fill: true,
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Fecha'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Valor'
                        }
                    }
                }
            }
        });
    } catch (error) {
        //Muestra mensajes de error
        console.error('Error al obtener los datos:', error);
        errorElement.textContent = 'Hubo un error al obtener los datos. Por favor intente nuevamente.';
    }
});
