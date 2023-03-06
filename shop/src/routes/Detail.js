import {useParams} from "react-router-dom";
import styled from 'styled-components';
import {useContext, useEffect, useState} from "react";
import { Nav } from 'react-bootstrap'

import { Context1 } from './../App'

// let YellowBtn = styled.button`
// 	background: ${ props => props.bg };
// 	color: ${ props => props.bg == 'blue' ? 'white' : 'black'};
// 	padding: 10px;
// `
//
// let NewBtn = styled.button(YellowBtn)`
// `
//
// let Box =styled.div`
// 	background: gray;
// 	padding: 20px;
// `

// 컴포넌트의 라이프 사이클
// 컴포넌트가 보인다, 장착된다. == 마운트
// 컴포넌트가 수정된다 == 업데이트
// 컴포넌트가 안보인다. == 언마운트
// 컴포넌트 라이프 사이클을 알면 그 중간중간 간섭을 할 수 있다.(중간중간 코드 실행 가능)

// 옛날 component 만드는법, 클래스 활용
// class Detail2 extends React.Component {
// 	componentDidMount() {
// 	}
// 	componentDidUpdate() {
// 	}
// 	componentWillUnmount() {
// 	}
// }

// 요즘 컴포넌트 만드는 법
function Detail (props) {
	let {재고, shoes} = useContext(Context1) // 보관함 해체
	let {id} = useParams();
	// data의 요소중에서 id와 같은 id를 가진것을 찾는다.
	let data = props.shoes.find((e) => e.id == id)
	let [count, setCount] = useState(0)
	let [alert, setAlert] = useState(true)
	let [탭, 탭변경] = useState(0)
	let [fade2, setFade2] = useState('')
	useEffect(()=>{
		setFade2('end')
		return ()=>{
			setFade2('')
		}
	},[])

	// Hook

	// Detail 컴포넌트가 마운트, 업데이트될 때 실행된다.
	// 리액트 안에서 useEffect는 두번씩 작동된다고 생각하면 편하다.
	// 두번씩 작동되는게 싫다면 index.js가서 <React.StrictMode> 없애면된다.
	useEffect(() => {
		console.log('안녕');
		// 위 부분이 useEffect 밖에 있어도 재 렌더링 될때 똑같이 작동하는데 왜 쓰는거임?
		// useEffect는 작동 시점이 좀 다르다. 렌더링이 다 되고 작동한다.
		// 오래걸리는 작업을 useEffect안에 넣어두면 HTML렌더링하고 작동되기 때문에 우용하다.
		// 1. 어려운 연산.
		// 2. 서버에서 데이터 가져오는 작업
		// 3. 타이머 장착
		let a = setTimeout(()=> {setAlert(false)}, 2000)
		// clean up function
		// 처음 mount시에는 실행안됨, unmount시 1회 실행됨
		return () => {
			// useEffect 동작전에 실행된다.
			// 기존 타이머는 제거해주세요
			clearTimeout(a) // 타이머 제거 함수

		}
	}, []) // [] 부분을 Dependency라 한다. useEffect 실행 조건을 넣을 수 있는 곳이다.
	// 저 부분에 들어가 있는것이 바뀔때 작동되도록 한다.
	// 저 부분에 무엇이 들어가도 컴포넌트가 마운트될때는 실행하고 지나간다.
	// [] 이런식으로 비어놓고 쓰게되면 해당 컴포넌트가 업데이트 되면 실행하지 않는다. 즉 컴포넌트 mount 1회만 실행하고 싶으면 이렇게하면된다.

	// 빡똥식 정리
	return (
		<div className={'container start ' + fade2}>
			{
				alert == true
				?	<div className="alert alert-warning">2초이내 구매시 할인</div>
				:	null
			}

			{count}
			<button onClick={() => {
				setCount(count+1)
			}}>버튼</button>
			{/*<Box>*/}
			{/*<YellowBtn bg="blue">버튼</YellowBtn>*/}
			{/*</Box>*/}
			<div className="row">
				<div className="col-md-6">
					<img src={'https://codingapple1.github.io/shop/shoes'+ (Number(data.id)+1) +'.jpg'} width="100%" />
				</div>
				<div className="col-md-6">
					<h4 className="pt-5">{data.title}</h4>
					<p>{data.content}</p>
					<p>{data.price}</p>
					<button className="btn btn-danger">주문하기</button>
				</div>
			</div>

			<Nav variant="tabs"  defaultActiveKey="link0">
				<Nav.Item>
					<Nav.Link onClick={()=>{
						탭변경(0)
					}} eventKey="link0">버튼0</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link onClick={()=>{
						탭변경(1)
					}} eventKey="link1">버튼1</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link onClick={()=> {
						탭변경(2)
					}} eventKey="link2">버튼2</Nav.Link>
				</Nav.Item>
			</Nav>
			<TabContent 탭={탭}/>
		</div>
	)

	// useEffect(() => {}) 1. 재렌더링 될 때마다 코드 실행하고 싶으면
	// useEffect(() => {}, []) 2. mount시 1회 코드 실행하고 싶으면
	// useEffect(() => {
	// 	return () => {
	// 		3. unmount시 1회 코드 실행하고 싶으면
	// 	}
	// }, [])
	// 4. useEffect 실행 전에 뭔가 실행하려면 언제나 return () => {}
	// 5. 특정 state 변경시에만 실행하려면 [state명]
}

function TabContent({탭}) {
	let [fade, setFade] = useState('')

	useEffect(() => {
		// react 18버전 이상에서 생긴 automatic batching 기능 때문에
		// state 변경하는 함수들이 근처에 있으면 하나로 다 합쳐서 한꺼번에 state를 변경하고 한번 재렌더링한다
		let a = setTimeout(()=>{ setFade('end') }, 10)
		return () => {
			clearTimeout(a)
			setFade('')
		}
	},[탭])

	return (<div className={'start ' + fade}>
		{ [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭] }
	</div>)
}
export default Detail;