<template>
  <div>
    <h1>Lista de Problemas</h1>
    <el-button type="success" @click="getIssues()">Obtener Issues</el-button>
    <el-row :gutter="12" v-if="issues.length > 0">
      <el-col :span="12" v-for="(issue, index) in issues" :key="'issue-' + index">
        <el-card class="box-card" shadow="hover" style="margin: 5px 0;">
          <el-row :gutter="12">
            <el-col :span="21">{{ issue.title }}</el-col>
            <el-col :span="3">
              <el-button @click="closeIssue(index)" type="success" icon="el-icon-check" circle></el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';

const client = axios.create({
  baseURL: process.env.VUE_APP_GITHUB_ENDPOINT,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
    'Authorization': `token ${process.env.VUE_APP_GITHUB_TOKEN}`
  },
});

export default {
  name: 'IssueList',
  data() {
    return {
      issues: [],
    };
  },
  methods: {
    getIssues() {
      client.get('/issues')
        .then((res) => {
          this.issues = res.data;
        })
        .catch((error) => {
          console.error('Error al obtener issues:', error);
        });
    },
    closeIssue(index) {
      const target = this.issues[index];
      // Cerrar el issue en GitHub
      client.patch(`/issues/${target.number}`, { state: 'closed' })
        .then(() => {
          // Emitir evento para indicar que se cerró el issue
          this.$emit('issue-closed', target);
          // Eliminar el issue de la lista después de cerrarlo
          this.issues.splice(index, 1);
        })
        .catch((error) => {
          console.error("Error al cerrar el issue:", error);
        });
    },
  },
};
</script>