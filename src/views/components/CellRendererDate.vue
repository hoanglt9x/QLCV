<template>
    <vs-chip class="ag-grid-cell-chip" :color="chipColor(params.value.color)">
      <span>{{ params.value.value + ' ngày' }}</span>
    </vs-chip>
</template>

<script>
export default {
  name: 'CellRendererStatus',
  computed: {
    chipColor () {
      return (value) => {
        if (value === '4. Hoàn thành') return 'success'
        else if (value === '1. Quá hạn') return 'danger'
        else if (value === '2. Cảnh báo') return 'warning'
        else return 'primary'
      }
    }
  }
}
</script>

<style lang="scss" scpoped>
.ag-grid-cell-chip {
  &.vs-chip-success {
    background: rgba(var(--vs-success),.15);
    color: rgba(var(--vs-success),1) !important;
    font-weight: 600;
    width: 110px;
  }
  &.vs-chip-warning {
    background: rgba(var(--vs-warning),.15);
    color: rgba(var(--vs-warning),1) !important;
    font-weight: 600;
    width: 110px;
  }
  &.vs-chip-danger {
    background: rgba(var(--vs-danger),.15);
    color: rgba(var(--vs-danger),1) !important;
    font-weight: 600;
    width: 110px;
  }
  &.vs-chip-primary {
    background: rgba(var(--vs-primary),.15);
    color: rgba(var(--vs-primary),1) !important;
    font-weight: 600;
    width: 110px;
  }
}
</style>
