import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

// type
import { ToneConfig } from './type/ToneConfig';
import { TaskConfig } from './type/TaskConfig';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    navList: ['add', 'list', 'analysis', 'ringtone'],
    taskTab: ['todo', 'done'],
    toneTab: ['work', 'break'],
    _work: '',
    _break: '',
    taskList: [],
    taskDoingId: 1,
    toneObj: {},
    tomato: 10
  },
  mutations: {
    SET_TASK(state, list) {
      state.taskList = list;
    },
    SET_TONE(state: any, data) {
      state.toneTab.forEach((key: string) => {
        const _key: keyof typeof state = `_${key}`;
        const toneData = data[key].find((el: ToneConfig) => el.select === true);
        state[_key] = toneData.title;
      });
      state.toneObj = data;
    },
    CHANGE_TONE(state: any, data) {
      const _key: keyof typeof state = data.key;
      state[_key] = data.val;
    },
    SAVE_TASK(
      state: any,
      data: { id: number; inChecked: number; taskTitle: string }
    ) {
      const id = data.id;
      if (id >= state.taskList.length) {
        state.taskList.push({
          title: data.taskTitle,
          tomato: data.inChecked,
          tomatoed: 0,
          isDone: false
        });
        return;
      }
      state.taskList[id].tomato = data.inChecked;
      state.taskList[id].title = data.taskTitle;
    },
    SET_GOING(state: any, val: number) {
      state.taskDoingId = val;
    },
    FINISH_TASK(state: any, id: number) {
      state.taskList[id].tomatoed += 1
      if (state.taskList[id].tomatoed !== state.taskList[id].tomato) return
      state.taskList[id].isDone = true
    },
    FINISH_TASK_ALL(state: any, id: number) {
      const task: TaskConfig = state.taskList[id]
      task.tomatoed = task.tomatoed
      task.isDone = true
    }
  },
  actions: {
    async GET_TASK(context) {
      const _res = await axios.get('./database/TaskList.json');
      const res = _res.data.map((task: TaskConfig, id: number) => (
        { id, ...task }
      ))
      context.commit('SET_TASK', res);
    },
    async GET_TONE(context) {
      const res = await axios.get('./database/ToneList.json');
      context.commit('SET_TONE', res.data);
    }
  }
});
