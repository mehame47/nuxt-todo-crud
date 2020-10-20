<template>
    <div class="add-todo-item">
        <link 
            rel="stylesheet" 
            href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" 
            crossorigin="anonymous">
        <form>
            <input class="input" :class="{ edit: this.mode_edit }" type="text" v-model="todo">
            <button 
                @click="submitTodo"
                v-if="!this.mode_edit"
                class="btn-add">
                <i class="fas fa-plus-circle"></i> Add
            </button>
            <button
                @click="editTodo" 
                v-else 
                class="btn-pen-add">
                <i class="fas fa-upload"></i> Update
            </button>
        </form>
        
    </div>
</template>

<script>
    export default {
        name: "AddTodoItem",
        props: ["edit_item"],
        data() {
            return {
                todo: "",
                mode_edit: false
            }
        },
        methods: { 
            submitTodo(e) {
                e.preventDefault();
                if(this.todo) {
                    const newTodo = {
                        todo: this.todo
                    }

                    this.$emit("addTodo", newTodo)
                    this.todo = "";
                }
            },
            editTodo( e ) {
                e.preventDefault()
                if(this.mode_edit) {
                    const editedTodo = {
                        todo: this.todo
                    }

                    this.$emit('editItemEventUpdate', editedTodo);
                    this.todo = ""
                }
            }
        },
        watch: {
            todo: {
                handler() {
                    if(!(this.todo)){
                        this.mode_edit = false
                    }
                }
            },
            edit_item: {
                handler() {
                    this.todo = this.edit_item.todo
                    this.mode_edit = true
                },
                deep: true
            }
        }
    }
    
</script>

<style>
    .add-todo-item {
        width: 100%;
    }

    .add-todo-item form {
        width: 65%;
        display: flex;
        margin: auto;
        margin-top: 25px;
    }

    .input {
        border: 1px solid #2e7718;
        padding: 12px 16px;
        border-radius: 20px 0 0 20px;
        width: 70%;
    }

    .edit {
        border: 1px solid DodgerBlue;
        padding: 12px 16px;
        border-radius: 20px 0 0 20px;
        width: 70%;
    }

    .btn-add {
        background-color: #2e7718; 
        border: none; 
        color: white; 
        padding: 10px 16px 13px 16px; 
        font-size: 16px; 
        cursor: pointer;
        border-radius: 0 20px 20px 0;
        width: 30%;
    }

    .btn-add:hover {
        background-color: #4fcc28;
    }

    .btn-pen-add {
        background-color: DodgerBlue;
        color: white;
        border: none;
        padding: 10px 16px 13px 16px; 
        font-size: 16px; 
        cursor: pointer;
        border-radius: 0 20px 20px 0;
        width: 30%;
    }
    
    .btn-pen-add:hover {
        background-color: RoyalBlue;
    }

    .fa-plus-circle, .fa-upload {
        margin-right: 7px;
    }

    * {
        box-sizing: border-box;
    }

    @media screen and (max-width: 1280px) {
        .btn-add, .btn-pen-add, .edit{
            width: 30%;
        }

        .input {
            width: 70%;
        }
    }

    @media screen and (max-width: 630px) {
        .add-todo-item form {
            width: 80%;
            display: flex;
        }

        .btn-add, .btn-pen-add, .edit{
            width: 30%;
            border-radius: 0 20px 20px 0;
        }

        .input {
            width: 70%;
            border-radius: 20px 0 0 20px;
        }
    }
</style>