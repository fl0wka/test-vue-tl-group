<template>
    <div>
        <div class='block-filters'>
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
                <input v-model='searchFrom' type='number' min="0" placeholder='от' style="width: 100px;">
                <input v-model='searchBefore' type='number' min="0" placeholder='до' style="width: 100px;">
            </div>
            <button class='btn' @click='$store.dispatch("clearInput")'>Очистить все фильтры</button>
        </div>
        <div v-if='$store.getters.filteredAllColumns.length'>
            <Table :users='$store.getters.filteredAllColumns' />
        </div>
        <h2 v-else=''>Ничего не найдено</h2>
    </div>
</template>

<script>
import Table from '@/components/Table';
import router from '@/router/router';

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
    watch: {
        "$store.getters.queryUrl": (query) => {
            router.push({query})
        }
    },
    components: {
        Table
    }
}
</script>

<style>
input {
    width: 50%;
    margin: 0 5px;
    padding: 5px 10px;
    outline-style: none;
}
p {
    margin-right: 5px;
}
h2 {
    text-align: center;
}
.form {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
}
.block-filters {
    text-align: center;
    width: 100%;
    margin-bottom: 50px;
    border: 2px solid #42b983;
    padding: 15px;
}
.btn {
    font-family: inherit;
    font-size: 16px;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 2px;
    border: none;
    color: white;
    background-color: #42b983
}

@media (max-width: 700px) {
    input {
        width: 100%;
        margin: 0 5px;
        padding: 5px 10px;
        outline-style: none;
    }
    .form {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 20px 0;
}
}
</style>