<template>
  <div class="">
    <h2>Example Admin LTE</h2>

    <div class="card-body">
      <table class="table table-bordered">
        <thead>
        <tr>
          <th style="width: 10px"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">#</font></font></th>
          <th><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Tarefa</font></font></th>
          <th><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Progresso</font></font></th>
          <th style="width: 40px"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Rótulo</font></font></th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">1</font></font></td>
          <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Atualizar o software</font></font></td>
          <td>
            <div class="progress progress-xs">
              <div class="progress-bar progress-bar-danger" style="width: 55%"></div>
            </div>
          </td>
          <td><span class="badge bg-danger"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">55%</font></font></span></td>
        </tr>
        <tr>
          <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">2)</font></font></td>
          <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Banco de dados limpo</font></font></td>
          <td>
            <div class="progress progress-xs">
              <div class="progress-bar bg-warning" style="width: 70%"></div>
            </div>
          </td>
          <td><span class="badge bg-warning"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">70%</font></font></span></td>
        </tr>
        <tr>
          <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">3)</font></font></td>
          <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Trabalho em execução</font></font></td>
          <td>
            <div class="progress progress-xs progress-striped active">
              <div class="progress-bar bg-primary" style="width: 30%"></div>
            </div>
          </td>
          <td><span class="badge bg-primary"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">30%</font></font></span></td>
        </tr>
        <tr>
          <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">4)</font></font></td>
          <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Corrigir e esmagar bugs</font></font></td>
          <td>
            <div class="progress progress-xs progress-striped active">
              <div class="progress-bar bg-success" style="width: 90%"></div>
            </div>
          </td>
          <td><span class="badge bg-success"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">90%</font></font></span></td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
