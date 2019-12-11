<template>
  <div class="app-page edit-topic-page">
    <div class="page-form-container">
      <h1 class="page-form-title">
        Edit Topic
      </h1>
      <topic-form
        :topic-id="$route.params.topicId"
        submit-button-title="Update"
        :update="true"
      />
    </div>
  </div>
</template>

<script>
import TopicForm from '@/components/TopicForm'

export default {
  components: { TopicForm }
}
</script>

<style lang="stylus" scoped>
</style>
