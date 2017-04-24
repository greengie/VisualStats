import React from 'react'
import {
	Router,
	Route,
	IndexRoute,
	Redirect,
	browserHistory
} from 'react-router'
import App from './component/App'
import Dashboard from './component/Dashboard'
import About from './component/About'
import Home from './component/Home'
import sidebar from './component/sidebar'
import App2 from './component/App2'
import table_test from './component/table_test'
import Main_World from './component/main_world'
import Upload from './component/upload'
import Login from './component/Login'
import Login_n from './component/login_n'
import Chart from './component/chart'
import Logout from './component/logout'
import Regression from './component/regression'

export default () => (
	<Router history={browserHistory}>
			<Route path='test' component={sidebar}>
				<IndexRoute component={Dashboard} />
				<Route path='dashboard' component={Dashboard} />
				<Route path='map' component={Main_World} />
				<Route path='chart' component={Chart} />
				<Route path='regression/:userid' component={Regression} />
				<Route path='upload/:userid' component={Upload} />
				<Route path='home' component={App} />
			</Route>

			<Route path='/' component={App}>
				<Route path='login' component={Login_n} />


		</Route>
	</Router>
);
