import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/principal/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  reporteXMes:any[] = [];
  public barChartType: any = 'bar'; // Tipo de gráfico

  constructor(private _dashboardService: DashboardService){

  }

  ngOnInit(): void {
    this.obtenerReporteEventoXMes();
    console.log('barChartData', this.barChartData);
  }

  obtenerReporteEventoXMes(){
    let data = {};
    this._dashboardService.ObtenerEventosXMes(data).subscribe(
      (val) =>{
        console.log('val.data', val.data);
        this.reporteXMes = val.data;
        this.barChartData.labels = this.reporteXMes.map(x => x.mes);  // Extraer los nombres de los meses
        this.barChartData.datasets[0].data = this.reporteXMes.map(x => x.cantidad_eventos);  // Extraer la cantidad de eventos
    });
  }

  public barChartData = {
    labels: [''],
    datasets: [
      {
        label: 'Eventos',
        data: [''],
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1
      }
    ]
  };

  // Opciones del gráfico
  public barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };
  
}
