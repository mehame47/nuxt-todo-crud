<template>
  <div id="app">
    <div class="header-top">
            <Header></Header>
            <AddTodoItem
                :edit_item = "edit_item"
                v-on:addTodo = "addTodoEvent"
                v-on:editItemEventUpdate = "editItemEventUpdate"
            ></AddTodoItem>
        </div>
        <div>
            <Todos
                :todo_items= "todo_items"
                v-on:editItemEvent = "editItemEvent"
                v-on:checkedItemEvent = "checkedItemEvent"
                v-on:deleteItemEvent = "deleteEventItem">
            </Todos>
        </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      todo_items: [],
      edit_item: '',
    }
  },
  methods: {
    addTodoEvent( data ) {
      this.$axios.$post( '/todos', data )
          .then( result => {
            console.log( result )
            this.retrieveTodos()
          })
          .catch( (error) => {
            console.log( error )
          })
    },
    retrieveTodos() {
      this.$axios.$get( '/todos' )
          .then( result => {
            this.todo_items = result.data.sort().reverse()
          })
          .catch( error => {
            console.log( error )
          })
    },
    editItemEvent( id ) {
      const index = this.todo_items.findIndex( todo_item => todo_item.id === id )
      this.edit_item = this.todo_items[index]

      console.log( this.edit_item )
    },
    editItemEventUpdate( editedTodo ) {
      const idItemUpdate = this.edit_item.id

      this.$axios.$put( `/todos/?id=${idItemUpdate}`, editedTodo )
          .then( (result) => {
            this.retrieveTodos()
            console.log( result )
          })
          .catch( (error) => {
            console.log( error )
          })
    },
    deleteEventItem( id ) {
      this.$axios.$delete( `/todos/?id=${id}`)
          .then( result => {
            this.todo_items = result.data
            console.log( result )
          })
          .catch( error => {
            console.log( error )
          })
    },
    checkedItemEvent( id ) {
      const index = this.todo_items.findIndex(todo_item => todo_item.id === id);
      const dataUpdated = {
        is_completed: !(this.todo_items[index].is_completed)
      }

      this.$axios.$put( `/todos/?id=${id}`, dataUpdated )
        .then( result => {
          this.retrieveTodos()
          console.log( result )
        })
        .catch( error => {
          console.log( error )
        })
    },
  },
  created() {
    this.retrieveTodos()
  },
}
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        width: 60%;
        margin: 60px auto;
        background-color: #d8f3dc;
        padding: 45px 60px;
    }

    .header-top{
        position: sticky;
        top: 30px;
        background-color: #b7e4c7;
        padding: 30px 0;
        box-shadow: 0px 0px 20px 3px rgba(8, 28, 21,0.5);
    }

    * {
        box-sizing: border-box;
    }

    @media screen and (max-width: 1100px) {
        #app {
            width: 85%;
            margin: auto;
        }
    }

    @media screen and (max-width: 800px) {
        #app {
            width: 100%;
            margin: auto;
        }
    }

    @media screen and (max-width: 500px) {
        #app {
            padding: 0;
            padding-bottom: 50px;
        }

        .header-top{
            top: 0px;
        }

        .todos-content {
            padding: 0 7%;
        }
    }
</style>