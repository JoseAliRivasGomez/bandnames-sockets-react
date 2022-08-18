import React, { useContext, useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js';
import { SocketContext } from '../context/SocketContext';
Chart.register(...registerables);
 
export const BandChart = () => {

    const {bands} = useContext(SocketContext);

    useEffect(() => {

        const data = {
            labels: bands.map(band => band.name),
            datasets: [{
                    label: '# of Votes',
                    data: bands.map(band => band.votes),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            }
      
        const config = {
            type: 'bar',
            data: data,
            options: {
                indexAxis: 'y',
                animation: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }
        
        const myChart = new Chart(
            document.getElementById('myChart'),
            config
        );
 
        return () => {
            myChart.destroy()
        }

    }, [bands]);
    
 
 
  return (
    <canvas id="myChart" height="100"></canvas>
  )
}