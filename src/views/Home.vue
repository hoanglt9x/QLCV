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
              :data="cacnhiemvu"
              stripe
              class="table-dark-inverted"
            >
              <template slot="thead">
                <vs-th>STT</vs-th>
                <vs-th sort-key="organize">PHỤ TRÁCH</vs-th>
                <vs-th sort-key="trangThai">TRẠNG THÁI</vs-th>
                <vs-th style="width:250px;">NỘI DUNG</vs-th>
                <vs-th sort-key="trangThai">HOÀN THÀNH</vs-th>
                <vs-th sort-key="batdau">BẮT ĐẦU</vs-th>
                <vs-th sort-key="ketthuc">KẾT THÚC</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="indextr">
                    <span>{{ indextr + 1 }}</span>
                  </vs-td>
                  <vs-td :data="tr.organize">
                    <span>{{ tr.organize }}</span>
                  </vs-td>
                <vs-td :data="loaiTrangThai(tinhTrangThai(tr.batdau,tr.ketthuc,tr.KhoiLuongHoanThanh,tr.KhoiLuong))">
                <vs-chip :color="tinhTrangThai(tr.batdau,tr.ketthuc,tr.KhoiLuongHoanThanh,tr.KhoiLuong)" class="product-order-status">{{ loaiTrangThai(tinhTrangThai(tr.batdau,tr.ketthuc,tr.KhoiLuongHoanThanh,tr.KhoiLuong)) }}</vs-chip>
              </vs-td>
                  <!-- <vs-td :data="loaiTrangThai(tinhTrangThai(tr.batdau,tr.ketthuc,tr.KhoiLuongHoanThanh,tr.KhoiLuong))">
                    <span class="flex items-center px-2 py-1 rounded"><div class="h-3 w-3 rounded-full mr-2" :class="'bg-' + tinhTrangThai(tr.batdau,tr.ketthuc,tr.KhoiLuongHoanThanh,tr.KhoiLuong)"></div>{{loaiTrangThai(tinhTrangThai(tr.batdau,tr.ketthuc,tr.KhoiLuongHoanThanh,tr.KhoiLuong))}}</span>
                  </vs-td> -->
                  <vs-td :data="tr.noidung">
                    <span>{{ tr.noidung }}</span>
                  </vs-td>
                   <vs-td :data="tr.KhoiLuongHoanThanh">
                    <span>{{mucDoHoanThanh(tr.KhoiLuongHoanThanh,tr.KhoiLuong).toPrecision(4) + '%'}}</span>
                    <vs-progress :percent="mucDoHoanThanh(tr.KhoiLuongHoanThanh,tr.KhoiLuong)" :color="tinhTrangThai(tr.batdau,tr.ketthuc,tr.KhoiLuongHoanThanh,tr.KhoiLuong)"></vs-progress>
                  </vs-td>
                   <vs-td :data="tr.batdau">
                    <span>{{ tr.batdau }}</span>
                  </vs-td>
                   <vs-td :data="tr.ketthuc">
                    <span>{{ tr.ketthuc }}</span>
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
  apollo: {
    nhiemvus: gql`
      query NhiemVus {
        nhiemvus {
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
        }
      }
    `
  },
  computed: {
    cacnhiemvu() {
       let kq= []
       this.nhiemvus.forEach(element => {
          let doiTuong = {
          id: element.id,
          // project: element.project.name,
          organize: element.organize.name,
          noidung: element.noidung,
          batdau: element.batdau,
          ketthuc:element.ketthuc,
          KhoiLuong: element.KhoiLuong,
          KhoiLuongHoanThanh: element.KhoiLuongHoanThanh,
          trangThai: this.loaiTrangThai(this.tinhTrangThai(element.batdau,element.ketthuc,element.KhoiLuongHoanThanh,element.KhoiLuong))
         }
         kq.push(doiTuong)
       })
      return kq
    }
  },
  methods: {
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
     loaiTrangThai(value){
       if(value==='success') return 'Đã hoàn thành'
       if(value==='warning') return 'Cảnh báo'
       if(value==='primary') return 'Đang thực hiện'
       if(value==='danger') return 'Quá hạn'
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
}
</style>