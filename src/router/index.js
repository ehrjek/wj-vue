import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '../components/Login'
import Main from '../components/Main'
import Meeting from '../components/Meeting'
import CreatMeeting from '../components/CreatMeeting'
import Home from '../components/Home'
import MeetingDetail from '../components/MeetingDetail'
import Message from '../components/Message'
import Message2 from '../components/Message2'
import myMeetingDetail from '../components/myMeetingDetail'
import myMeetingDetail2 from '../components/myMeetingDetail2'
import myMeetingDetail3 from '../components/myMeetingDetail3'
// import commitcode from '../components/commitcode'
// import MeetingShow from '../components/MeetingShow'
import Meeting2 from '../components/Meeting2'
import main2 from '../components/main2'
import FindPwd from '../components/FindPwd'
Vue.use(Router)

export default new Router({
  // base: '/aoxinwechat/',
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/findPwd',
      name: 'FindPwd',
      component: FindPwd
    },
    {
      path: '/main2',
      name: 'main2',
      component: main2,
      children: [
        {
          path: '/meeting2',
          name: 'Meeting2',
          component: Meeting2
        },
        {
          path: '/Message2',
          name: 'Message2',
          component: Message2
        },
        {
          path: '/myMeetingDetail2',
          name: 'myMeetingDetail2',
          component: myMeetingDetail2
        }
      ]
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/meeting',
          name: 'Meeting',
          component: Meeting
        },
        {
          path: '/creatMeeting',
          name: 'CreatMeeting',
          component: CreatMeeting
        },
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/MeetingDetail',
          name: 'MeetingDetail',
          component: MeetingDetail
        },
        {
          path: '/Message',
          name: 'Message',
          component: Message
        },
        {
          path: '/myMeetingDetail',
          name: 'myMeetingDetail',
          component: myMeetingDetail
        },
        {
          path: '/myMeetingDetail3',
          name: 'myMeetingDetail3',
          component: myMeetingDetail3
        }
      ]
    }
  ]
})
