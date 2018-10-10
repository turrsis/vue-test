<template>
    <div
        id="TestDNDSortable"
        class="template"
    >
      <div id="list01" class="sortableList" style="width:400px">
          <div id="list01-01" draggable>list01-01</div>
          <div id="list01-02" draggable>list01-02</div>
          <div id="list01-03" draggable>list01-03</div>
          <div id="list01-04" draggable>list01-04</div>
          <div id="list01-05" draggable>list01-05</div>
          <div id="list01-06" draggable>list01-06</div>
          <div id="list01-07" draggable>list01-07</div>
          <div id="list01-08" draggable>list01-08</div>
          <div id="list01-09" draggable>list01-09</div>
      </div>
      ========
      <div id="list02" class="" style="width:400px">
          <div id="list02-01" draggable>list02-01</div>
          <div id="list02-02" draggable>list02-02</div>
          <div id="list02-03" draggable>list02-03</div>
          <div id="list02-04" draggable>list02-04</div>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'TestDNDSortable',
    components: {
    }
}
</script>

<style>
.sortableList div {
    border: solid lightseagreen 1px;
}
</style>
