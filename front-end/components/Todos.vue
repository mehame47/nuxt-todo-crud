<template>
    <div>
        <div class="todos-head">
            <h2 
                v-if="!todo_items.length" 
                class="not-find">You have not yet todo
            </h2>
        <div v-if="todo_items.length" class="todos-content">
        </div>
            <div v-if="this.todo_items_not_completed.length">
                <div class="header-item-todos">
                    <h3 class="left">
                        On Progress...
                    </h3>
                    <h4>
                        ({{ this.todo_items_not_completed.length }})
                    </h4>
                </div>
                
                <div
                    :key="todo_item.id"
                    v-for="todo_item in this.todo_items_not_completed">
                    <TodoItem
                        :todo_item= "todo_item"
                        v-on:deleteItem= "deleteItemMethod"
                        v-on:editItem= "editItemMethod"
                        v-on:checkedItem= "checkedItemMethod">
                    </TodoItem>
                </div>
            </div>
            
            <div v-if="this.todo_items_completed.length">
                <div class="header-item-todos">
                    <h3 class="left">
                        Completed
                    </h3>
                    <h4>
                        ({{ this.todo_items_completed.length }})
                    </h4>
                </div>
                <div
                    :key="todo_item.id"
                    v-for="todo_item in this.todo_items_completed">
                    <TodoItem
                        :todo_item= "todo_item"
                        v-on:deleteItem= "deleteItemMethod"
                        v-on:checkedItem= "checkedItemMethod">
                    </TodoItem>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TodoItem from './TodoItem'
    export default {
        name: 'Todos',
        props: ["todo_items"],
        components: {
            TodoItem
        },
        data() {
            return {
                todo_items_completed: [],
                todo_items_not_completed: [],
            }
        },
        methods: {
            deleteItemMethod(id) {
                this.$emit("deleteItemEvent", id)
            },
            editItemMethod(id) {
                this.$emit("editItemEvent", id)
            },
            checkedItemMethod(id) {
                this.$emit("checkedItemEvent", id)
            },
        },
        watch: {
            todo_items: {
                handler() {
                    this.todo_items_completed = this.todo_items.filter( todo_item => todo_item.is_completed === true )
                    this.todo_items_not_completed = this.todo_items.filter( todo_item => todo_item.is_completed === false)
                },
                deep: true
            }
        }
    }
</script>

<style>
    .todos-head {
        margin-top: 30px;
    }

    .not-find {
        margin: auto;
        width: 60%;
        padding: 10px 20px;
        background: #f3beb8;
        border: 1px solid #f09898;
    }

    .todos-item {
        margin: 20px 0;
    }

    .header-item-todos {
        display: flex;
        margin: 20px 0;
        margin-top: 50px;
    }

    .header-item-todos h3 {
        margin: auto;
        width: 90%;
    }

    .header-item-todos h4 {
        margin: auto;
        width: 10%;
    }
    
    .left {
        text-align: left;
    }

    @media screen and (max-width: 500px) {
        .not-find {
            width: 80%;
            padding: 0 5px;
        }
    }
</style>