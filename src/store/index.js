import { createStore } from 'vuex';

export default createStore({
  state: () => ({
    searchLogin: '',
    searchStatus: '',
    searchFrom: '',
    searchBefore: '',
    columns: [
      { number: 'Место', sortType: 'asc' },
      { login: 'Логин', sortType: 'asc' },
      { confirmedOrders: 'Подтвержденные заказы', sortType: 'asc' },
      { status: 'Статус', sortType: 'asc' },
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
      { number: 4, login: 'dog@mail.ru', confirmedOrders: 64, status: 'рыбак' },
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
    sortBy: (state) => (key) => {
      // Создаю новый массив со значениями по переданному ключу
      const newArrUsersValue = state.users.map((user) => user[key]);
      // Делаю проверку на тип данных в массиве и от этого запускаю определенный вид сортировки
      if (newArrUsersValue.some((user) => typeof user === 'string')) {
        return state.users.sort((a, b) => a[key].localeCompare(b[key]));
      } else {
        return state.users.sort((a, b) => a[key] - b[key]);
      }
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
  },
  actions: {},
  modules: {},
});
