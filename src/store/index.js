import { createStore } from 'vuex';

export default createStore({
  state: () => ({
    searchLogin: '',
    searchStatus: '',
    searchFrom: '',
    searchBefore: '',
    sortType: 'asc',
    sortColumn: 'number',

    columns: [
      { number: 'Место' },
      { login: 'Логин' },
      { confirmedOrders: 'Подтвержденные заказы' },
      { status: 'Статус' },
    ],
    users: [
      {
        number: 1,
        login: 'smith@gmail.com',
        confirmedOrders: 312,
        status: 'Ценитель красоты',
      },
      {
        number: 2,
        login: 'lenin@gmail.com',
        confirmedOrders: 120,
        status: 'Поставщик аксессуаров',
      },
      {
        number: 3,
        login: 'mask@gmail.com',
        confirmedOrders: 98,
        status: 'Конкурент минздрава',
      },
      {
        number: 4,
        login: 'dog@mail.ru',
        confirmedOrders: 64,
        status: 'рыбак',
      },
      {
        number: 5,
        login: 'nightmare@mail.ru',
        confirmedOrders: 34,
        status: 'охотник',
      },
      {
        number: 6,
        login: 'cat@mail.ru',
        confirmedOrders: 1,
        status: 'Ценитель красоты',
      },
    ],
  }),
  getters: {
    filteredLogin(state) {
      return state.users.filter((user) => {
        return (
          user.login.toLowerCase().indexOf(state.searchLogin.toLowerCase()) !==
          -1
        );
      });
    },
    filteredStatus(state, getters) {
      return getters.filteredLogin.filter((user) => {
        return (
          user.status
            .toLowerCase()
            .indexOf(state.searchStatus.toLowerCase()) !== -1
        );
      });
    },
    filteredAllColumns(state, getters) {
      if (state.searchFrom && state.searchBefore) {
        return getters.filteredStatus.filter((user) => {
          return (
            state.searchFrom <= user.confirmedOrders &&
            user.confirmedOrders <= state.searchBefore
          );
        });
      } else {
        return getters.filteredStatus;
      }
    },
    queryUrl(state) {
      let query = {};

      state.searchLogin
        ? (query.login = state.searchLogin)
        : delete query.login;
      state.searchStatus
        ? (query.status = state.searchStatus)
        : delete query.status;
      state.searchFrom ? (query.from = state.searchFrom) : delete query.from;
      state.searchBefore
        ? (query.before = state.searchBefore)
        : delete query.before;
      query.sort = `${state.sortColumn},${state.sortType}`;

      return query;
    },
  },
  mutations: {
    setSearchLogin(state, searchLogin) {
      state.searchLogin = searchLogin;
    },
    setSearchStatus(state, searchStatus) {
      state.searchStatus = searchStatus;
    },
    setSearchFrom(state, searchFrom) {
      state.searchFrom = searchFrom;
    },
    setSearchBefore(state, searchBefore) {
      state.searchBefore = searchBefore;
    },
    setSortType(state, sortType) {
      state.sortType = sortType;
    },
    setSortColumn(state, titleColumn) {
      state.sortColumn = titleColumn;
    },
  },
  actions: {
    sortBy({ state, commit }, key) {
      commit('setSortColumn', key);
      if (state.sortType === 'desc') {
        commit('setSortType', 'asc');
        state.users.sort((a, b) => {
          return a[key] > b[key] ? 1 : -1;
        });
      } else {
        commit('setSortType', 'desc');
        state.users.sort((a, b) => {
          return a[key] < b[key] ? 1 : -1;
        });
      }
    },
    clearInput({ state, commit }) {
      if (
        state.searchLogin ||
        state.searchStatus ||
        state.searchFrom ||
        state.searchBefore
      ) {
        commit('setSearchLogin', '');
        commit('setSearchStatus', '');
        commit('setSearchFrom', '');
        commit('setSearchBefore', '');
      }
    },
  },
  modules: {},
});
