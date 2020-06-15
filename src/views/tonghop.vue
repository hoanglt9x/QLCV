<template>
<div>
     <vs-divider style="font-size:26px; font-weight:800; color:white">
         BIỂU ĐỒ THỐNG KÊ
    </vs-divider>
    <div class="vx-row">
    <!-- Bieu do -->
      <div class="vx-col md:w-1/3 w-full mb-base" v-for="item in  organizes" :key="item.id">
                <vx-card :title="item.name">
                    <!-- SLOT = ACTIONS -->
                    <!-- <template slot="actions">
                        <change-time-duration-dropdown />
                    </template> -->

                    <div slot="no-body">
                        <!-- CHART -->
                        <!-- <vue-apex-charts type="pie" height="345" class="mt-10 mb-10" :options="analyticsData.customersPie.chartOptions" :series="customersData.series" /> -->
                        <vue-apex-charts type="pie" height="200" class="mt-10 mb-10"  :options="pieChart.chartOptions" :series="laySoLieu2(item.name)"/>

                        <!-- CHART DATA -->
                        <!-- <ul class="mb-1">
                            <li v-for="customerData in customersData.analyticsData" :key="customerData.customerType" class="flex justify-between py-3 px-6 border d-theme-border-grey-light border-solid border-r-0 border-l-0 border-b-0">
                                <span class="flex items-center">
                                    <span class="inline-block h-3 w-3 rounded-full mr-2" :class="`bg-${customerData.color}`"></span>
                                    <span class="font-semibold">{{ customerData.customerType }}</span>
                                </span>
                                <span>{{ customerData.counts }}</span>
                            </li>
                        </ul> -->
                    </div>

                </vx-card>
            </div>
    </div>
        
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import ChangeTimeDurationDropdown from '@/components/ChangeTimeDurationDropdown.vue'
import gql from "graphql-tag"
export default {
  data() {
    return {
      organizes:[],
      nhiemvus:[],
      themeColors: ['#EA5455', '#FF9F43','#7367F0', '#28C76F'],
      pieChart: {
        series: [44, 55, 13, 43],
        chartOptions: {
          labels: [ 'Quá hạn', 'Cảnh báo','Đang thực hiện', 'Đã hoàn thành'],
          colors: [  '#EA5455', '#FF9F43','#7367F0','#28C76F'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
      }
    };
  },
  apollo: {
    nhiemvus: gql`
      query NhiemVus {
        nhiemvus(where: {Display: true}) {
          id
          project {
            name
          }
          organize {
            name
          }
          noidung
          batdau
          ketthuc
          KhoiLuongHoanThanh
          KhoiLuong
          ghiChu
          daHoanThanh
        }
      }
    `,
     organizes: gql`
      query organizes {
        organizes{
          id
          name
        }
}
    `
  },
  computed: {
    danhsachnhiemvu() {
      let kq= []
       this.nhiemvus.forEach(element => {
          let doiTuong = {
          id: element.id,
          project: (element.project.name ? undefined : '', element.project.name),
          organize: (element.organize.name ? undefined: '', element.organize.name),
          noidung: element.noidung,
          batdau: element.batdau,
          ketthuc:element.ketthuc,
          KhoiLuong: element.KhoiLuong,
          KhoiLuongHoanThanh: element.KhoiLuongHoanThanh,
          trangThai: this.loaiTrangThai(this.tinhTrangThai2(element.batdau,element.ketthuc,element.daHoanThanh)),
          conLai: this.tinhHienTai(element.ketthuc),
          ghiChu: element.ghiChu,
          daHoanThanh: element.daHoanThanh
         }
         kq.push(doiTuong)
       })
      return kq
    },
    laySoLieu: function(value){
      let KQ=[]
      let quahan = this.danhsachnhiemvu.filter(function(giatri){
         return giatri.organize === value && giatri.trangThai === '1. Quá hạn';
      }).length
      KQ.push(quahan)
       let canhbao = this.danhsachnhiemvu.filter(function(giatri){
         return giatri.organize === value && giatri.trangThai === '2. Cảnh báo';
      }).length
      KQ.push(canhbao)
       let dangthuchien = this.danhsachnhiemvu.filter(function(giatri){
         return giatri.organize === value && giatri.trangThai === '3. Đang thực hiện';
      }).length
      KQ.push(dangthuchien)
       let hoanthanh = this.danhsachnhiemvu.filter(function(giatri){
         return giatri.organize === value && giatri.trangThai === '4. Hoàn thành';
      }).length
      KQ.push(hoanthanh)
      return KQ
    },
    cauHinhPie: function(value){
      let chartOne= {
        series: this.laySoLieu(value),
        chartOptions: {
          labels: [ 'Quá hạn' + this.series[0], 'Cảnh báo'+ this.series[1],'Đang thực hiện'+ this.series[2], 'Đã hoàn thành'+ this.series[3]],
          colors: [  '#EA5455', '#FF9F43','#7367F0','#28C76F'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
      }
      return chartOne
    }
  },
    components: {
    VueApexCharts,
    ChangeTimeDurationDropdown
  },
  methods: {
     tinhThoiGian(ngayBatDau,ngayKetThuc){
        let inbd = new Date(ngayBatDau)
        let inkt = new Date(ngayKetThuc)
        return Math.round((inkt-inbd) / 1000 / 60 / 60 / 24);
     },
     tinhHienTai(thoiGian){
        let inbd= Date.now()
        let inkt = new Date(thoiGian)
        return Math.round((inkt-inbd) / 1000 / 60 / 60 / 24);
     },
     tinhTrangThai(ngayBatDau,ngayKetThuc,klht,kl)
     {
       if(klht<kl)
       {
         let Tongthoigian = this.tinhThoiGian(ngayBatDau,ngayKetThuc)
         let hienTai = this.tinhHienTai(ngayKetThuc)
         if(hienTai > 0){
              let soThoiGianDaDung = hienTai/Tongthoigian
              if(soThoiGianDaDung > 0.3) return 'primary'
              else return 'warning'
         }
        else return 'danger'
       }
       else return 'success'
     },
     tinhTrangThai2(ngayBatDau,ngayKetThuc, dahoanthanh){
        if(dahoanthanh===false || dahoanthanh===null){
        let Tongthoigian = this.tinhThoiGian(ngayBatDau,ngayKetThuc)
         let hienTai = this.tinhHienTai(ngayKetThuc)
         if(hienTai > 0){
              let soThoiGianDaDung = hienTai/Tongthoigian
              if(soThoiGianDaDung > 0.3) return 'primary'
              else return 'warning'
         }
        else return 'danger'
        }
        else return 'success'
     },
     loaiTrangThai(value){
       if(value==='success') return '4. Hoàn thành'
       if(value==='warning') return '2. Cảnh báo'
       if(value==='primary') return '3. Đang thực hiện'
       if(value==='danger') return '1. Quá hạn'
     },
     laySoLieu2(value){
      let KQ=[]
      let quahan = this.danhsachnhiemvu.filter(function(giatri){
         return giatri.organize === value && giatri.trangThai === '1. Quá hạn';
      }).length
      KQ.push(quahan)
      //this.pieChart.chartOptions.legend.labels[0]="Quá hạn: "+ quahan
       let canhbao = this.danhsachnhiemvu.filter(function(giatri){
         return giatri.organize === value && giatri.trangThai === '2. Cảnh báo';
      }).length
      KQ.push(canhbao)
      //this.pieChart.chartOptions.labels[1]="Cảnh báo: "+ canhbao
       let dangthuchien = this.danhsachnhiemvu.filter(function(giatri){
         return giatri.organize === value && giatri.trangThai === '3. Đang thực hiện';
      }).length
      KQ.push(dangthuchien)
      //this.pieChart.chartOptions.labels[2]="Đang thực hiện: "+ dangthuchien
       let hoanthanh = this.danhsachnhiemvu.filter(function(giatri){
         return giatri.organize === value && giatri.trangThai === '4. Hoàn thành';
      }).length
      KQ.push(hoanthanh)
      //this.pieChart.chartOptions.labels[3]="Hoàn thành: "+ hoanthanh
      return KQ
    },
    cauHinhPie2(value){
      let chartOne= {
        series: this.laySoLieu2(value),
        chartOptions: {
          labels: [ 'Quá hạn' + this.series[0], 'Cảnh báo'+ this.series[1],'Đang thực hiện'+ this.series[2], 'Đã hoàn thành'+ this.series[3]],
          colors: [  '#EA5455', '#FF9F43','#7367F0','#28C76F'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
      }
      return chartOne
    }
  },
}
</script>