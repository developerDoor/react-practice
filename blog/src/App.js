import logo from "./logo.svg";
import "./App.css";
import {useState} from "react";

function App () {
	let post = "포항 치킨 맛집";
	let [title, setTitle] = useState(["남자 코트 추천", "강남 우동 맛집", "파이썬독학",]);
	let [like, setLike] = useState(title.map(() => {
		return 0;
	}));
	let [modal, setModal] = useState(true);
	let [modalTitle, setModalTitle] = useState(2);
	let [입력값, 입력값변경] = useState('');

	return (<div className="App">
			<div className="black-nav">
				<h4>ReactBlog</h4>a
			</div>
			<button
				onClick={ () => {
					let orderCopy = [...title];
					orderCopy.sort();
					setTitle(orderCopy);
				} }
			>
				가나다순 정렬
			</button>
			<button
				onClick={ () => {
					let copy = [...title];
					copy[0] = "여자 코트 추천";
					setTitle(copy);
				} }
			>
				글수정
			</button>
			{/* <div className="list">
			 <h4>
			 {title[0]} <span onClick={() => setLike(like++)}>👍</span> {like}
			 </h4>
			 <p>3월 2일 발행</p>
			 </div>
			 <div className="list">
			 <h4>{title[1]}</h4>
			 <p>3월 2일 발행</p>
			 </div>
			 <div className="list">
			 <h4
			 onClick={() => {
			 setModal(!modal);
			 }}
			 >
			 {title[2]}
			 </h4>
			 <p>3월 2일 발행</p>
			 </div> */ }
			{ title.map(function (a, i) {
				return (<div className="list" key={ i }>
					<h4
						onClick={ () => {
							setModal(true);
							setModalTitle(i);
						} }
					>
						{ title[i] }
						<span onClick={ () => {
							let copy = [...like];
							copy[i]++;
							setLike(copy);
						}}>👍</span>{ like[i] }
						<button onClick={()=> {
							let copy = [...title]
							copy.splice(i,1)
							setTitle(copy)
						}}>삭제버튼</button>
					</h4>
					<p>3월 2일 발행</p>
				</div>);
			}) }
			<button
				onClick={ () => {
					setModalTitle(0);
				} }
			>
				글제목 0
			</button>
			<button
				onClick={ () => {
					setModalTitle(1);
				} }
			>
				글제목 1
			</button>
			<button onClick={ () => {setModalTitle(2);} }>글제목 2</button>
			{ modal === true ? (<Modal modalTitle={ modalTitle } title={ title } setTitle={ setTitle }/>) : null

			}
			<input onChange={ (e) => {
				입력값변경(e.target.value);
				console.log(입력값);
			} }></input>
			<button onClick={ (e) => {
				let copy = [...title]
				copy.unshift(입력값)
				console.log(copy)
				setTitle(copy);
			} }>게시글 추가
			</button>
		</div>

	);
}

function Modal (props) {
	return (<div className="modal">
			<h4>{ props.title[props.modalTitle] }</h4>
			<p>날짜</p>
			<p>상세내용</p>
			<button>글 수정</button>
		</div>

	);
}

export default App;


