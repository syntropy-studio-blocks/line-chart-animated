import Chart from 'chart.js'

export const run = ({ state, element }) => {
  
  // create the canvas
  const c = document.createElement('canvas')
  c.width = element.clientWidth
  c.height = c.width * 0.75
  const ctx = c.getContext('2d')
  element.appendChild(c)
  
  // do some styling
  Chart.defaults.global.defaultFontColor = '#c4cecf'
	Chart.defaults.global.defaultFontFamily = '"IBM Plex Sans Condensed",sans-serif'
  element.style.backgroundColor = 'transparent'
  
  // create the chart
  state.chart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
				label: state.inputLabel || 'Value',
        data: [],
        borderColor: '#188da4',
        backgroundColor: 'transparent'
      }]
    },
    options: {
      animation: {
        duration: 500
      },
			responsive: true,
      scales: {
        xAxes: [{
          display: true,
          type: 'linear',
          scaleLabel: {
            display: true,
            labelString: 'Iteration'
          },
          gridLines: {
            color: 'rgba(255,255,255,0.05)' 
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: state.inputLabel || 'Value'
          },
          gridLines: {
            color: 'rgba(255,255,255,0.05)' 
          }
        }]
      }
    }
  })
}

export const update = ({ state, iteration }) => {  
  const iterationsPerDataPoint = state.iterationsPerDataPoint >= 1
  	? parseInt(state.iterationsPerDataPoint, 10)
  	: 1
  
  if(iteration % iterationsPerDataPoint === 0) {
    state.chart.data.datasets[0].data.push({
      y: state.inputStream,
      x: iteration
    })
    state.chart.update()
  }
  
}

