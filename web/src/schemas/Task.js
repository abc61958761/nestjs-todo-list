import gql from 'graphql-tag';

export const TODO_TASKS = gql`
    query todoTasks ($start: Int, $pageSize: Int){
        todoTasks(start: $start, pageSize: $pageSize) {
            taskCount
            tasks {
                _id
                title
                content
                status
            }
        }
    }
`

export const DONE_TASKS = gql`
    query doneTasks ($start: Int, $pageSize: Int){
        doneTasks(start: $start, pageSize: $pageSize) {
            taskCount
            tasks {
                _id
                title
                content
                status
            }
        }
    }
`

export const UPDATE_TASK = gql`
    mutation updateTask(
        $title: String
        $content: String
        $active: Boolean
        $status: TaskStatus
        $_id: ID!
    ) {
        updateTask(title: $title, content: $content, active: $active, status: $status, _id: $_id) {
            _id
            title
            content
            status
        }
    }
`

export const CREATE_TASK = gql`
    mutation createTask($taskData: TaskInput!) {
        createTask(taskData: $taskData) {
            _id
            title
            content
        }
    }
`