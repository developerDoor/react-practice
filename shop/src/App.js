import logo from './logo.svg';
import {Button, Navbar, Container, Nav} from 'react-bootstrap';
import './App.css';
import bg from './img/bg.png';
import {useState} from "react";
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail";
import axios from "axios";

function App () {
	let [shoes, setShoes] = useState(data)
	let navigate = useNavigate(); // 페이지 이동 도와주는 함수
	return (
		<div className="App">
			<Navbar bg="dark" variant="dark">
				<Container>
					<Navbar.Brand href="#home">Navbar</Navbar.Brand>
					<Nav className="me-auto">
						<Nav.Link onClick={()=> {navigate('/')}}>Home</Nav.Link>
						<Nav.Link onClick={()=> {navigate('/detail')}}>Detail</Nav.Link>
					</Nav>
				</Container>
			</Navbar>

			<Routes>
				<Route path="/" element={
					<>
						<div className="main-bg" style={ {backgroundImage: 'url(' + bg + ')'} }></div>
						<div className="container">
							<div className="row">
								{ shoes.map((e, i) => {
										return <Card shoes={ shoes[i] } i={ i }></Card>
								}) }
							</div>
						</div>
						<button onClick={()=>{
							axios.get('https://codingapple1.github.io/shop/data2.json')
								.then((data)=>{
									let copy = [...shoes, ...data.data];
									setShoes(copy)
									console.log(copy)
								})
								.catch(()=> {
									console.log('실패함ㅅㄱ')
								}
								)
							Promise.all([ axios.get('/url1'), axios.get('/url2') ])
								.then(()=>{
									// 위 두 요청이 둘다 성공했을 때 작동
							})
								.catch(()=> {

							})
						}}>더보기</button>
					</>
				}/>
				<Route path="/detail/:id" element={ <Detail shoes={shoes} /> } />


				<Route path="/about" element={ <About />}>
					<Route path="member" element={<div>멤버임</div>} />
					<Route path="location" element={<div>위치정보임</div>} />
				</Route>
				<Route path="/event" element={ <About />}>
					<Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>} />
					<Route path="two" element={<p>생일기념 쿠폰받기</p>} />
				</Route>

				<Route path="*" element={<div>없는페이지입니다.</div> }/>
			</Routes>
		</div>


	);
}

function Event() {
	return (
		<div>
			<h4>오늘의 이벤트</h4>
			<Outlet></Outlet>
		</div>

	)
}

function About() {
	return (
		<div>
			<h4>회사정보임</h4>
			<Outlet></Outlet>
		</div>
	)
}

function Card (props) {
	return (
		<div className="col-md-4">
			<img src={ 'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg' } width="80%"/>
			<h4>{ props.shoes.title }</h4>
			<p>{ props.shoes.price }</p>
		</div>
	)
}

export default App;

