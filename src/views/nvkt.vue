<template>
  <div>
    <div class="vx-row">
      <div class="vx-col w-full">
        <vx-card title="DANH SÁCH NHIỆM VỤ KỸ THUẬT">
          <div slot="no-body" class="mt-4">
            <vs-table
              pagination
              max-items="8"
              search
              :data="cacnhiemvu.sort(fieldSorter(['trangThai','organize']))"
              stripe
              class="table-dark-inverted"
            >
              <template slot="thead">
                <vs-th>STT</vs-th>
                <!-- <vs-th sort-key="project" style="width:240px">DỰ ÁN</vs-th> -->
                <vs-th style="width:420px">NỘI DUNG</vs-th>
                <vs-th sort-key="organize">THỰC HIỆN</vs-th>
                <vs-th sort-key="trangThai">TRẠNG THÁI</vs-th>
                <!-- <vs-th sort-key="trangThai">HOÀN THÀNH</vs-th> -->
                <vs-th sort-key="batdau">BẮT ĐẦU</vs-th>
                <vs-th sort-key="ketthuc">KẾT THÚC</vs-th>
                <vs-th sort-key="conLai">CÒN LẠI</vs-th>
                <vs-th>GHI CHÚ</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="indextr">
                    <span>{{ indextr + 1 }}</span>
                  </vs-td>

                  <!-- <vs-td :data="tr.project">
                    <span>{{ tr.project }}</span>
                  </vs-td> -->

                  <vs-td :data="tr.noidung">
                    <span>{{ tr.noidung }}</span>
                  </vs-td>

                  <vs-td :data="tr.organize">
                    <span>{{ tr.organize }}</span>
                  </vs-td>

                  <vs-td :data="loaiTrangThai(tinhTrangThai2(tr.batdau,tr.ketthuc,tr.daHoanThanh))">
                    <vs-chip :color="tinhTrangThai2(tr.batdau,tr.ketthuc,tr.daHoanThanh)" class="product-order-status">{{ loaiTrangThai(tinhTrangThai2(tr.batdau,tr.ketthuc,tr.daHoanThanh)) }}</vs-chip>
                  </vs-td>
         
                  <!-- <vs-td :data="loaiTrangThai(tinhTrangThai(tr.batdau,tr.ketthuc,tr.KhoiLuongHoanThanh,tr.KhoiLuong))">
                    <span class="flex items-center px-2 py-1 rounded"><div class="h-3 w-3 rounded-full mr-2" :class="'bg-' + tinhTrangThai(tr.batdau,tr.ketthuc,tr.KhoiLuongHoanThanh,tr.KhoiLuong)"></div>{{loaiTrangThai(tinhTrangThai(tr.batdau,tr.ketthuc,tr.KhoiLuongHoanThanh,tr.KhoiLuong))}}</span>
                  </vs-td> -->
                  <!-- <vs-td :data="tr.KhoiLuongHoanThanh">
                    <span>{{mucDoHoanThanh(tr.KhoiLuongHoanThanh,tr.KhoiLuong).toPrecision(4) + '%'}}</span>
                    <vs-progress :percent="mucDoHoanThanh(tr.KhoiLuongHoanThanh,tr.KhoiLuong)" :color="tinhTrangThai(tr.batdau,tr.ketthuc,tr.KhoiLuongHoanThanh,tr.KhoiLuong)"></vs-progress>
                  </vs-td> -->

                   <vs-td :data="tr.batdau">
                    <span>{{ GetFormattedDate(tr.batdau) }}</span>
                  </vs-td>

                   <vs-td :data="tr.ketthuc">
                    <span>{{ GetFormattedDate(tr.ketthuc) }}</span>
                  </vs-td>

                  <!-- <vs-td :data="tr.conLai">
                    <span>{{ tr.conLai + ' ngày'}}</span>
                  </vs-td> -->

                  <vs-td :data="loaiTrangThai(tinhTrangThai2(tr.batdau,tr.ketthuc,tr.daHoanThanh))">
                    <vs-chip :color="tinhTrangThai2(tr.batdau,tr.ketthuc,tr.daHoanThanh)" class="date-status">{{tr.conLai + ' ngày'}}</vs-chip>
                  </vs-td>

                  <vs-td :data="tr.ghiChu">
                    <span>{{ tr.ghiChu }}</span>
                  </vs-td>
                  <!-- <vs-td :data="data[indextr].status">
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
                  </vs-td> -->
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vx-card>
      </div>
    </div>
    <!-- Ket thuc danh sach -->
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return {
      nhiemvus: []
    };
  },
  mounted () {
     this.$store.commit('UPDATE_HIEN_THI',true)
     this.$store.commit('UPDATE_THONG_KE',this.laySoLieu2())
  },
  apollo: {
    nhiemvukythuats: gql`
      query Nhiemvukythuats {
        nhiemvukythuats(where: {Display: true}) {
          id
          # project {
          #   name
          # }
          organize {
            name
          }
          noidung
          batdau
          ketthuc
          # KhoiLuongHoanThanh
          # KhoiLuong
          ghichu
          dahoanthanh
        }
      }
    `
  },
  computed: {
    cacnhiemvu() {
       let kq= []
       this.nhiemvukythuats.forEach(element => {
          let doiTuong = {
          id: element.id,
          // project: (element.project.name ? element.project.name : ''),
          organize: (element.organize.name ?  element.organize.name : ''),
          noidung: element.noidung,
          batdau: element.batdau,
          ketthuc:element.ketthuc,
          // KhoiLuong: element.KhoiLuong,
          // KhoiLuongHoanThanh: element.KhoiLuongHoanThanh,
          trangThai: this.loaiTrangThai(this.tinhTrangThai2(element.batdau,element.ketthuc,element.daHoanThanh)),
          conLai: this.tinhHienTai(element.ketthuc),
          ghiChu: element.ghiChu,
          daHoanThanh: element.daHoanThanh
         }
         kq.push(doiTuong)
       })
      return kq
    },
    tongHop() {
      return this.laySoLieu2()
    }
  },
  methods: {
    fieldSorter(fields) {
    return function (a, b) {
        return fields
            .map(function (o) {
                var dir = 1;
                if (o[0] === '-') {
                   dir = -1;
                   o=o.substring(1);
                }
                if (a[o] > b[o]) return dir;
                if (a[o] < b[o]) return -(dir);
                return 0;
            })
            .reduce(function firstNonZeroValue (p,n) {
                return p ? p : n;
            }, 0);
    };
},
laySoLieu2(){
      let KQ=[]
      let quahan = this.cacnhiemvu.filter(function(giatri){
         return giatri.trangThai=== '1. Quá hạn';
      }).length
      KQ.push(quahan)
      //this.pieChart.chartOptions.legend.labels[0]="Quá hạn: "+ quahan
       let canhbao = this.cacnhiemvu.filter(function(giatri){
         return giatri.trangThai === '2. Cảnh báo';
      }).length
      KQ.push(canhbao)
      //this.pieChart.chartOptions.labels[1]="Cảnh báo: "+ canhbao
       let dangthuchien = this.cacnhiemvu.filter(function(giatri){
         return giatri.trangThai === '3. Đang xử lý';
      }).length
      KQ.push(dangthuchien)
      //this.pieChart.chartOptions.labels[2]="Đang thực hiện: "+ dangthuchien
       let hoanthanh = this.cacnhiemvu.filter(function(giatri){
         return giatri.trangThai === '4. Hoàn thành';
      }).length
      KQ.push(hoanthanh)
      //this.pieChart.chartOptions.labels[3]="Hoàn thành: "+ hoanthanh
      return KQ
  },
GetFormattedDate(todayTime) {
      const thoigian = new Date(todayTime)
      const month = thoigian.getMonth() + 1
      const day = thoigian.getDate()
      const year = thoigian.getFullYear()
      return day + '/' + month + '/' + year
    },
    mucDoHoanThanh(klht,kl){
       return (klht * 100 /kl)
     },
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
       if(value==='primary') return '3. Đang xử lý'
       if(value==='danger') return '1. Quá hạn'
     },
     dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
},
    dynamicSortMultiple() {
    /*
     * save the arguments object as it will be overwritten
     * note that arguments object is an array-like object
     * consisting of the names of the properties to sort by
     */
    var props = arguments;
    return function (obj1, obj2) {
        var i = 0, result = 0, numberOfProperties = props.length;
        /* try getting a different result from 0 (equal)
         * as long as we have extra properties to compare
         */
        while(result === 0 && i < numberOfProperties) {
            result = this.dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    }
},
SapXepMang(){
  return this.nhiemvus.sort(this.dynamicSortMultiple());
}
  }
  //   created() {
  //     this.$http
  //       .get("/api/table/dispatched-orders")
  //       .then(response => {
  //         this.dispatchedOrders = response.data;
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }
};
</script>
<style scoped>
th {
  color: white;
  font-weight: 700;
  font-size: 15px;
}
.product-order-status{
  width: 115px;
  font-weight: 700;
}
.date-status{
  width: 100px;
  font-weight: 700;
}
</style>