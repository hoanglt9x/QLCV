<template>
<div>
	<div class="vx-row">
      <div class="vx-col w-full">
        <vx-card title="DANH SÁCH NHIỆM VỤ KỸ THUẬT">
          <div slot="no-body" class="mt-4">
            <vs-table pagination max-items="8" search :data="dispatchedOrders" class="table-dark-inverted">
              <template slot="thead">
                <vs-th>STT</vs-th>
                <vs-th>TRẠNG THÁI</vs-th>
                <vs-th>PHỤ TRÁCH</vs-th>
                <vs-th>NỘI DUNG</vs-th>
                <vs-th>MỨC ĐỘ HOÀN THÀNH</vs-th>
                <vs-th>NGÀY BẮT ĐẦU</vs-th>
                <vs-th>NGÀY KẾT THÚC</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="data[indextr].orderNo">
                    <span>#{{data[indextr].orderNo}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].status">
                    <span class="flex items-center px-2 py-1 rounded"><div class="h-3 w-3 rounded-full mr-2" :class="'bg-' + data[indextr].statusColor"></div>{{data[indextr].status}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].orderNo">
                    <ul class="users-liked user-list">
                        <li v-for="(user, userIndex) in data[indextr].usersLiked" :key="userIndex">
                            <vx-tooltip :text="user.name" position="bottom">
                                <vs-avatar :src="user.img" size="30px" class="border-2 border-white border-solid -m-1"></vs-avatar>
                            </vx-tooltip>
                        </li>
                    </ul>
                  </vs-td>
                  <vs-td :data="data[indextr].orderNo">
                    <span>{{data[indextr].location}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].orderNo">
                    <span>{{data[indextr].distPercent + '%'}}</span>
                    <vs-progress :percent="data[indextr].distPercent" :color="data[indextr].statusColor"></vs-progress>
                  </vs-td>
                  <vs-td :data="data[indextr].orderNo">
                    <span>{{data[indextr].startDate}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].orderNo">
                    <span>{{data[indextr].estDelDate}}</span>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vx-card>
      </div>
    </div>
	</div>
</template>

<script>
// import VueApexCharts from 'vue-apexcharts'
// import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
// import ChangeTimeDurationDropdown from '@/components/ChangeTimeDurationDropdown.vue'
// import VxTimeline from '@/components/timeline/VxTimeline'
// import analyticsData from './ui-elements/card/analyticsData.js'

export default {
  data() {
    return {
      dispatchedOrders: []
    };
  },
  components: {
    // VueApexCharts,
    // StatisticsCardLine,
    // ChangeTimeDurationDropdown,
    // VxTimeline
  },
  created() {
    this.$http
      .get("/api/table/dispatched-orders")
      .then(response => {
        this.dispatchedOrders = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>