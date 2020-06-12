<template>
  <div id="page-user-list">

    <div class="vx-card p-6">

      <div class="flex flex-wrap items-center">

        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
              <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ usersData.length - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : usersData.length }} of {{ usersData.length }}</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
        </div>
        <div class="p-3  flex items-center justify-center text-lg font-medium w-200 titleTable">
             NHIỆM VỤ KỸ THUẬT:
        </div>
         <div>
         <vs-chip color="danger" class="product-order-status">{{'Quá hạn: ' + $store.state.giaTri[0]}}</vs-chip>
         <vs-chip color="warning" class="product-order-status">{{'Cảnh báo: ' + $store.state.giaTri[1]}}</vs-chip>
         <vs-chip color="primary" class="product-order-status2">{{'Đang thực hiện: ' + $store.state.giaTri[2]}}</vs-chip>
         <vs-chip color="success" class="product-order-status">{{'Hoàn thành: ' + $store.state.giaTri[3]}}</vs-chip>
        </div>
        <!-- TABLE ACTION COL-2: SEARCH & EXPORT AS CSV -->
          <vs-input class="sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Tìm kiếm..." />
          <!-- <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()">Export as CSV</vs-button> -->

          <!-- ACTION - DROPDOWN -->
          <vs-dropdown vs-trigger-click class="cursor-pointer">

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
          </vs-dropdown>
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
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        :enableRtl="$vs.rtl">
      </ag-grid-vue>

      <vs-pagination
        :total="totalPages"
        :max="7"
        v-model="currentPage" />

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
        tasks(where:{tasktype: {loai: "Kỹ thuật"} hienThi: true}){
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
      gridOptions: {},
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
      },
      usersData: [{
        id: 1,
        soHopDong: 'HD01',
        noiDung: 'Lam san bay etod',
        orgazine: {name: 'XN Trac dia'},
        trangThai: '4. Hoàn thành',
        conLai:{value: 12, color: '1. Quá hạn'},
        ngayBatDau: '26/06/1990',
        ngayKetThuc: '26/06/1990',
        ngayGiaHan: '26/06/1990',
        ghiChu: 'kasflj lskdjfsd sdsljsd sd jsgjslkgs',
        giaTriHopDong: '1.150.000.000.000',
        giaTriQuyetToan: '120.000.000.000'
      },
      {
        id: 2,
        soHopDong: 'HD01',
        noiDung: 'Lam san bay etod',
        orgazine: {name: 'XN Trac dia'},
        trangThai: '4. Hoàn thành',
        conLai:{value: 12, color: '1. Quá hạn'},
        ngayBatDau: '26/06/1990',
        ngayKetThuc: '26/06/1990',
        ngayGiaHan: '26/06/1990',
        ghiChu: 'kasflj lskdjfsd sdsljsd sd jsgjslkgs',
        giaTriHopDong: '1.150.000.000.000',
        giaTriQuyetToan: '120.000.000.000'
      }]
    }
  },
computed: {
    paginationPageSize () {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 10
    },
    totalPages () {
      if (this.gridApi) return this.gridApi.paginationGetTotalPages()
      else return 0
    },
    currentPage: {
      get () {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set (val) {
        this.gridApi.paginationGoToPage(val - 1)
      }
    }
  },
  methods: {
    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
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
