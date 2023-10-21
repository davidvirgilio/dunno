import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import OptionsView from '../views/OptionsView.vue'
import CriteriaView from '../views/CriteriaView.vue'
import CriteriaComparison from '../views/CriteriaComparison.vue'
import RankedCriteria from '../views/RankedCriteria.vue'
import OptionsComparison from '../views/OptionsComparison.vue'
import FinalDecision from '../views/FinalDecision.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/options',
      name: 'InputOptions',
      component: OptionsView
    },
    {
      path: '/criteria',
      name: 'Criteria',
      component: CriteriaView
    },
    {
      path: '/criteria-comparison',
      name: 'CriteriaComparison',
      component: CriteriaComparison
    },
    {
      path: '/ranked-criteria',
      name: 'RankedCriteria',
      component: RankedCriteria
    },
    {
      path: '/options-comparison',
      name: 'OptionsComparison',
      component: OptionsComparison
    },
    {
      path: '/decision',
      name: 'FinalDecision',
      component: FinalDecision
    },
    // {
    //   path: '/options-comparison/:battleId',
    //   name: 'Options Comparison Single',
    //   component: OptionsSingle,
    // },
  ]
})

export default router
