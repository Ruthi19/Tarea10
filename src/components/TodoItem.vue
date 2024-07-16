<template>
    <el-col :span="12">
      <el-card class="box-card" shadow="hover" style="margin: 5px 0;">
        <el-row :gutter="12">
          <el-col :span="21">{{ title }}</el-col>
          <el-col :span="3">
            <el-button @click="handleRemove" type="success" icon="el-icon-check" circle></el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </template>
  
  <script>
  export default {
    name: 'TodoItem',
    props: {
      title: {
        type: String,
        required: true,
      },
      index: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      item: {
        type: Object,
        required: true,
      }
    },
    methods: {
      handleRemove() {
        if (this.type === 'todo') {
          this.$emit('remove', this.index);
        } else if (this.type === 'issue') {
          this.$emit('close-issue', this.item);
        }
      },
    },
  };
  </script>
