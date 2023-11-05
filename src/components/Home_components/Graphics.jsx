import { BsPieChartFill } from "react-icons/bs";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);
function Graphics({income, expenses}){
    
    
    const expensesPercentage = Math.round((expenses / income) * 100);
    const incomesPercentage = 100 - (expensesPercentage);

    const misoptions = {
        responsive: true,
        animation: true,
        plugins: {
            legend: {
                display: false
            },

        },
        scales: {
            y: {
                min: 0,
                max: 100,
                display: true, // Oculta el eje Y
                beginAtZero: true
    
            },
            x: {
                display: true, // Oculta el eje X
                ticks: {
                    display: true // Oculta las etiquetas del eje X
                }
            }
        }
    };
    
    const midata = {
        labels: ['Gastos', 'Ingresos'],
        datasets: [
            {
                label: 'Porcentaje',
                data: [expensesPercentage, incomesPercentage],
                backgroundColor: ['#043249', '#ff7f3e']
            }
        ]
    };  
    return(
        <>
            <div className="bars_container">
                <Bar data={midata} options={misoptions} />
            </div>
        </>
    )
}
export default Graphics;