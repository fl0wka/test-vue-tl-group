<template>
    <div>
        <h2>Фильтры</h2>
        <div class='form'>
            <p>Логин:</p>
            <input v-model='searchLogin' type='text' placeholder='введите логин'>
        </div>
        <div class='form'>
            <p>Статус:</p>
            <input v-model='searchStatus' type='text' placeholder='введите статус'>
        </div>
        <div class='form'>
            <p>Заказы:</p>
            <input v-model='searchFrom' type='text' placeholder='от' style="width: 50px;">
            <input v-model='searchBefore' type='text' placeholder='до' style="width: 50px;">
        </div>
        <div v-if='$store.getters.filteredAllColumns.length'>
            <Table :users='$store.getters.filteredAllColumns' :columns='$store.state.columns' />
        </div>
        <h3 v-else=''>Ничего не найдено</h3>
    </div>
</template>

<script>
import Table from '@/components/Table';

export default {
    name: 'myApp',
    computed: {
        searchLogin: {
            get() {
                return this.$store.state.searchLogin
            },
            set(searchValue) {
                return this.$store.commit('setSearchLogin', searchValue)
            }
        },
        searchStatus: {
            get() {
                return this.$store.state.searchStatus
            },
            set(searchValue) {
                return this.$store.commit('setSearchStatus', searchValue)
            }
        },
        searchFrom: {
            get() {
                return this.$store.state.searchFrom
            },
            set(searchValue) {
                return this.$store.commit('setSearchFrom', searchValue)
            }
        },
        searchBefore: {
            get() {
                return this.$store.state.searchBefore
            },
            set(searchValue) {
                return this.$store.commit('setSearchBefore', searchValue)
            }
        }
    },
    components: {
        Table
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    margin: 15px 30px;
}
input {
    margin: 0 5px;
    padding: 5px 10px;
    outline-style: none;
}
p {
    margin-right: 5px;
}
.form {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 15px 0;
}
</style>