<template>
  <div id="page-user-list">
    <div v-if="$apollo.loading">Đang tải dữ liệu ...</div>
    <div v-else class="vx-card p-6">

      <div class="flex flex-wrap items-center">

        <!-- ITEMS PER PAGE -->
        <!-- <div class="flex-grow">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
              <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ usersData.length - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : usersData.length }} of {{ usersData.length }}</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <vs-dropdown-menu>

              <vs-dropdown-item @click="gridApi.paginationSetPageSize(10)">
                <span>10</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                <span>20</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(25)">
                <span>25</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(30)">
                <span>30</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div> -->
        <div class="p-3  flex items-center justify-center text-lg font-medium w-200 titleTable">
             NHIỆM VỤ KẾ HOẠCH:
        </div>
         <div>
         <vs-chip color="danger" class="product-order-status">{{'Quá hạn: ' + thongKe[0]}}</vs-chip>
         <vs-chip color="warning" class="product-order-status">{{'Cảnh báo: ' + thongKe[1]}}</vs-chip>
         <vs-chip color="primary" class="product-order-status2">{{'Đang thực hiện: ' + thongKe[2]}}</vs-chip>
         <vs-chip color="success" class="product-order-status">{{'Hoàn thành: ' + thongKe[3]}}</vs-chip>
        </div>
        <!-- TABLE ACTION COL-2: SEARCH & EXPORT AS CSV -->
          <vs-input class="sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Tìm kiếm..." />
          <!-- <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()">Export as CSV</vs-button> -->

          <!-- ACTION - DROPDOWN -->
          <!-- <vs-dropdown vs-trigger-click class="cursor-pointer">

            <div class="p-3 shadow-drop rounded-lg d-theme-dark-light-bg cursor-pointer flex items-end justify-center text-lg font-medium w-200">
              <span class="mr-2 leading-none">Chức năng</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

            <vs-dropdown-menu>

              <vs-dropdown-item>
                <span class="flex items-center">
                  <feather-icon icon="PrinterIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>In</span>
                </span>
              </vs-dropdown-item>

              <vs-dropdown-item>
                <span class="flex items-center" @click="gridApi.exportDataAsCsv()">
                  <feather-icon icon="SaveIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Xuất CSV</span>
                </span>
              </vs-dropdown-item>

            </vs-dropdown-menu>
          </vs-dropdown> -->
      </div>


      <!-- AgGrid Table -->
      <ag-grid-vue
        ref="agGridTable"
        :components="components"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="usersData"
        rowSelection="multiple"
        colResizeDefault="shift"
        :animateRows="true"
        :floatingFilter="true"
        :pagination="true"
        paginationPageSize="8"
        :suppressPaginationPanel="true"
        :enableRtl="$vs.rtl">
      </ag-grid-vue>

      <!-- <vs-pagination
        :total="totalPages"
        :max="7"
        v-model="currentPage" /> -->

    </div>
  </div>

</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import vSelect from 'vue-select'
import gql from 'graphql-tag'

// Cell Renderer
// import CellRendererLink from './cell-renderer/CellRendererLink.vue'
import CellRendererStatus from './components/CellRendererStatus.vue'
import CellRendererDate from './components/CellRendererDate.vue'
// import CellRendererVerified from './cell-renderer/CellRendererVerified.vue'
// import CellRendererActions from './cell-renderer/CellRendererActions.vue'


