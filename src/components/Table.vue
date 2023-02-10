<template>
    <table>
        <thead>
            <tr>
                <th 
                    class='th' 
                    v-for='column in $store.state.columns' 
                    :key=Object.keys(column)[0] 
                    @click='$store.dispatch("sortBy", Object.keys(column)[0])'
                > 
                        {{ Object.values(column)[0] }}
                        <svg 
                            v-if='$store.state.sortColumn === Object.keys(column)[0]'
                            xmlns='http://www.w3.org/2000/svg' 
                            width='16' 
                            height='16'
                            fill='currentColor'
                            class='bi bi-arrow-down-up' 
                            viewBox='0 0 16 16'>
                            <path 
                                fill-rule='evenodd'
                                d='M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z'
                            />
                        </svg>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for='user in users' :key='user.id'>
                <td> {{ user.number }} </td>
                <td> {{ user.login }} </td>
                <td> {{ user.confirmedOrders }} </td>
                <td> {{ user.status }} </td>
            </tr>
        </tbody>
    </table>
</template>

<script>

export default {
    props: {
        users: {
            required: true,
            type: Array
        },
    },
}
</script>

<style>
    table {
        width: 100%;
        margin: 20px 0;
        border: 2px solid #42b983;
        border-radius: 3px;
        background-color: #fff;
    }

    @media (max-width: 500px) {
        table {
            font-size: 11px;
        }
    }

    th {
        cursor: pointer;
        background-color: #42b983;
        color: rgb(255, 255, 255);
        user-select: none;
    }

    td {
        background-color: #f9f9f9;
        text-align: center;
    }

    th,
    td {
        padding: 10px 5px;
    }
    .bi {
        vertical-align: middle;
        padding-left: 3px;
    }
</style>