<template>
<div>
     <vs-divider style="font-size:26px; font-weight:800; color:white">
         BIỂU ĐỒ THỐNG KÊ
    </vs-divider>
    <div class="vx-row">
    <!-- Bieu do -->
   <div class="vx-col md:w-1/3 w-full mb-base">
                <vx-card title="Xí nghiệp trắc địa">
                    <!-- SLOT = ACTIONS -->
                    <template slot="actions">
                        <change-time-duration-dropdown />
                    </template>

                    <div slot="no-body">
                        <!-- CHART -->
                        <!-- <vue-apex-charts type="pie" height="345" class="mt-10 mb-10" :options="analyticsData.customersPie.chartOptions" :series="customersData.series" /> -->
                        <vue-apex-charts type="pie" height="200" class="mt-10 mb-10"  :options="pieChart.chartOptions" :series="pieChart.series"/>

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
export default {
  data() {
    return {
      themeColors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
      pieChart: {
        series: [44, 55, 13, 43],
        chartOptions: {
          labels: ['Đang thực hiện', 'Đã hoàn thành', 'Quá hạn', 'Cảnh báo'],
          colors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
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
  components: {
    VueApexCharts,
    ChangeTimeDurationDropdown
  }
}
</script>