export default {
  components: {
    AgGridVue,
    vSelect,
    CellRendererStatus,
    CellRendererDate
  },
  apollo: {
    tasks: gql`
      query NhiemVuKT {
        tasks(where:{tasktype: {loai: "Kế hoạch"} hienThi: true}){
          id
          soHopDong
          noiDung
          ngayBatDau
          ngayKetThuc
          ngayGiaHan
          ghiChu
          giaTriHopDong
          giaTriQuyetToan
          daHoanThanh
          organize{name}
        }
      }
    `
  },
  data () {
    return {
      searchQuery: '',

      // AgGrid
      gridApi: null,
      gridOptions: {localeText: {
        selectAll: 'Chọn tất cả',
        selectAllSearchResults: 'Chọn tất cả kết quả tìm kiếm',
        searchOoo: 'Tìm kiếm...',
        blanks: 'Trống',
        noMatches: 'Không khớp',
        filterOoo: 'Lọc...',
        equals: 'Bằng',
        notEqual: 'Không bằng',
        // Number Filter
      lessThan: 'Nhỏ hơn',
      greaterThan: 'Lớn hơn',
      lessThanOrEqual: 'Nhỏ hơn bằng',
      greaterThanOrEqual: 'Lớn hơn bằng',
      inRange: 'Trong khoảng',
      inRangeStart: 'Từ',
      inRangeEnd: 'Đến',
      // Date Filter
    dateFormatOoo: 'dd-mm-yyyy',

    // Filter Conditions
    andCondition: 'Và',
    orCondition: 'Hoặc',

    // Filter Buttons
    applyFilter: 'Áp dụng',
    resetFilter: 'Làm mới',
    clearFilter: 'Xoá',
    cancelFilter: 'Huỷ',    
   
    // Side Bar
    columns: 'Cột',
    filters: 'Lọc',
 

    // Text Filter
    contains: 'Chứa',
    notContains: 'Không chứa',
    startsWith: 'Bắt đầu bằng',
    endsWith: 'Kết thúc bằng',
    loadingOoo: 'Đang tải...',
    noRowsToShow: 'Không có dữ liệu'
      }},
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefs: [
        {
          headerName: 'ID',
          field: 'id',
          width: 120,
          filter: true,
          checkboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          headerCheckboxSelection: true,
          cellClass: 'text-center'
        },
        {
          headerName: 'Số HĐ/CT',
          field: 'soHopDong',
          filter: true,
          width: 120,
          cellClass: 'text-center'
        },
        {
          headerName: 'Nội dung',
          field: 'noiDung',
          filter: true,
          width: 280
        },
        {
          headerName: 'Thực hiện',
          field: 'orgazine.name',
          filter: true,
          width: 130,
          cellClass: 'text-center'
        },
        {
          headerName: 'Trạng thái',
          field: 'trangThai',
          filter: true,
          width: 150,
          cellRendererFramework: 'CellRendererStatus',
          cellClass: 'text-center'
        },
        {
          headerName: 'Bắt đầu',
          field: 'ngayBatDau',
          filter: true,
          width: 125,
          cellClass: 'text-center'
        },
        {
          headerName: 'Kết thúc',
          field: 'ngayKetThuc',
          filter: true,
          width: 125,
          cellClass: 'text-center'
        },
        {
          headerName: 'Còn lại',
          field: 'conLai',
          filter: true,
          width: 140,
          cellRendererFramework: 'CellRendererDate',
          cellClass: 'text-center'
        },
        {
          headerName: 'Gia hạn',
          field: 'ngayGiaHan',
          filter: true,
          width: 125,
          cellClass: 'text-center'
        },
        {
          headerName: 'Ghi chú',
          field: 'ghiChu',
          filter: true,
          width: 400
        },
        {
          headerName: 'Giá trị hợp đồng',
          field: 'giaTriHopDong',
          filter: true,
          width: 250,
        },
         {
          headerName: 'Giá trị quyết toán',
          field: 'giaTriQuyetToan',
          filter: true,
          width: 250,
        }
      ],

      // Cell Renderer Components
      components: {
        CellRendererStatus,
        CellRendererDate
      }
    }
  },
computed: {
    usersData(){
      let KQ=[]
      let myID=1
      this.tasks.forEach(element => {
        let doiTuong= {
          id: myID,
          id2: element.id,
          soHopDong: element.soHopDong,
          noiDung: element.noiDung,
          orgazine: {name: element.organize.name},
          trangThai: this.loaiTrangThai(this.tinhTrangThai2(element.ngayBatDau,element.ngayKetThuc,element.ngayGiaHan,element.daHoanThanh)),
          conLai:{value: this.tinhHienTai(element.ngayKetThuc,element.ngayGiaHan), color:this.loaiTrangThai(this.tinhTrangThai2(element.ngayBatDau,element.ngayKetThuc,element.ngayGiaHan,element.daHoanThanh))},
          ngayBatDau: this.GetFormattedDate(element.ngayBatDau),
          ngayKetThuc: this.GetFormattedDate(element.ngayKetThuc),
          ngayGiaHan: element.ngayGiaHan === null ? '' : this.GetFormattedDate(element.ngayGiaHan),
          ghiChu: element.ghiChu,
          giaTriHopDong: this.formatMoney(element.giaTriHopDong),
          giaTriQuyetToan: this.formatMoney(element.giaTriQuyetToan)
        }
        KQ.push(doiTuong)
        myID++
      })
      return KQ.sort(this.fieldSorter(['trangThai','organize.name']))
    },
    thongKe(){
      let KQ=[]
      let quahan = this.usersData.filter(function(giatri){
         return giatri.trangThai=== '1. Quá hạn';
      }).length
      KQ.push(quahan)
      //this.pieChart.chartOptions.legend.labels[0]="Quá hạn: "+ quahan
       let canhbao = this.usersData.filter(function(giatri){
         return giatri.trangThai === '2. Cảnh báo';
      }).length
      KQ.push(canhbao)
      //this.pieChart.chartOptions.labels[1]="Cảnh báo: "+ canhbao
       let dangthuchien = this.usersData.filter(function(giatri){
         return giatri.trangThai === '3. Đang xử lý';
      }).length
      KQ.push(dangthuchien)
      //this.pieChart.chartOptions.labels[2]="Đang thực hiện: "+ dangthuchien
       let hoanthanh = this.usersData.filter(function(giatri){
         return giatri.trangThai === '4. Hoàn thành';
      }).length
      KQ.push(hoanthanh)
      //this.pieChart.chartOptions.labels[3]="Hoàn thành: "+ hoanthanh
      return KQ
    }
    // paginationPageSize () {
    //   if (this.gridApi) return this.gridApi.paginationGetPageSize()
    //   else return 10
    // },
    // totalPages () {
    //   if (this.gridApi) return this.gridApi.paginationGetTotalPages()
    //   else return 0
    // },
    // currentPage: {
    //   get () {
    //     if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
    //     else return 1
    //   },
    //   set (val) {
    //     this.gridApi.paginationGoToPage(val - 1)
    //   }
    // }
  },
  methods: {
    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
    },
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
    exportToExcel () {
      import('@/vendor/Export2Excel').then(excel => {
        const list = this.selectedUsers
        const data = this.formatJson(this.headerVal, list)
        excel.export_json_to_excel({
          header: this.headerTitle,
          data,
          filename: this.fileName,
          autoWidth: this.cellAutoWidth,
          bookType: this.selectedFormat
        })
        this.clearFields()
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        // Add col name which needs to be translated
        // if (j === 'timestamp') {
        //   return parseTime(v[j])
        // } else {
        //   return v[j]
        // }

        return v[j]
      }))
    },
    clearFields () {
      this.fileName = ''
      this.cellAutoWidth = true
      this.selectedFormat = 'xlsx'
    },
    tinhThoiGian(ngayBatDau,ngayKetThuc){
        let inbd = new Date(ngayBatDau)
        let inkt = new Date(ngayKetThuc)
        return Math.round((inkt-inbd) / 1000 / 60 / 60 / 24);
     },
     tinhHienTai(thoiGian,giaHan){
        thoiGian = giaHan===null? thoiGian:giaHan
        let inbd= Date.now()
        let inkt = new Date(thoiGian)
        return Math.round((inkt-inbd) / 1000 / 60 / 60 / 24);
     },
    tinhTrangThai2(ngayBatDau,ngayKetThuc,ngayGiaHan, dahoanthanh){
        ngayKetThuc = ngayGiaHan === null ? ngayKetThuc:ngayGiaHan
        if(dahoanthanh===false || dahoanthanh===null){
        let Tongthoigian = this.tinhThoiGian(ngayBatDau,ngayKetThuc)
        let hienTai = this.tinhHienTai(ngayKetThuc,ngayGiaHan)
        console.log(hienTai)
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
     GetFormattedDate(todayTime) {
      const thoigian = new Date(todayTime)
      const month = thoigian.getMonth() + 1
      const day = thoigian.getDate()
      const year = thoigian.getFullYear()
      return day + '/' + month + '/' + year
    },
    formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
}
  },
  mounted () {
    this.gridApi = this.gridOptions.api

    /* =================================================================
      NOTE:
      Header is not aligned properly in RTL version of agGrid table.
      However, we given fix to this issue. If you want more robust solution please contact them at gitHub
    ================================================================= */
    if (this.$vs.rtl) {
      const header = this.$refs.agGridTable.$el.querySelector('.ag-header-container')
      header.style.left = `-${  String(Number(header.style.transform.slice(11, -3)) + 9)  }px`
    }
  }
}

</script>

<style lang="scss">
#page-user-list {
  .user-list-filters {
    .vs__actions {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-58%);
    }
  }
}
.product-order-status{
  width: 150px;
  font-weight: 700;
  margin-right: 5px;
}
.product-order-status2{
  width: 170px;
  font-weight: 700;
  margin-right: 5px;
}
.titleTable{
  font-weight: 700;
  color: white;
  font-size: 18px !important;
}
</style>
